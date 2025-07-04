import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import icons from "@/constants/icons";
import { usePaymentVerificationHooks } from "../hooks/usePaymentVerification";
import { formatDateIndo, formatDateTimeIndo } from "../utils/dateFormatter";
import { contactWhatsAppAdmin } from "../utils/openWhatsApp";
import { useBankHooks } from "../hooks/useBankHook";
import { getBankLogo } from "../utils/constants";
import Toast from "react-native-toast-message";
import * as Clipboard from "expo-clipboard";

const COLORS = {
  blueSky: "#3685CE",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const PaymentConfirmationScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { needPaymentData } = usePaymentVerificationHooks();
  const { bankDetail, loading, error, fetchBankById } = useBankHooks();

  const data = needPaymentData?.data;

  const totalAmount = data?.totalPrice;
  const baseAmount = data?.baseAmount;
  const discount = data?.discount?.amount;
  const typeDiscount = data?.discount?.name;
  const statusPayment = data?.status;
  const referrerId = data?.user.referrerId;
  const roleUser = data?.user.role;
  const createdAtRegister = data?.createdAt;
  const dataUser = data?.user.email;

  const handleToCustomerService = () => {
    contactWhatsAppAdmin(
      "Halo Admin, saya mengalami kendala pada saat pembayaran pendaftaran BAXLancer, mohon bantuannya."
    );
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(bankDetail ? bankDetail.accountNumber : "");

    Toast.show({
      type: "success",
      text1: "No Rekening Disalin!",
      text2: "No Rekening berhasil disalin ke clipboard.",
      position: "top",
      topOffset: 50,
    });
  };
  const handleConfirmedPayment = () => {
    router.push("/payment/status");
  };

  return (
    // <SafeAreaView className="flex-1 bg-white">
    //   <View className="flex-1 bg-white">
    //     {/* Header */}
    //     <View className="flex-row items-center p-4 bg-white shadow-sm">
    //       <TouchableOpacity onPress={() => router.back()}>
    //         <Ionicons
    //           name="arrow-back"
    //           size={24}
    //           color="#000"
    //         />
    //       </TouchableOpacity>
    //       <Text className="flex-1 text-center text-lg font-bold">
    //         Selesaikan Pembayaran
    //       </Text>
    //     </View>

    //     <ScrollView className="flex-1">
    //       {/* Countdown Timer */}
    //       <View className="bg-purple-600 p-6 items-center">
    //         <Text className="text-white text-base mb-2">
    //           Sisa waktu pembayaran :
    //         </Text>
    //         <View className="flex-row items-center space-x-2">
    //           <View className="bg-white rounded-lg px-4 py-2">
    //             <Text className="text-purple-600 text-3xl font-bold">01</Text>
    //           </View>
    //           <Text className="text-white text-3xl font-bold">:</Text>
    //           <View className="bg-white rounded-lg px-4 py-2">
    //             <Text className="text-purple-600 text-3xl font-bold">05</Text>
    //           </View>
    //           <Text className="text-white text-3xl font-bold">:</Text>
    //           <View className="bg-white rounded-lg px-4 py-2">
    //             <Text className="text-purple-600 text-3xl font-bold">12</Text>
    //           </View>
    //         </View>
    //       </View>

    //       {/* Payment Deadline Card */}
    //       <View className="bg-orange-100 mx-4 p-4 rounded-lg flex-row items-center -mt-8 z-10 border border-orange-200">
    //         <Ionicons
    //           name="information-circle-outline"
    //           size={24}
    //           color="black"
    //         />
    //         <Text className="text-orange-700 ml-2 text-sm">
    //           Selesaikan pembayaran Anda sebelum :{" "}
    //           <Text className="font-bold">00:16 • 14 Juni 2025</Text>
    //         </Text>
    //       </View>

    //       {/* Bank BRI Section */}
    //       <View className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
    //         <View className="flex-row items-center mb-4">
    //           {/* Replace with your Bank BRI logo if available */}
    //           <View className="w-8 h-8 bg-blue-700 rounded-full items-center justify-center">
    //             <Text className="text-white text-xs font-bold">BRI</Text>
    //           </View>
    //           <Text className="ml-2 text-lg font-semibold">{method.name}</Text>
    //         </View>

    //         <Text className="text-gray-500 text-sm">Kode Pembayaran</Text>
    //         <View className="flex-row items-center justify-between mt-1 mb-4">
    //           <Text className="text-2xl font-bold text-blue-700">
    //             1212351686253
    //           </Text>
    //           <View className="flex-row items-center">
    //             <TouchableOpacity className="p-1">
    //               <Ionicons
    //                 name="information-circle-outline"
    //                 size={24}
    //                 color="black"
    //               />
    //             </TouchableOpacity>
    //             {/* Assuming the copy icon is similar to plus/minus for now */}
    //             <TouchableOpacity className="p-1 ml-2">
    //               <Ionicons
    //                 name="information-circle-outline"
    //                 size={24}
    //                 color="black"
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         </View>

    //         <View className="flex-row items-center justify-between border-t border-gray-200 pt-4">
    //           <Text className="text-lg font-semibold">Total tagihan</Text>
    //           <View className="flex-row items-center">
    //             <Text className="text-base font-semibold mr-1">Rp</Text>
    //             <Text className="text-xl font-bold text-black">217.000</Text>
    //             <TouchableOpacity className="ml-2">
    //               <Ionicons
    //                 name="information-circle-outline"
    //                 size={24}
    //                 color="black"
    //               />
    //             </TouchableOpacity>
    //           </View>
    //         </View>
    //       </View>

    //       {/* Travel Details Section */}
    //       <View className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm">
    //         <View className="flex-row items-center justify-between mb-2">
    //           <View className="flex-row items-center">
    //             <Text className="text-gray-600 text-sm font-semibold">
    //               Rab, 18 Jun 2025
    //             </Text>
    //             <Text className="text-gray-400 mx-2">•</Text>
    //             <Text className="text-gray-600 text-sm font-semibold">
    //               22.30 - 08.50
    //             </Text>
    //           </View>
    //           <TouchableOpacity>
    //             {/* This icon is not visible in the mockup, but assuming it's for expanding details */}
    //             <Ionicons
    //               name="information-circle-outline"
    //               size={24}
    //               color="black"
    //             />
    //           </TouchableOpacity>
    //         </View>
    //         <TouchableOpacity className="bg-blue-100 rounded-full px-3 py-1 self-start mb-3">
    //           <Text className="text-blue-700 text-xs font-semibold">
    //             +1 hari
    //           </Text>
    //         </TouchableOpacity>
    //         <View className="flex-row items-center mb-1">
    //           <Text className="text-lg font-semibold">SURABAYA PASAR T...</Text>
    //           <Text className="mx-2 text-gray-400 text-lg">➔</Text>
    //           <Text className="text-lg font-semibold">JATINEGARA</Text>
    //         </View>
    //         <Text className="text-gray-500 text-sm">
    //           KERTAJAYA (253) • EKONOMI (CA)
    //         </Text>
    //       </View>

    //       {/* How to Pay Section */}
    //       <View className="bg-white p-4 mx-4 mt-4 rounded-lg shadow-sm mb-4">
    //         <TouchableOpacity className="flex-row items-center justify-between pb-3 border-b border-gray-200">
    //           <View className="flex-row items-center">
    //             <Ionicons
    //               name="information-circle-outline"
    //               size={24}
    //               color="black"
    //             />
    //             <Text className="ml-2 text-base font-semibold">
    //               Lihat tata cara pembayaran
    //             </Text>
    //           </View>
    //           <Ionicons
    //             name="chevron-back"
    //             size={24}
    //             color="black"
    //           />
    //         </TouchableOpacity>

    //         <View className="mt-3">
    //           <Text className="text-base font-semibold mb-2">
    //             Pembayaran via ATM BRI
    //           </Text>
    //           <Text className="text-gray-700">
    //             1. Pilih <Text className="font-bold">Bahasa</Text>, kemudian
    //             masukkan <Text className="font-bold">Pin ATM</Text>
    //           </Text>
    //           {/* Add more steps as needed */}
    //         </View>
    //       </View>
    //     </ScrollView>

    //     {/* Fixed Bottom Buttons */}
    //     <View className="p-4 bg-white border-t border-gray-200">
    //       <TouchableOpacity className="bg-blue-700 py-3 rounded-lg items-center mb-3">
    //         <Text className="text-white text-lg font-semibold">
    //           LIHAT TIKET
    //         </Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity className="bg-gray-200 py-3 rounded-lg items-center">
    //         <Text className="text-gray-800 text-lg font-semibold">
    //           KEMBALI KE HOME
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </SafeAreaView>
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
          {/* Header Gradient */}
          <LinearGradient
            colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <SafeAreaView>
              <View className="px-5">
                {/* Toolbar Header */}
                <View className="flex-row items-center my-2">
                  <View className="flex-row items-center justify-center">
                    <TouchableOpacity
                      onPress={() => router.back()}
                      className="flex-row items-center justify-center">
                      <Image
                        source={icons.backArrow}
                        className="size-6"
                        tintColor="#ffffff"
                      />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold ml-2">
                      Selesaikan Pembayaran
                    </Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Main Content with Rounded top */}
          <SafeAreaView
            style={{ flex: 1 }}
            edges={["bottom"]}>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 24, // rounded-t-3xl
                borderTopRightRadius: 24,
                marginTop: -24, // NAIKKAN konten agar melengkung masuk ke gradient
                overflow: "hidden",
              }}>
              <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}>
                {/* Info Kereta */}
                <View className="bg-gray-100 p-4 rounded-2xl">
                  <Text className="font-bold text-base mb-1 px-3">
                    Pendaftaran
                  </Text>
                  <View className="bg-white p-3 rounded-xl border border-gray-200">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-sm text-gray-600">
                        Dibuat pada: {formatDateIndo(createdAtRegister)}
                      </Text>
                      <Text className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-md font-bold">
                        {statusPayment}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={getBankLogo(bankDetail.accountBank)}
                        className="size-10"
                        resizeMode="contain"
                      />
                      <Text className="font-rubik-semibold text-sm">
                        {bankDetail.accountBank}
                      </Text>
                    </View>
                    <Text className="font-rubik text-xs text-gray-500 mt-1 uppercase">
                      nama pemilik rekening :{" "}
                      <Text className="font-rubik-semibold text-gray-900 text-xs mb-1">
                        {bankDetail.accountName}
                      </Text>
                    </Text>
                    <View className="flex flex-row items-center gap-2 my-2">
                      <Text className="font-rubik text-xs text-gray-500 uppercase">
                        no. rekening :{" "}
                        <Text className="font-rubik-semibold text-gray-900 text-sm">
                          {bankDetail.accountNumber}
                        </Text>
                      </Text>
                      <TouchableOpacity onPress={handleCopy}>
                        <Image
                          source={icons.copyIcon}
                          className="size-5"
                          tintColor="#2563eb"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Rincian Harga */}
                <View className="mt-5 bg-white p-4 rounded-xl shadow border border-gray-200">
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
                      {`IDR ${baseAmount?.toLocaleString("id-ID") ?? 0}`}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">
                      Diskon :{" "}
                      <Text className="text-xs font-rubik-semibold text-gray-600">
                        {typeDiscount}
                      </Text>
                    </Text>
                    <Text className="text-sm text-destructive font-medium">
                      {`- IDR ${discount?.toLocaleString("id-ID") ?? 0}`}
                    </Text>
                  </View>
                  <View className="border-t border-gray-200 mt-3 pt-3 flex-row justify-between">
                    <Text className="font-semibold text-base">
                      Total Pembayaran
                    </Text>
                    <Text className="font-bold text-base text-gray-800">
                      {`IDR ${totalAmount?.toLocaleString("id-ID") ?? 0}`}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
            {/* End Content or Button Confirmed */}
            <View className="px-4 pb-5 gap-3">
              <TouchableOpacity
                onPress={handleConfirmedPayment}
                // disabled={!isAgreed}
                className="bg-bax-primaryBlue rounded-full py-4 items-center
                      ">
                <Text className="text-white font-rubik-semibold text-sm">
                  BAYAR
                </Text>
              </TouchableOpacity>
              {/* Bantuan */}
              <TouchableOpacity
                onPress={handleToCustomerService}
                className="flex-row items-center justify-center border border-bax-primaryBlue rounded-full py-4">
                <Text className="text-bax-primaryBlue font-rubik-semibold text-xs uppercase">
                  mengalami kendala pembayaran? hubungi admin
                </Text>
                <Image
                  source={icons.phone}
                  className="size-5 ml-2"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default PaymentConfirmationScreen;
