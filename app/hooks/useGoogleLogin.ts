// /hooks/useGoogleLogin.ts
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { GOOGLE_CLIENT_ID } from "../utils/constants";
import { GoogleMobileLoginAPI } from "../api/auth";

export const useGoogleLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  // Setup request Google OAuth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri(),
  });

  // Handle response dari Google OAuth
  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type !== "success") return;

      const idToken = response.params.id_token;
      if (!idToken) return;

      try {
        const { token, user } = await GoogleMobileLoginAPI(idToken);
        setAuth(token, user);
      } catch (error) {
        console.error("❌ Google login failed:", error);
      }
    };

    loginWithGoogle();
  }, [response]);

  return {
    request, // untuk UI (disabled button saat request null)
    promptAsync, // untuk trigger login (misalnya saat tombol diklik)
  };
};
