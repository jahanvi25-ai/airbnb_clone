import axios from "axios";

// Every API call in this app goes through this one instance. It's the only
// place that needs to know the backend's URL, and the only place the auth
// token gets attached — nothing else in the app should call axios directly.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
