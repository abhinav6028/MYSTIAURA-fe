

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jwelery-be.onrender.com/",
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
