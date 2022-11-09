import api from "./api";
import { DC_TOKEN } from "./constants";

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem(DC_TOKEN, token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem(DC_TOKEN);
  }
};

export default setAuthToken;
