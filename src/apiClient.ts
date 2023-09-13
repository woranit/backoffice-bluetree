import axios, { AxiosInstance } from "axios";

const backendBaseURL = import.meta.env.VITE_APP_BACKEND_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: backendBaseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
