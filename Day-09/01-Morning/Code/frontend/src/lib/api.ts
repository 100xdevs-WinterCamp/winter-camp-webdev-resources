// src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      error.message = error.response?.data?.message ?? "Could not reach the server.";
    }

    return Promise.reject(error);
  },
);