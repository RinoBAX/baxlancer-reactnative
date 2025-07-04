// import { View, Text } from "react-native";
// import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import LottieView from "lottie-react-native";
// import lottie from "@/constants/lottie";
// import { LinearGradient } from "expo-linear-gradient";

// const COLORS = {
//   blueSky: "#3685CE",
//   bluePrimary: "#1b4974",
//   accent: "#0762D9",
// };

// const StatusPayment = () => {
//   return (
//     <LinearGradient
//       colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 0, y: 1 }}
//       className="flex-1">
//       <SafeAreaView className="flex-1 items-center justify-center px-5">
//         {/* Overlay box */}
//         <View className="bg-white/60 p-6 rounded-2xl items-center shadow-xl w-11/12 max-w-md">
//           <LottieView
//             source={lottie.successCheck}
//             autoPlay
//             loop={true}
//             style={{ width: 350, height: 350, marginBottom: 6 }}
//           />

//           <Text className="text-center font-rubik-bold text-2xl text-green-600 mb-2">
//             Yeayyy! Pembayaran Berhasil 🎉
//           </Text>
//           <Text className="text-center font-rubik-regular text-base text-gray-500">
//             Terima kasih sudah berbelanja. Pesananmu sedang diproses dan akan
//             segera dikirim!
//           </Text>
//         </View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default StatusPayment;

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import LottieView from "lottie-react-native";
import lottie from "@/constants/lottie";
import { contactWhatsAppAdmin } from "../utils/openWhatsApp";
import { usePaymentVerificationHooks } from "../hooks/usePaymentVerification";

const COLORS = {
  blueSky: "#3685CE",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const StatusPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { needPaymentData } = usePaymentVerificationHooks();
  const data = needPaymentData?.data;
  const totalAmount = data?.totalPrice;
  const baseAmount = data?.baseAmount;
  const discount = data?.discount?.amount;
  const typeDiscount = data?.discount?.name;
  const referrerId = data?.user.referrerId;
  const roleUser = data?.user.role;
  const dataUser = data?.user.email;
  const formatCurrency = (num: number) =>
    num.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

  const handleConfirmedPaymentToAdmin = async () => {
    setIsLoading(true);
    try {
      const message = `
Halo Admin,

Saya sudah melakukan pembayaran, dengan data berikut:
------------------------------------
📧 Email: ${dataUser}
👤 Role: ${roleUser}
👥 Referrer ID: ${referrerId}

💸 Base Amount: ${formatCurrency(baseAmount ?? 0)}
🏷️ Diskon (${typeDiscount}): -${formatCurrency(discount ?? 0)}
💰 Total Bayar: ${formatCurrency(totalAmount ?? 0)}
------------------------------------

Berikut terlampir screenshot bukti pembayarannya.

Mohon bantuannya untuk segera aktivasi akun saya.
Terima kasih! 🎉
    `;
      await contactWhatsAppAdmin(message.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1">
      <SafeAreaView className="flex-1 px-5">
        {/* Toolbar */}
        <View className="px-5 mt-4 flex flex-row items-center justify-center">
          <Text className="font-rubik-medium text-xl text-white">
            Proses Pembayaran
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1 items-center justify-center px-4 rounded-3xl">
          <BlurView
            intensity={50}
            tint="default"
            style={{ borderRadius: 24, overflow: "hidden" }}
            className="p-6 rounded-3xl items-center">
            <Text className="text-center font-rubik-bold text-2xl text-white mb-2">
              Hore! Pembayaran kamu berhasil dibuat 🎉
            </Text>
            <LottieView
              source={lottie.successCheck}
              autoPlay
              loop={true}
              style={{ width: 300, height: 300, marginBottom: 2 }}
            />

            <View>
              <Text className="font-rubik-bold text-xs text-white mb-1">
                Langkah Selanjutnya :
              </Text>
              <Text className="text-white font-rubik text-xs leading-relaxed">
                1. Transfer pembayaran anda di nomor rekening yang sudah anda
                salin
                {"\n"}
                2. Bayar sesuai nominal yang tertera
                {"\n"}
                3. Screenshot bukti pembayaran
                {"\n"}
                4. Konfirmasi ke Admin dengan mengirimkan bukti pembayaran
                {"\n"}
                5. Selamat!🎉 Akun Anda telah aktif dan Anda dapat menikmati
                semua fitur di BAXLancer
              </Text>
            </View>
          </BlurView>
        </View>
      </SafeAreaView>

      <SafeAreaView
        edges={["bottom"]}
        className="mb-10">
        <View className="p-5">
          <TouchableOpacity
            className={`bg-white border border-bax-primaryBlue py-4 rounded-3xl items-center ${
              isLoading ? "opacity-60" : ""
            }`}
            onPress={handleConfirmedPaymentToAdmin}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                color="#2563eb"
                size={"small"}
              />
            ) : (
              <Text className="text-bax-primaryBlue font-rubik-semibold text-sm uppercase">
                Konfirmasi Admin
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default StatusPayment;
