import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jwelery-be.onrender.com/",
  headers: { "Content-Type": "application/json" },
});

// Attach token just before each request
apiClient.interceptors.request.use((config) => {
  const persistedRoot = localStorage.getItem("persist:root");
  if (persistedRoot) {
    const root = JSON.parse(persistedRoot);
    const token = root.token && JSON.parse(root.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default apiClient;



// import axios from "axios";

// const persistedRoot = localStorage.getItem("persist:root");
// const token =
//   persistedRoot &&
//   JSON.parse(persistedRoot).token &&
//   JSON.parse(JSON.parse(persistedRoot).token as string);

// const apiClient = axios.create({
//   // baseURL: "http://localhost:5000/",
//   // baseURL: "https://1h48b83c-5000.inc1.devtunnels.ms/",
//   baseURL: "https://jwelery-be.onrender.com/",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,

//   },
// });

// export default apiClient;
