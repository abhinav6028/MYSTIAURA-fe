import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://1h48b83c-5000.inc1.devtunnels.ms/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
