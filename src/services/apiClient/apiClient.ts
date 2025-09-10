import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000/",
  // baseURL: "https://1h48b83c-5000.inc1.devtunnels.ms/",
  baseURL: "https://jwelery-be.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
