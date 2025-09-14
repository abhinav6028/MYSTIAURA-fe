

import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jwelery-be.onrender.com/",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const persistedRoot = localStorage.getItem("persist:root");
    if (persistedRoot) {
      const rootObj = JSON.parse(persistedRoot);
      const tokenString = rootObj.token; 
      if (tokenString) {
        const token = JSON.parse(tokenString); 
        config.headers.Authorization = `Bearer ${ token }`;
      }
    }
  }
  return config;
});

export default apiClient;
