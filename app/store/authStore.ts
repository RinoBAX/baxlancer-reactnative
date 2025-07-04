import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import type { User } from "@/interfaces/auth";

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  clearAuth: () => Promise<void>;
  hydrate: () => Promise<void>;
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  } catch (error) {
    return true;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  loading: true,

  setAuth: async (token, user) => {
    await SecureStore.setItemAsync("token", token);
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userJson = await SecureStore.getItemAsync("user");
      const user = userJson ? JSON.parse(userJson) : null;

      if (token && !isTokenExpired(token)) {
        set({
          token,
          user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        // token tidak ada atau expired
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("user");
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } catch (e) {
      console.error("Hydration error", e);
      set({ token: null, user: null, isAuthenticated: false, loading: false });
    }
  },
}));
