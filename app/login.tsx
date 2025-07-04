import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Link, router } from "expo-router";
// import { useLogin } from "./hooks/useLogin";
import { generateAuthUrl } from "@/lib/crypto";
import { apiFetch } from "@/lib/fetchers";
import { useAuthStore } from "./store/authStore";
import { login } from "./api/auth";
import { contactWhatsAppAdmin } from "./utils/openWhatsApp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Email tidak valid", "Masukkan alamat email yang benar.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await login({ email });
      // console.log("📦 Response:", res);

      if (res?.status === "OTP_SENT") {
        router.push({
          pathname: "/verify",
          params: { email, type: "LOGIN" },
        });
      } else if (res?.status === "NEED_PAYMENT_CODE") {
        Alert.alert("Confirmed", "Kode Pembayaran Anda belum tersedia", [
          { text: "Hubungi Admin", onPress: () => handleConfirmedPayment() },
        ]);
      } else {
        Alert.alert("Gagal", "Response dari server tidak valid");
      }
    } catch (error: any) {
      console.log("Catch error object:", error);

      if (error.data?.status === "NEED_PAYMENT_CODE") {
        Alert.alert("Oops", error.data?.message, [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Hubungi Admin", onPress: () => handleConfirmedPayment() },
        ]);
      } else {
        Alert.alert(
          "Gagal",
          error.data?.message || error.message || "Terjadi kesalahan."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const roles = "affiliate";
      // 1. Generate encoded state (base64 string berisi role + secretKey)
      const encodedState = generateAuthUrl(roles);

      // 2. Kirim encodedState ke backend untuk mendapatkan Google Auth URL
      const res = await apiFetch<{ authUrl: string }>("/api/google", {
        method: "POST",
        body: JSON.stringify({ state: encodedState }),
      });

      // 3. Buka URL tersebut di browser
      if (res?.authUrl) {
        Linking.openURL(res.authUrl);
      } else {
        throw new Error("URL otentikasi Google tidak tersedia");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      Alert.alert(
        "Gagal",
        error.message || "Terjadi kesalahan saat login dengan Google"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmedPayment = () => {
    contactWhatsAppAdmin(
      "Halo admin, saya sudah mendaftar di aplikasi BAXLancer, namun saya memerlukan kode pembayaran (nominal) untuk melanjutkan proses pendaftaran akun."
    );
  };

  const handleToCustomerService = () => {
    contactWhatsAppAdmin(
      "Halo admin, saya butuh bantuan login ke aplikasi BAXLancer."
    );
  };

  return (
    <ScrollView
      contentContainerClassName="flex-grow"
      showsVerticalScrollIndicator={false}
      className=" bg-bax-primaryBlue">
      {/* Ilustrasi atas */}
      <View className="w-full pt-6 h-[300px]">
        <Image
          source={images.eWalletApp}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      {/* Konten utama */}
      <View className="px-5 py-8 h-full bg-white rounded-t-3xl">
        <Text className="font-rubik-bold text-xl text-start text-bax-midnight">
          Selamat Datang Di BAXLancer!
        </Text>

        <Text className="text-sm font-rubik text-start text-textSecondary/60 mt-2 mb-6">
          Login atau Register sekarang! untuk menikmati semua fitur yang
          tersedia di BAXLancer.
        </Text>

        {/* Input Email / No Telp */}
        <View>
          <Text className="text-sm font-rubik text-start text-textSecondary/60 my-1">
            Email/No. Telp
          </Text>
          <View className="bg-white rounded-xl px-4 py-2 mb-4 border border-gray-200">
            <TextInput
              placeholder="Masukkan Email atau No. Telp anda"
              value={email}
              onChangeText={setEmail}
              autoFocus={true}
              className="text-base text-black bg-white"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Tombol MASUK */}
        <TouchableOpacity
          className={`bg-bax-primaryBlue py-4 rounded-xl my-4 items-center ${
            isLoading ? "opacity-60" : ""
          }`}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator
              color="#fff"
              size={"small"}
            />
          ) : (
            <Text className="text-white font-semibold uppercase">masuk</Text>
          )}
        </TouchableOpacity>

        {/* Link Daftar */}
        <Text className="text-center text-sm font-rubik text-gray-600">
          Belum punya akun BAXLancer?{" "}
          <Link
            href="/register"
            asChild>
            <Text className="text-blue-600 text-sm font-rubik-semibold">
              Daftar Sekarang
            </Text>
          </Link>
        </Text>

        {/* Separator */}
        {/* <View className="flex-row items-center justify-center my-8">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 font-rubik text-sm text-gray-500">
            Atau gunakan akun
          </Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View> */}

        {/* Tombol Google */}
        {/* <TouchableOpacity
          onPress={handleGoogleLogin}
          className="flex-row items-center justify-center bg-white border border-gray-300 rounded-xl py-3 mb-3">
          <Image
            source={icons.google}
            className="w-5 h-5 mr-2"
          />
          <Text className="font-rubik-medium text-bax-primaryBlue text-sm">
            Sign in with Google
          </Text>
        </TouchableOpacity> */}

        {/* Bantuan */}
        <TouchableOpacity
          onPress={handleToCustomerService}
          className="flex-row items-center justify-center bg-white border border-gray-300 rounded-xl py-3 my-4">
          <Image
            source={icons.phone}
            className="w-5 h-5 mr-2"
          />
          <Text className="font-rubik text-sm text-textSecondary/70">
            Mengalami Kendala? Hubungi Kami
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
