import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import icons from "@/constants/icons";
import GlobalModal from "@/components/modal/GlobalModal";
import { contactWhatsAppAdmin } from "../utils/openWhatsApp";
import { usePaymentVerificationHooks } from "../hooks/usePaymentVerification";
import { formatDateIndo, formatDateTimeIndo } from "../utils/dateFormatter";

const COLORS = {
  blueSky: "#3685CE",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const labels = ["Daftar", "Bayar", "Gajian"];

export default function PaymentScreen() {
  const { needPaymentData } = usePaymentVerificationHooks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);

  useEffect(() => setIsModalOpen(true), []);
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
  const referralCode = data?.user.referralCode;
  const typeRegister = data?.type;

  const handleToCustomerService = () => {
    contactWhatsAppAdmin(
      "Halo Admin, saya mengalami kendala pada saat pembayaran pendaftaran BAXLancer, mohon bantuannya."
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Modal */}
      <GlobalModal
        isOpen={isModalOpen}
        variant="warning"
        title="Bayar lah brooo!!!!😭"
        message={`Jika anda berada di halaman ini, itu berarti anda memiliki tagihan pembayaran yang belum selesai😊\nBayar lah brooo!!!!😭 Duit ane udah tipis ini`}
        autoClose={5000}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header gradient */}
      <LinearGradient
        colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <SafeAreaView>
          <View className="px-5">
            {/* Toolbar */}
            <View className="flex flex-row items-center justify-between mt-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image
                  source={icons.backArrow}
                  className="size-6"
                  tintColor="#ffffff"
                />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-white">
                Biaya Pendaftaran
              </Text>
              <Image
                source={icons.headset}
                className="size-6"
                tintColor="#ffffff"
              />
            </View>

            {/* Info */}
            <View className="px-5 py-4 mt-4 rounded-xl">
              <View className="flex-row mt-3 items-center justify-center gap-2">
                {labels.map((label, index) => (
                  <View
                    key={label}
                    className="flex-row items-center">
                    {/* Item */}
                    <View className="flex-row items-center bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200">
                      <Ionicons
                        name="checkmark-circle"
                        size={18}
                        color="#4ADE80"
                      />
                      <Text className="ml-2 text-xs font-medium">{label}</Text>
                    </View>

                    {/* Separator (garis dashed) kalau bukan terakhir */}
                    {index < labels.length - 1 && (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderStyle: "dashed",
                          borderColor: "#ccc",
                          width: 40, // panjang garis di antara
                          marginHorizontal: 4,
                          alignSelf: "center",
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Main content with rounded top */}
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
              <Text className="font-bold text-base mb-1 px-3">Pendaftaran</Text>
              <View className="bg-white p-3 rounded-xl border border-gray-200">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-gray-600">
                    Dibuat pada: {formatDateIndo(createdAtRegister)}
                  </Text>
                  <Text className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-md font-bold">
                    {statusPayment}
                  </Text>
                </View>
                <Text className="text-base font-semibold mt-2 uppercase">
                  pendaftaran affiliasi baxlancer
                </Text>
                <Text className="text-sm text-gray-500 mt-1 uppercase">
                  melalui kode referral • {referrerId}
                </Text>
              </View>
            </View>

            {/* Rincian Harga */}
            <View className="mt-5 bg-white p-4 rounded-xl shadow border border-gray-200">
              <Text className="font-bold text-base mb-2">Rincian Harga</Text>
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

            {/* Agreement */}
            <View className="flex-row items-start mt-5 gap-2">
              <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)}>
                <Ionicons
                  name={isAgreed ? "checkbox" : "square-outline"}
                  size={22}
                  color="#2563EB"
                />
              </TouchableOpacity>
              <Text className="font-rubik text-xs text-gray-600 flex-1">
                Saya telah membaca dan setuju terhadap{" "}
                <Text className="text-blue-600 font-rubik-medium text-xs underline">
                  Syarat dan ketentuan pembelian tiket
                </Text>
              </Text>
            </View>
          </ScrollView>

          {/* Bottom Buttons */}
          <View className="px-4 pb-5 gap-3">
            <TouchableOpacity
              onPress={() => router.push("/payment/method")}
              disabled={!isAgreed}
              className={`bg-bax-primaryBlue rounded-full py-4 items-center ${
                !isAgreed && "opacity-50"
              }`}>
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
        </View>
      </SafeAreaView>
    </View>
  );
}
