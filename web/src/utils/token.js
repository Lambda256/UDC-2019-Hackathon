import { sha256 } from 'js-sha256';

export function getToken() {
  return window.safeStorage.getItem("api_key");
}

export function getEncryptedToken(key) {
  const accessToken = getToken(key);

  if (accessToken) {
    return sha256(accessToken);
  } else {
    return null;
  }
}

export function setToken(token) {
  return window.safeStorage.setItem("api_key", token);
}

export function removeToken() {
  return window.safeStorage.removeItem("api_key");
}