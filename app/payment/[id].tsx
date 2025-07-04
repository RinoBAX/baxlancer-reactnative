import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import icons from "@/constants/icons";
import { usePaymentVerificationHooks } from "../hooks/usePaymentVerification";
import { useBankHooks } from "../hooks/useBankHook";
import { getBankLogo } from "../utils/constants";

const COLORS = {
  blueSky: "#3685CE",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const PaymentMethodDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { needPaymentData } = usePaymentVerificationHooks();
  const { bankDetail, loading, error, fetchBankById } = useBankHooks();

  const totalAmount = needPaymentData?.data?.totalPrice ?? 0;
  const baseAmount = needPaymentData?.data?.baseAmount ?? 0;
  const discount = needPaymentData?.data?.discount?.amount ?? 0;
  const typeDiscount = needPaymentData?.data?.discount?.name ?? "-";
  const dataUser = needPaymentData?.data?.user?.email ?? "-";
  const roleUser = needPaymentData?.data?.user?.role ?? "-";

  const [isExpanded, setIsExpanded] = useState(false);
  const height = useSharedValue(0);

  useEffect(() => {
    if (id && typeof id === "string") {
      fetchBankById(id);
    }
  }, [id]);

  const navigateToConfirmation = (idBank: string) => {
    router.push({ pathname: "/payment/confirmation", params: { id: idBank } });
  };

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    height.value = withTiming(isExpanded ? 0 : 320, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-gray-500">Sedang memuat data bank...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center bg-white px-4">
          <Text className="text-red-500 mb-2">Error: {error}</Text>
          <TouchableOpacity
            onPress={() => id && fetchBankById(id as string)}
            className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white">Coba lagi</Text>
          </TouchableOpacity>
        </View>
      ) : !bankDetail ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg text-red-500">Bank tidak ditemukan 😢</Text>
        </View>
      ) : (
        <>
          {/* HEADER */}
          <LinearGradient
            colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <SafeAreaView>
              <View className="px-5">
                <View className="flex-row items-center my-2">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Image
                      source={icons.backArrow}
                      className="size-6"
                      tintColor="#ffffff"
                    />
                  </TouchableOpacity>
                  <Text className="text-white text-base font-rubik-medium ml-4">
                    Bayar dengan {bankDetail.accountBank}
                  </Text>
                </View>

                <BlurView
                  intensity={70}
                  tint="light"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    marginTop: 16,
                  }}>
                  <View className="flex-row items-center justify-between p-4 rounded-xl">
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={getBankLogo(bankDetail.accountBank)}
                        className="size-14"
                        resizeMode="contain"
                      />
                      <Text className="font-semibold text-base text-white">
                        {bankDetail.accountBank}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()}>
                      <Text className="text-blue-500 font-medium">Ubah</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* CONTENT */}
          <SafeAreaView
            style={{ flex: 1 }}
            edges={["bottom"]}>
            <View className="flex-1 bg-white rounded-t-3xl -mt-6 overflow-hidden">
              <View className="p-5">
                {/* RINCIAN HARGA */}
                <View className="bg-white p-4 rounded-3xl shadow border border-gray-200 mb-4">
                  <Text className="font-bold text-base mb-2">
                    Rincian Harga
                  </Text>
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-medium text-gray-700 uppercase">
                      daftar baxlancer
                    </Text>
                    <Text className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                      {roleUser}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">{dataUser}</Text>
                    <Text className="text-sm text-gray-700 font-medium">
                      IDR {baseAmount.toLocaleString()}
                    </Text>
                  </View>
                  <View className="flex-row justify-between mt-1">
                    <Text className="text-sm text-gray-600">
                      Diskon: {typeDiscount}
                    </Text>
                    <Text className="text-sm text-destructive font-medium">
                      - IDR {discount.toLocaleString()}
                    </Text>
                  </View>
                  <View className="border-t border-gray-200 mt-3 pt-3 flex-row justify-between">
                    <Text className="font-semibold text-base">
                      Total Pembayaran
                    </Text>
                    <Text className="font-bold text-base text-gray-800">
                      IDR {totalAmount.toLocaleString()}
                    </Text>
                  </View>
                </View>

                {/* TATA CARA */}
                <View className="mt-4 border border-gray-200 rounded-xl p-4 bg-white">
                  <TouchableOpacity
                    onPress={toggleAccordion}
                    className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Ionicons
                        name="information-circle-outline"
                        size={20}
                        color="#2563eb"
                      />
                      <Text className="text-base font-semibold text-blue-600">
                        Lihat tata cara pembayaran
                      </Text>
                    </View>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#000"
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <Animated.View
                      style={animatedStyle}
                      className="mt-4">
                      <ScrollView
                        className="space-y-4"
                        contentContainerStyle={{ padding: 6 }}
                        showsVerticalScrollIndicator={false}>
                        <View>
                          <Text className="font-bold text-gray-800 mb-1">
                            Pembayaran via ATM BRI
                          </Text>
                          <Text className="text-gray-700 leading-relaxed">
                            1. Pilih{" "}
                            <Text className="font-semibold">Bahasa</Text>, lalu
                            masukkan{" "}
                            <Text className="font-semibold">Pin ATM</Text>
                            {"\n"}
                            2. Pilih menu{" "}
                            <Text className="font-semibold">Bayar/Beli</Text>
                            {"\n"}
                            3. Pilih menu{" "}
                            <Text className="font-semibold">Lainnya</Text>
                            {"\n"}
                            4. Pilih menu{" "}
                            <Text className="font-semibold">Tiket</Text>
                            {"\n"}
                            5. Pilih menu{" "}
                            <Text className="font-semibold">Kereta Api</Text>
                            {"\n"}
                            6. Masukkan{" "}
                            <Text className="font-semibold">
                              Kode Pembayaran
                            </Text>
                            {"\n"}
                            7. Cek dan tekan{" "}
                            <Text className="font-semibold">Benar</Text>
                            {"\n"}
                            8.{" "}
                            <Text className="font-semibold">
                              Transaksi berhasil
                            </Text>
                          </Text>
                        </View>

                        <View>
                          <Text className="font-bold text-gray-800 mb-1">
                            Pembayaran via BRImo
                          </Text>
                          <Text className="text-gray-700 leading-relaxed">
                            1. <Text className="font-semibold">Login</Text> ke
                            aplikasi{" "}
                            <Text className="font-semibold">BRImo</Text>
                            {"\n"}
                            2. Pilih menu{" "}
                            <Text className="font-semibold">KAI</Text>
                            {"\n"}
                            3. Masukkan{" "}
                            <Text className="font-semibold">Kode Bayar</Text>
                            {"\n"}
                            4. Klik{" "}
                            <Text className="font-semibold">
                              Lanjutkan
                            </Text>{" "}
                            lalu masukkan{" "}
                            <Text className="font-semibold">PIN</Text>
                          </Text>
                        </View>
                        <View>
                          <Text className="font-bold text-gray-800 mb-1">
                            Pembayaran via BRImo
                          </Text>
                          <Text className="text-gray-700 leading-relaxed">
                            1. <Text className="font-semibold">Login</Text> ke
                            aplikasi{" "}
                            <Text className="font-semibold">BRImo</Text>
                            {"\n"}
                            2. Pilih menu{" "}
                            <Text className="font-semibold">KAI</Text>
                            {"\n"}
                            3. Masukkan{" "}
                            <Text className="font-semibold">Kode Bayar</Text>
                            {"\n"}
                            4. Klik{" "}
                            <Text className="font-semibold">
                              Lanjutkan
                            </Text>{" "}
                            lalu masukkan{" "}
                            <Text className="font-semibold">PIN</Text>
                          </Text>
                        </View>
                        <View>
                          <Text className="font-bold text-gray-800 mb-1">
                            Pembayaran via BRImo
                          </Text>
                          <Text className="text-gray-700 leading-relaxed">
                            1. <Text className="font-semibold">Login</Text> ke
                            aplikasi{" "}
                            <Text className="font-semibold">BRImo</Text>
                            {"\n"}
                            2. Pilih menu{" "}
                            <Text className="font-semibold">KAI</Text>
                            {"\n"}
                            3. Masukkan{" "}
                            <Text className="font-semibold">Kode Bayar</Text>
                            {"\n"}
                            4. Klik{" "}
                            <Text className="font-semibold">
                              Lanjutkan
                            </Text>{" "}
                            lalu masukkan{" "}
                            <Text className="font-semibold">PIN</Text>
                          </Text>
                        </View>
                      </ScrollView>
                    </Animated.View>
                  )}
                </View>
              </View>
            </View>
          </SafeAreaView>

          {/* BUTTON BAYAR */}
          <SafeAreaView edges={["bottom"]}>
            <View className="p-5 bg-white border-t border-gray-200">
              <TouchableOpacity
                className="bg-blue-600 py-4 rounded-3xl items-center"
                onPress={() => navigateToConfirmation(bankDetail.id)}>
                <Text className="text-white font-semibold text-base uppercase">
                  Bayar dengan {bankDetail.accountBank}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default PaymentMethodDetailScreen;
