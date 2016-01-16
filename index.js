var util        = require('util');
var fs          = require('fs');
var CdifDevice = require('cdif-device');
var Twitter    = require('./lib/twitter');

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
  // this.setAction('urn:cdif-net:serviceID:BinarySwitch', 'setState', setYeelightBlueState);
  // this.setAction('urn:cdif-net:serviceID:Dimming','getLoadLevelState', getYeelightBlueBrightness);
  // this.setAction('urn:cdif-net:serviceID:Dimming','setLoadLevelState', setYeelightBlueBrightness);
  // this.setAction('urn:yeelight-com:serviceID:ColorAdjust', 'getColor', getYeelightBlueColor);
  // this.setAction('urn:yeelight-com:serviceID:ColorAdjust', 'setColor', setYeelightBlueColor);
};

util.inherits(TwitterDevice, CdifDevice);

TwitterDevice.prototype.getHWAddress = function(callback) {
  callback(null, 'twitter');
};

TwitterDevice.prototype.getUserTimeline = function(args, callback) {
  console.log(args);
  if (this.oauth == null) {
    callback(new Error('cannot make request'), null);
    return;
  }
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

TwitterDevice.prototype._getDeviceRootSchema = function() {
  //TODO: annotate range information acquired from getConfigurationOptions
  return JSON.parse(fs.readFileSync(__dirname + '/schema.json').toString());
};


module.exports = TwitterDevice;
