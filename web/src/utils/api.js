import "whatwg-fetch";
import { getToken } from "utils/token";
const API_ROOT = process.env.REACT_APP_API_ROOT;

function parseJSON(res) {
  return res.json();
}

function checkError(json) {
  if (json.error) {
    throw new Error(json.error);
  }

  return json;
}

function defaultCallback(res) {
  return res;
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

function request(
  method,
  path,
  params,
  shouldAuthenticate,
  callback = defaultCallback
) {
  var qs = "";
  var body;
  var headers = (params && params.headers) || {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (shouldAuthenticate) {
    const token = getToken();
    headers["Authorization"] = "Token token=" + token;
  }

  if (["GET", "DELETE"].indexOf(method) > -1) {
    qs = "?" + getQueryString(params || {});
  } else {
    // POST or PUT
    body = JSON.stringify(params || {});
  }
  var url = API_ROOT + path + qs;

  console.log("url", url);

  return fetch(url, { method, headers, body })
    .then(parseJSON)
    .then(checkError)
    .then(callback);
}

async function uploadFormData(
  method,
  path,
  data,
  shouldAuthenticate,
  callback
) {
  let headers = {};

  if (shouldAuthenticate) {
    const token = getToken();
    headers["Authorization"] = "Token token=" + token;
  }

  var url = API_ROOT + path;

  return fetch(url, {
    method,
    body: data,
    headers
  })
    .then(parseJSON)
    .then(checkError)
    .then(callback);
}

export default {
  get: (
    path,
    params,
    shouldAuthenticate = false,
    callback = defaultCallback
  ) => request("GET", path, params, shouldAuthenticate, callback),
  post: (
    path,
    params,
    shouldAuthenticate = false,
    callback = defaultCallback
  ) => request("POST", path, params, shouldAuthenticate, callback),
  put: (
    path,
    params,
    shouldAuthenticate = false,
    callback = defaultCallback
  ) => request("PUT", path, params, shouldAuthenticate, callback),
  delete: (
    path,
    params,
    shouldAuthenticate = false,
    callback = defaultCallback
  ) => request("DELETE", path, params, shouldAuthenticate, callback),
  patch: (
    path,
    params,
    shouldAuthenticate = false,
    callback = defaultCallback
  ) => request("PATCH", path, params, shouldAuthenticate, callback),
  uploadFormData
};
