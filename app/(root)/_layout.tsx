import { Redirect, Slot, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuthContext } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AuthWrapper() {
  const { isReady } = useAuthContext();
  const { isAuthenticated, loading, hydrate } = useAuth();
  const pathname = usePathname();
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    hydrate();
    AsyncStorage.getItem("isFirstLaunch").then((val) => {
      setIsFirstLaunch(val !== "false"); // null → belum selesai
    });
  }, []);

  if (!isReady || loading || isFirstLaunch === null) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // ✅ Gunakan <Redirect />, bukan router.replace
  // if (!isAuthenticated && pathname !== "/login") {
  //   return <Redirect href="/onboarding" />;
  // }

  // if (isAuthenticated && pathname === "/login") {
  //   return <Redirect href="/verify" />; // atau "/" tergantung logika kamu
  // }

  // 🚀 Logika navigasi
  if (isFirstLaunch && pathname !== "/onboarding") {
    return <Redirect href="/onboarding" />;
  }

  if (!isFirstLaunch && !isAuthenticated && pathname !== "/login") {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && pathname === "/login") {
    return <Redirect href="/verify" />;
  }

  return <Slot />;
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <AuthWrapper />
      <StatusBar
        style="dark"
        animated
        // networkActivityIndicatorVisible={true}
        translucent
      />
    </AuthProvider>
  );
}
