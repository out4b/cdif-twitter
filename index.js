var CdifUtil    = require('cdif-util');
var fs          = require('fs');
var querystring = require('querystring');
var CdifDevice  = require('cdif-device');
var Twitter     = require('./lib/twitter');

var TwitterDevice = function() {
  var spec = require('./twitter-api.json');

  this.apiKey                   = 'OI72K4dpVlCWqnhUSl3CsXn0D';
  this.apiSecret                = 'syKk3PQRsITttG5HXjL8BrRgFCIKwlbUQDElJ1xpx1nPQ5oYDC';
  this.oauth_requestUrl         = 'https://api.twitter.com/oauth/request_token';
  this.oauth_accessUrl          = 'https://api.twitter.com/oauth/access_token';
  this.oauth_version            = '1.0';
  this.oauth_signatureMethod    = 'HMAC-SHA1';
  this.authorize_redirect_url   = 'https://api.twitter.com/oauth/authenticate?oauth_token=';

  // TODO: read version from npm
  this.oauth_customHeaders      = {
      'Accept': '*/*',
      'Connection': 'close',
      'User-Agent': 'cdif-twitter/' + '0.0.1'
  };

  CdifDevice.call(this, spec);

  this.twitter = new Twitter(this);

  this.setAction('urn:twitter-com:serviceID:Statuses', 'getUserTimeline', this.getUserTimeline);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'getMentions',     this.getMentions);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'getHomeTimeline', this.getHomeTimeline);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'getRetweetsOfMe', this.getRetweetsOfMe);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'getRetweets',     this.getRetweets);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'showStatus',      this.showStatus);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'destroyStatus',   this.destroyStatus);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'updateStatus',    this.updateStatus);
  this.setAction('urn:twitter-com:serviceID:Statuses', 'retweetStatus',   this.retweetStatus);

  // this.setAction('urn:cdif-net:serviceID:BinarySwitch', 'setState', setYeelightBlueState);
  // this.setAction('urn:cdif-net:serviceID:Dimming','getLoadLevelState', getYeelightBlueBrightness);
  // this.setAction('urn:cdif-net:serviceID:Dimming','setLoadLevelState', setYeelightBlueBrightness);
  // this.setAction('urn:yeelight-com:serviceID:ColorAdjust', 'getColor', getYeelightBlueColor);
  // this.setAction('urn:yeelight-com:serviceID:ColorAdjust', 'setColor', setYeelightBlueColor);
}

CdifUtil.inherits(TwitterDevice, CdifDevice);

TwitterDevice.prototype._getHWAddress = function(callback) {
  callback(null, 'twitter');
};

TwitterDevice.prototype.getUserTimeline = function(args, callback) {
  // if we want to access raw oauth lib interface please refer to below commented code
  // var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?' + querystring.stringify(args.options);
  // console.log(url);
  // this.oauth.get(url, this.oauth_access_token, this.oauth_access_token_secret, function(err, data) {
  //   if (err) {
  //     callback(err, null);
  //     return;
  //   }
  //   try {
  //     callback(null, {userTimeline: JSON.parse(data)});
  //   } catch (e) {
  //     callback(e, null);
  //   }
  // });
  this.twitter.getUserTimeline(args.options, function(err, data) {
    callback(err, {userTimeline: data});
  });
};

TwitterDevice.prototype.getMentions = function(args, callback) {
  this.twitter.getMentions(args.options, function(err, data) {
    callback(err, {mentions: data});
  });
};

TwitterDevice.prototype.getHomeTimeline = function(args, callback) {
  this.twitter.getHomeTimeline(args.options, function(err, data) {
    callback(err, {homeTimeline: data});
  });
};

TwitterDevice.prototype.getRetweetsOfMe = function(args, callback) {
  var url = 'https://api.twitter.com/1.1/statuses/retweets_of_me.json?' + querystring.stringify(args.options);
  this.oauth.get(url, this.oauth_access_token, this.oauth_access_token_secret, function(err, data) {
    if (err) {
      return callback(err, null);
    }
    var parsed = null;
    try {
      parsed = JSON.parse(data);
    } catch (e) {
      return callback(e, null);
    }
    callback(null, {retweetsOfMe: parsed});
  });
};

TwitterDevice.prototype.getRetweets = function(args, callback) {
  this.twitter.getRetweets(args.id, args.options, function(err, data) {
    callback(err, {retweets: data});
  });
};

TwitterDevice.prototype.showStatus = function(args, callback) {
  this.twitter.showStatus(args.id, args.options, function(err, data) {
    callback(err, {status: data});
  });
};

TwitterDevice.prototype.destroyStatus = function(args, callback) {
  this.twitter.destroyStatus(args.id, args.options, function(err, data) {
    callback(err, {destroyedStatus: data});
  });
};

TwitterDevice.prototype.updateStatus = function(args, callback) {
  this.twitter.updateStatus(args.text, args.options, function(err, data) {
    callback(err, {updatedStatus: data});
  });
};

TwitterDevice.prototype.retweetStatus = function(args, callback) {
  this.twitter.retweetStatus(args.id, args.options, function(err, data) {
    callback(err, {retweetStatus: data});
  });
};

TwitterDevice.prototype._getDeviceRootSchema = function() {
  //TODO: annotate range information acquired from getConfigurationOptions
  return JSON.parse(fs.readFileSync(__dirname + '/schema.json').toString());
};


module.exports = TwitterDevice;
