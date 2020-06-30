
var querystring = require('querystring');

/**
 * Define the JSON error format
 */
var jsondata = {
  'error': 'Oops something went wrong, Please try again.',
};
/**
 * Check null or undefined
 * @param {string} as input
 * @return input is null or not
 */
var isNullOrWhiteSpace = function (input) {
  return !((input === null || typeof (input) === 'undefined') ? '' : input);
};

/**
 * Get Error response
 * @param {string} status
 * @param {json} input
 * @return json of api response
 */
var checkError = function (status, input) {
  if (status === 'serverError') {
    return (input !== '') ? input : jsondata;
  }
  return input && input.ErrorCode;
};

/**
 * Get Validation Message
 * @param {string} type as error string
 * @return jsondata as json error object
 */
var getValidationMessage = function (type) {
  jsondata.error = 'The value of ' + type + ' is invalid';
  return jsondata;
};

/**
 * Manage the api response
 * @param {string} status as error status
 * @param {json} data as response data
 * @param {*} resolve as promise resolve
 * @param {*} reject as promise reject
 */
var responseHandler = function (status, data, resolve, reject) {
  if (checkError(status, data)) {
    reject(data);
  } else {
    resolve(data);
  }
};

/**
 * Get Query String
 * @param {object} string as json input object
 * @return query string
 */
var getQueryString = function (string) {
  return querystring.stringify(string, null, null, encodeURIComponent);
};

/**
 * Get email domain
 * @param {string} email as string input
 * @return query string
 */
var extractEmail = function (email) {
  if (email.indexOf('@') > -1) {
    isDomain = email.substr(email.indexOf('@') + 1);
    domainName = isDomain !== 'mail7.io' ? isDomain : '';
    userName = email.substr(0, email.indexOf('@'));
    return {
      domainName: domainName,
      userName: userName
    }
  }
  else return {
    domainName: '',
    userName: email
  }

};

module.exports = {
  isNullOrWhiteSpace,
  getValidationMessage,
  responseHandler,
  getQueryString,
  checkError,
  extractEmail
};
