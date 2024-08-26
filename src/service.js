import axios from "axios";
import { url } from "./url";

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const resp = await axios.post(`${url}/refresh`, {}, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${refreshToken}`
      }
    });
    return resp.data;
  } catch (e) {
    console.log("Error", e);
  }
};

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      if (resp && resp.token) {
        const access_token = resp.token;
        localStorage.setItem("token", access_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);


const handleSignOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem('refresh_token')
  window.location.replace("/")
};

export { api, handleSignOut };
