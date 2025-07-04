// lib/apiInstance.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  TooManyRequestsError,
  UnauthorizedError,
} from "./httpErrors";
import { useAuthStore } from "@/app/store/authStore";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("API URL:", BASE_URL);
if (!BASE_URL) {
  throw new Error("API URL is not defined");
}

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout
  maxBodyLength: Infinity, // Important for file uploads
  maxContentLength: Infinity,
});

apiInstance.interceptors.request.use(async (config: any) => {
  // Remove all Content-Type handling for FormData - let axios handle it
  if (config.data instanceof FormData) {
    if (config.headers) {
      delete config.headers["Content-Type"];
    }
    config.headers = {
      ...config.headers,
      Accept: "application/json",
    };

    return config;
  }

  // Default ke JSON untuk non-FormData
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Token handling
  if (config.secure) {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error("Network or unknown error:", error.message);
      console.log("🌐 Axios Network Error:", error.config);
      throw new Error(error.message || "Network error or server not reachable");
    }

    const { response } = error;
    const data = response.data;
    const message = data?.message || data?.error || "Unexpected error";
    const commonProps = { response, data };

    switch (response.status) {
      case 400:
        throw Object.assign(new BadRequestError(message), commonProps);
      case 401: {
        const authStore = useAuthStore.getState();
        await authStore.clearAuth();
        throw Object.assign(new UnauthorizedError(message), commonProps);
      }
      case 404:
        throw Object.assign(new NotFoundError(message), commonProps);
      case 409:
        throw Object.assign(new ConflictError(message), commonProps);
      case 429:
        throw Object.assign(new TooManyRequestsError(message), commonProps);
      default:
        throw Object.assign(new Error(message), commonProps);
    }
  }
);

export default apiInstance;
