import axios from "axios";

// http://localhost:7001/admin
// https://be.nobleoilcentre.com/admin

// export const base_url = "https://be.beautyserviceathome.com/api";
export const base_url = "http://localhost:7001/uploads";

export default axios.create({
  baseURL: "http://localhost:7001/admin",
  // baseURL: "https://be.beautyserviceathome.com/admin",
  
});
