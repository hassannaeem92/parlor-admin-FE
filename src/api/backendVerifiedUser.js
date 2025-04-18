import axios from "axios";

const backendValidUser = axios.create({
  baseURL: "http://localhost:7001/admin",
  // baseURL: "https://be.beautyserviceathome.com/admin",
});

// Add a request interceptor
backendValidUser.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("myToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default backendValidUser;
