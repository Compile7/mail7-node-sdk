
var request = require('request');
var path = require('path');
var defaultHost = 'https://api.mail7.io';

module.exports = function (config = {}) {
  if (config.apiKey === undefined || config.apiSecret === undefined) {
    console.error('Please set apiKey API & apiSecret');
    return;
  }
  config.HELPER_PATH = path.join(__dirname, 'lib/helper.js');
  var helper = require(config.HELPER_PATH);

  config.request = function (type, resourcePath, queryParameters, formData) {

    if (!helper.isNullOrWhiteSpace(config.serverRegion)) {
      queryParameters.region = config.serverRegion;
    }

    var headers = { 'content-type': 'application/json' };

    var queryString = helper.getQueryString(queryParameters);

    var options = {
      method: type,
      uri: defaultHost + resourcePath + ((queryString) ? '?' + queryString : ''),
      headers: headers
    };

    if (typeof formData !== 'undefined' && formData) {
      options.json = formData;
    }

    return new Promise(function (resolve, reject) {
      request(options, (error, response, body) => {
        if (error) {
          helper.responseHandler('serverError', error, resolve, reject);
        } else {
          try {
            response = JSON.parse(body);
            helper.responseHandler('', response, resolve, reject);
          } catch (err) {
            helper.responseHandler('serverError', '', resolve, reject);
          }
        }
      });
    });
  };

  return require(path.join(__dirname, 'lib/apis.js'))(config)
};
