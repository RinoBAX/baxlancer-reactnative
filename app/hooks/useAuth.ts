// hooks/useAuth.ts

import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const hydrate = useAuthStore((s) => s.hydrate);
  const loading = useAuthStore((s) => s.loading);

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
    hydrate,
    loading,
  };
};
