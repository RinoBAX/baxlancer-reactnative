// // hooks/useLogin.ts
// import { useState } from "react";
// import type { LoginPayload } from "@/interfaces/auth";
// // import { LoginAPI } from "../api/auth";
// import { useAuthStore } from "../store/authStore";

// export const useLogin = () => {
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const login = async (payload: LoginPayload) => {
//     try {
//       setLoading(true);
//       setError(null);
//       // const response = await LoginAPI(payload);
//       await setAuth(response.token, response.user);
//     } catch (err: any) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { login, loading, error };
// };
