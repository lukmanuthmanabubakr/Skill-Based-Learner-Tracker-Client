import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token in localStorage:", token);

  if (token) config.headers.Authorization = `Bearer ${token}`;

  console.log("Request headers:", config.headers);

  return config;
});
