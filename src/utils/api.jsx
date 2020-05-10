// For demo purposes I'm using this awesome Star Wars API
const API_URL = 'https://api-trimble-engage-qa.trimble-app.us/qa';

// Custom API error to throw
const ApiError = (message, data, status, originalErrObj) => {
  let response = null;
  let isObject = false;

  // We are trying to parse response
  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }
  this.response = response;
  this.message = message;
  this.status = status;
  this.originalErrObj = originalErrObj;
  this.toString = function () {
    return `${this.message}\nResponse:\n${isObject ? JSON.stringify(this.response, null, 2) : this.response}`;
  };
}
const FPApi = (function () {
  var orgId = '7';
  var xJwtAssertion = '';
  return {
    setOrgId:function(id){
      orgId = id;
    },
    setXJwtAssertion:function(jwt){
      xJwtAssertion = jwt;
    },
    // API wrapper function
    fetchResource: (path, userOptions = {}, includeDeafultHeaders = true, includePath = true) => {
      // Define default options
      const defaultOptions = {};
      // Define default headers
      const defaultHeaders = includeDeafultHeaders ? { orgId, 'X-Jwt-Assertion': xJwtAssertion} : {};
      
      const options = {
        // Merge options
        ...defaultOptions,
        ...userOptions,
        // Merge headers
        headers: {
          ...defaultHeaders,
          ...userOptions.headers,
        },
      };

      // Build Url
      const url = includePath ? `${API_URL}/${path}` : path;

      // Detect is we are uploading a file
      const isFile = options.body instanceof File;

      // Stringify JSON data
      // If body is not a file
      if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
      }

      // Variable which will be used for storing response
      let response = null;

      return fetch(url, options)
        .then(responseObject => {
          // Saving response for later use in lower scopes
          response = responseObject;

          // HTTP unauthorized
          if (response.status === 401) {
            // Handle unauthorized requests
            // Maybe redirect to login page?
          }

          // Check for error HTTP error codes
          if (response.status < 200 || response.status >= 300) {
            // Get response as text
            return response.text();
          }

          // Get response as json
          return response.json();
        })
        // "parsedResponse" will be either text or javascript object depending if
        // "response.text()" or "response.json()" got called in the upper scope
        .then(parsedResponse => {
          // Check for HTTP error codes
          if (response.status < 200 || response.status >= 300) {
            // Throw error
            throw parsedResponse;
          }

          // Request succeeded
          return parsedResponse;
        })
        .catch(error => {
          // Throw custom API error
          // If response exists it means HTTP error occured
          if (response) {
            const errObj = new ApiError(`Request failed with status ${response.status}.`, error, response.status, error);
            window.floorplanConfig.hooks.onError(errObj);
            throw errObj;
          } else {
            const errObj = new ApiError(error.toString(), null, 'REQUEST_FAILED', error);
            window.floorplanConfig.hooks.onError(errObj);
            throw errObj;
          }
        });
    }
  }
})()
export default FPApi;
