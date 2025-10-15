

import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://jwelery-be.onrender.com/",
  // baseURL: "https://s81hcxpv-5000.inc1.devtunnels.ms/",
  // baseURL: "https://hnd07ldd-3000.inc1.devtunnels.ms/",
  headers: { "Content-Type": "application/json" },
});

// Attach token just before each request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const persistedRoot = localStorage.getItem("persist:root");
    if (persistedRoot) {
      const rootObj = JSON.parse(persistedRoot);
      const tokenString = rootObj.token; // still a string with quotes
      if (tokenString) {
        const token = JSON.parse(tokenString); // real value
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export default apiClient;
