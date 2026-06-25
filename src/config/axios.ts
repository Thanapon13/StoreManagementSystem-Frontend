import axios from "axios";
import { getAccessToken } from "../utils/local-storage";

axios.defaults.baseURL = import.meta.env.VITE_API_LOCAL;

axios.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axios;
