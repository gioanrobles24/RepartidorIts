import _ from 'lodash';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  console.log(response);

  const err = new Error(response.statusText);
  return response.json().then((obj) => {
    console.log(obj);
    err.response = response;
    err.body = obj;
    throw err;
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {formData: false, blob: false}) {
  //   const token = storage.get('auth-token');
  console.log(url);
  const finalOptions = _.merge(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: token ? `Bearer ${token}` : undefined,
      },
    },
    options,
  );

  if (options.formData) {
    delete finalOptions.headers['Content-Type'];
  }

  if (options.blob) {
    delete finalOptions.headers.Accept;
  }
  if (!options.blob) {
    return fetch(url, finalOptions)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        console.log(`%c [Request] - ${url}`, 'color: green;', {
          options: finalOptions,
          response: json,
          url,
        });
        return json;
      });
  }

  return fetch(url, finalOptions)
    .then(checkStatus)
    .then((resp) => resp.blob());
}
