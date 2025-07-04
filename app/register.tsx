import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import icons from "@/constants/icons";
import { Link, router } from "expo-router";
import { useAuthStore } from "./store/authStore";
import { register } from "./api/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [referrerId, setReferrerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Email tidak valid", "Masukkan alamat email yang benar.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await register({ email, referrerId, role: "AFFILIATE" });
      // console.log("📦 Response:", res);

      if (res?.entity) {
        await setAuth("", res.entity);
        router.push({
          pathname: "/verify",
          params: { email, type: "REGISTER" },
        });
      } else {
        Alert.alert("Gagal", "Response dari server tidak valid");
      }
    } catch (error: any) {
      console.log("Catch error object:", error);

      if (error.response) {
        Alert.alert("Gagal", error.response.data?.message || "Error server");
      } else if (error.request) {
        Alert.alert("Gagal", "Tidak ada response dari server");
      } else {
        Alert.alert("Gagal", error.message || "Error saat melakukan request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-2">
        <TouchableOpacity onPress={() => router.back()}>
          <View className="px-1">
            <Image
              source={icons.backArrow}
              className="size-8"
            />
          </View>
        </TouchableOpacity>
        <Text className="text-center flex-1 font-rubik-medium -ml-6">
          Daftar Akun
        </Text>
      </View>

      {/* Judul & Deskripsi */}
      <Text className="text-xl font-semibold text-black mb-1">
        Daftar Akun BAXLancer!
      </Text>
      <Text className="text-gray-500 mb-6">
        Daftar akun BAXLancer untuk menikmati semua layanan dan fitur di
        BAXLancer!
      </Text>

      {/* Input Email */}
      <View className="mb-4">
        <Text className="text-sm text-gray-600 mb-1">Alamat Email</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="Masukkan alamat email"
          inputMode="email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus={true}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Input Kode Referral */}
      <View className="mb-4">
        <Text className="text-sm text-gray-600 mb-1">Kode Referral</Text>
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="Kode Referral (Opsional)"
          inputMode="text"
          keyboardType="default"
          autoCapitalize="characters"
          value={referrerId}
          onChangeText={setReferrerId}
        />
      </View>

      {/* Info */}
      <View className="bg-gray-100 flex-row p-3 rounded-xl border border-gray-300 mb-6">
        <Image
          source={icons.info}
          className="size-6"
          tintColor="#2563EB"
        />
        <Text className="text-sm text-gray-700 mx-2">
          Pastikan email kamu aktif, ya! Kode verifikasi akan dikirim ke alamat
          yang didaftarkan.
        </Text>
      </View>

      {/* Tombol Lanjutkan */}
      <TouchableOpacity
        className={`bg-blue-600 py-4 rounded-xl items-center ${
          isLoading ? "opacity-60" : ""
        }`}
        onPress={handleRegister}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator
            color="#fff"
            size={"small"}
          />
        ) : (
          <Text className="text-white font-semibold">LANJUTKAN</Text>
        )}
      </TouchableOpacity>

      <View className="my-2 py-2">
        {/* Link Daftar */}
        <Text className="text-center text-sm font-rubik text-gray-600">
          Sudah punya akun BAXLancer?{" "}
          <Link
            href="/login"
            asChild>
            <Text className="text-blue-600 text-sm font-rubik-semibold">
              Masuk
            </Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
