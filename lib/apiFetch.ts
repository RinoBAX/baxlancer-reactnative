import api from "./apiInstance";
import * as SecureStore from "expo-secure-store";
import { AxiosRequestConfig } from "axios";

type RequestOptions = Omit<AxiosRequestConfig, "auth"> & {
  secure?: boolean;
};

function normalizeHeaders(
  headers: AxiosRequestConfig["headers"]
): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) return result;

  if (typeof headers === "object") {
    for (const key in headers) {
      const value = headers[key];
      if (value == null) continue;
      if (typeof value === "string") {
        result[key] = value;
      } else if (typeof value === "number") {
        result[key] = value.toString();
      }
    }
  }

  return result;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers = normalizeHeaders(options.headers);
  const isFormData = options.data instanceof FormData;

  if (options.secure) {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // Hapus Content-Type jika FormData dan ada di headers
  if (isFormData && headers["Content-Type"]) {
    console.log("🚫 Removing Content-Type for FormData");
    delete headers["Content-Type"];
  }

  const response = await api.request<T>({
    url: path,
    method: options.method || "GET",
    data: options.data,
    params: options.params,
    headers,
    // secure: options.secure, // Pastikan ini dikirim ke interceptor
  });

  return response.data;
}
