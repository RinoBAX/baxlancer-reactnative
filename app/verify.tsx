import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import icons from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "./store/authStore";
import { resendOtpVerification, verifyOtpEmail } from "./api/auth";
import {
  VerifyOtpLoginResponse,
  VerifyOtpNeedPaymentResponse,
} from "@/interfaces/auth";
import GlobalModal from "@/components/modal/GlobalModal";
import { usePaymentVerificationHooks } from "./hooks/usePaymentVerification";

const Verify = () => {
  const { email, type } = useLocalSearchParams<{
    email: string;
    type: "REGISTER" | "LOGIN" | "RESEND";
  }>();

  const initialType = (type?.toUpperCase() || "LOGIN") as
    | "LOGIN"
    | "REGISTER"
    | "RESEND";
  const [currentType, setCurrentType] = useState<
    "REGISTER" | "LOGIN" | "RESEND"
  >(initialType);

  const setAuth = useAuthStore((state) => state.setAuth);
  const { setNeedPaymentData } = usePaymentVerificationHooks();

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleSubmitOtp = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert("OTP Tidak Valid", "Masukkan 6 digit OTP yang benar.");
      return;
    }

    try {
      setIsLoading(true);

      // console.log("Submit OTP ->", { email, otp, type: currentType });

      const res = await verifyOtpEmail({ email, otp, type: currentType });
      // console.log("📦 Response Verify OTP:", res);

      if (currentType === "REGISTER") {
        if (res?.status === "VERIFIED") {
          Alert.alert(
            "Berhasil",
            res.message || "Email berhasil diverifikasi."
          );
          router.replace("/login");
        } else {
          Alert.alert(
            "Gagal",
            res?.message || "Verifikasi gagal. Coba ulangi."
          );
        }
      }

      // if (currentType === "LOGIN" || currentType === "RESEND") {
      //   const resLogin = res as VerifyOtpLoginResponse;
      //   console.log("data res login", resLogin);

      //   if (resLogin.status === "NEED_PAYMENT") {
      //     setModalMessage(
      //       "Verifikasi Berhasil, Anda akan diarahkan ke halaman pembayaran😊"
      //     );
      //     setShowModal(true);
      //     return;
      //   }

      //   if (resLogin?.status === "SUCCESS" && resLogin.token && resLogin.data) {
      //     setAuth(resLogin.token, resLogin.data);
      //     Alert.alert("Berhasil", resLogin.message || "Login berhasil.");
      //     router.replace("/");
      //   } else {
      //     Alert.alert("Gagal", res?.message || "Login gagal. Coba ulangi.");
      //   }
      // }
      if (currentType === "LOGIN" || currentType === "RESEND") {
        // ⬇️ Cek status response
        switch (res.status) {
          case "NEED_PAYMENT": {
            const resNeedPayment = res as VerifyOtpNeedPaymentResponse;
            console.log("resNeedPayment", resNeedPayment);
            setNeedPaymentData(resNeedPayment);
            setModalMessage(
              "Verifikasi berhasil, Anda akan diarahkan ke halaman pembayaran😊"
            );
            setShowModal(true);
            // Anda bisa memanfaatkan `resNeedPayment.data` di sini
            // misal: navigate ke halaman pembayaran
            return;
          }

          case "SUCCESS": {
            const resLogin = res as VerifyOtpLoginResponse;
            setAuth(resLogin.token, resLogin.data);
            Alert.alert("Berhasil", resLogin.message || "Login berhasil.");
            router.replace("/");
            return;
          }

          default:
            Alert.alert("Gagal", res.message || "Login gagal. Coba ulangi.");
            return;
        }
      }
    } catch (error: any) {
      Alert.alert(
        "Gagal",
        error?.message || "Terjadi kesalahan saat verifikasi."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      Alert.alert("Gagal", "Email tidak tersedia.");
      return;
    }

    try {
      setIsLoading(true);
      await resendOtpVerification(email);
      Alert.alert("Berhasil", "Kode OTP telah dikirim ulang ke email Anda.");
      setCurrentType("RESEND"); // Set type menjadi RESEND
      setResendCooldown(60);
    } catch (error: any) {
      Alert.alert("Gagal", error?.message || "Gagal mengirim ulang OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.enterOtp}
          className="w-full h-2/5"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-primary">
            Please input your otp verification
          </Text>

          <View className="my-4">
            <OtpInput
              numberOfDigits={6}
              focusColor="#3685CE"
              autoFocus={true}
              hideStick={false}
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onFocus={() => console.log("Focused")}
              onBlur={() => console.log("Blurred")}
              onFilled={(text) => {
                console.log("Filled OTP:", text);
                setOtp(text);
              }}
              onTextChange={() => {}} // jangan simpan nilai di sini
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              textProps={{
                accessibilityRole: "text",
                accessibilityLabel: "OTP digit",
                allowFontScaling: false,
              }}
              theme={{
                // containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                placeholderTextStyle: styles.placeholderText,
                filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmitOtp}
            className={`bg-bax-primaryBlue shadow-md shadow-zinc-300 rounded-full w-full py-4 my-4 ${
              isLoading ? "opacity-60" : ""
            }`}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                color="#fff"
                size={"small"}
              />
            ) : (
              <View className="flex items-center justify-center">
                <Text className="text-lg font-rubik-medium text-white ml-2">
                  Submit
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Button Resend OTP */}
          <View className="my-2 py-2">
            <Text className="text-center text-sm font-rubik text-gray-600">
              {resendCooldown > 0
                ? `Tunggu ${resendCooldown} detik untuk kirim ulang OTP.`
                : "OTP tidak masuk ke email kamu?"}
            </Text>

            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={isLoading || resendCooldown > 0}
              className="items-center">
              <Text
                className={`text-blue-600 text-sm font-rubik-semibold ${
                  isLoading || resendCooldown > 0 ? "opacity-60" : "opacity-100"
                }`}>
                Kirim Ulang OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <GlobalModal
          isOpen={showModal}
          variant="success"
          title="Yeayy Verifikasi Berhasil"
          message={modalMessage}
          autoClose={3000}
          onClose={() => {
            setShowModal(false);
            router.replace("/payment/screen");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  pinCodeContainer: {
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 4,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#FF7F50",
  },
  pinCodeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  focusStick: {
    backgroundColor: "#3b82f6",
  },
  activePinCodeContainer: {
    borderWidth: 1,
    borderColor: "#32CD32",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  filledPinCodeContainer: {
    backgroundColor: "#FFFFFF",
  },
  disabledPinCodeContainer: {
    backgroundColor: "#e5e7eb",
    opacity: 0.5,
  },
});
