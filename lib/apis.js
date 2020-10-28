
module.exports = function (config) {
  var module = {};
  var helper = require(config.HELPER_PATH);

  /**
  * This API is used to retrieve the email body which is recieved in given email
  * @param {email} created email address
  * @return Response containing Definition for Complete profile data
  */

  module.getInboxByEmail = function (email, cb) {
    if (helper.isNullOrWhiteSpace(email)) {
      return Promise.reject(helper.getValidationMessage('email'));
    }
    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    queryParam.to = helper.extractEmail(email).userName;
    if (helper.extractEmail(email).domainName !== '') {
      queryParam.domain = helper.extractEmail(email).domainName;
    }
    if (!helper.isNullOrWhiteSpace(cb)) {
      queryParam.callback = cb;
    }

    var resourcePath = '/inbox';

    return config.request('GET', resourcePath, queryParam, null);
  };

  /**
  * This API is used to retrieve the data for particular email by messageId
  * @param {email} created email address
  * @param {mesid} message _id of particular email
  * @return Response containing Definition for Complete profile data
  */

  module.getEmailById = function (email, mesid, cb) {
    if (helper.isNullOrWhiteSpace(email)) {
      return Promise.reject(helper.getValidationMessage('email'));
    }
    if (helper.isNullOrWhiteSpace(mesid)) {
      return Promise.reject(helper.getValidationMessage('mesid'));
    }
    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    queryParam.to = helper.extractEmail(email).userName;
    queryParam.mesid = mesid;
    if (helper.extractEmail(email).domainName !== '') {
      queryParam.domain = helper.extractEmail(email).domainName;
    }
    if (!helper.isNullOrWhiteSpace(cb)) {
      queryParam.callback = cb;
    }

    var resourcePath = '/email';

    return config.request('GET', resourcePath, queryParam, null);
  };

  /**
  * This API is used to delete the email by using messageId
  * @param {mesid} message _id of particular email
  * @return Response containing Definition for Complete profile data
  */

  module.deleteEmailById = function (mesid, domain, cb) {

    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    queryParam.mesid = mesid;
    if (typeof domain !== undefined && domain) queryParam.domain = domain;
    if (!helper.isNullOrWhiteSpace(cb)) queryParam.callback = cb;

    var resourcePath = '/delete';

    return config.request('GET', resourcePath, queryParam, null);
  };

  /**
  * This API is used to retrieve the routing rules
  * @return Response containing Definition for Complete profile data
  */

  module.getRoutingRules = function (cb) {
    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    if (!helper.isNullOrWhiteSpace(cb)) queryParam.callback = cb;

    var resourcePath = '/rules';

    return config.request('GET', resourcePath, queryParam, null);
  };

  /**
  * This API is used to create a new/update existing routing rule for your account on Mail7. 
  * This API will allow you to send a request for the same by providing the required routing rule details.
  * @param {payload} json formatted body of routing rules need to be create
  * @return Response containing Definition for Complete profile data
  */

  module.createRoutingRules = function (payload, cb) {

    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    if (!helper.isNullOrWhiteSpace(cb)) queryParam.callback = cb;

    var resourcePath = '/rules';

    return config.request('POST', resourcePath, queryParam, payload);
  };

  /**
  * This API is used to delete a routing rule for your account on Mail7. 
  * @return Response containing Definition for Complete profile data
  */

  module.deleteRoutingRules = function (ruleName, cb) {
    var queryParam = {};

    queryParam.apikey = config.apiKey;
    queryParam.apisecret = config.apiSecret;
    queryParam.name = ruleName;
    if (!helper.isNullOrWhiteSpace(cb)) queryParam.callback = cb;

    var resourcePath = '/rules';

    return config.request('DELETE', resourcePath, queryParam, null);
  };

  return module;
};
