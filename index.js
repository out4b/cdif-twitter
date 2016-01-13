var util       = require('util');
var CdifDevice = require('cdif-device');

var TwitterDevice = function() {
  var spec = require('./twitter-api.json');

  this.apiKey                   = 'OI72K4dpVlCWqnhUSl3CsXn0D';
  this.apiSecret                = 'syKk3PQRsITttG5HXjL8BrRgFCIKwlbUQDElJ1xpx1nPQ5oYDC';
  this.oauth_requestUrl         = 'https://api.twitter.com/oauth/request_token';
  this.oauth_accessUrl          = 'https://api.twitter.com/oauth/access_token';
  this.oauth_version            = '1.0';
  this.oauth_signatureMethod    = 'HMAC-SHA1';
  this.authorize_redirect_url   = 'https://api.twitter.com/oauth/authenticate?oauth_token=';

  CdifDevice.call(this, spec);
  // this.setAction('urn:cdif-net:serviceID:BinarySwitch', 'getState', getYeelightBlueState);
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

module.exports = TwitterDevice;
