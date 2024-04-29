import Cookies from "js-cookie";
import axios from "axios";
const TokenKey = "APP-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  if (token) {
    axios.defaults.headers.common["x-token"] = token;
  }
  return Cookies.set(TokenKey, token, { expires: 7 });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
