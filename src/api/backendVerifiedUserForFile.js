import axios from "axios";

const backendValidUserForFile = axios.create({
  baseURL: "http://localhost:7001/admin",
  // baseURL: "https://be.beautyserviceathome.com/admin",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
backendValidUserForFile.interceptors.request.use(
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

export default backendValidUserForFile;
