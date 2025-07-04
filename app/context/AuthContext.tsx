// /context/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthContextProps {
  isReady: boolean;
}

const AuthContext = createContext<AuthContextProps>({ isReady: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hydrate = useAuthStore((state) => state.hydrate);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await hydrate();
      setIsReady(true);
    };
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ isReady }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
