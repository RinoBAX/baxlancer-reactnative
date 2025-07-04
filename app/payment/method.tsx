import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";
import { BlurView } from "expo-blur";
import { usePaymentVerificationHooks } from "../hooks/usePaymentVerification";
import { useBankHooks } from "../hooks/useBankHook";
import images from "@/constants/images";
import { getBankLogo } from "../utils/constants";
import { contactWhatsAppAdmin } from "../utils/openWhatsApp";
import GlobalModal from "@/components/modal/GlobalModal";

// // Helper logo bank berdasarkan accountBank
// const getBankLogo = (bank: bankAccount) => {
//   switch (bank) {
//     case "BCA":
//       return images.BCA_LOGO;
//     case "BNI":
//       return images.BNI_LOGO;
//     case "BRI":
//       return images.BRI_LOGO;
//     case "MANDIRI":
//       return images.MANDIRI_LOGO;
//     case "GOPAY":
//       return images.GOPAY_LOGO;
//     case "OVO":
//       return images.OVO_LOGO;
//     case "SHOPEEPAY":
//       return images.SHOPEEPAY_LOGO;
//     case "DANA":
//       return images.DANA_LOGO;
//     default:
//       return images.noResult;
//   }
// };

const PaymentMethodScreen = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { needPaymentData } = usePaymentVerificationHooks();
  const { banks, loading, error, fetchBanks } = useBankHooks();
  const totalAmount = needPaymentData?.data?.totalPrice ?? 0;

  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const openWarningModal = () => setIsWarningModalOpen(true);
  const closeWarningModal = () => setIsWarningModalOpen(false);

  const navigateToDetail = (id: string) => {
    router.push({
      pathname: "/payment/[id]",
      params: { id },
    });
  };

  const handleConfirmedPaymentToAdmin = async () => {
    setIsLoading(true);
    try {
      const message = `
  Halo Admin,
  
  ------------------------------------
  Saya telah melakukan pendaftaran namun pada halaman metode pembayaran masih belum tersedia metode pembayaran.
  Mohon bantuannya untuk segera memastikan metode pembayaran yang tersedia.
  
  Terima kasih! 🎉
  ------------------------------------
      `;
      await contactWhatsAppAdmin(message.trim());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBanks();
    setRefreshing(false);
  }, [fetchBanks]);

  useEffect(() => {
    fetchBanks();
  }, []);

  const filterBanksByCategory = (category: "Bank" | "E-Wallet" | "QRIS") => {
    return (
      banks?.filter((b) =>
        category === "Bank"
          ? ["BCA", "BNI", "BRI", "MANDIRI"].includes(b.accountBank)
          : ["GOPAY", "OVO", "SHOPEEPAY", "DANA"].includes(b.accountBank)
      ) || []
    );
  };

  const renderBankList = (items: BankAccountResponse[]) => {
    return items.map((bank) => (
      <TouchableOpacity
        key={bank.id}
        onPress={() => navigateToDetail(bank.id)}
        className="flex-row items-center justify-between p-2 border border-gray-200 rounded-xl mt-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={getBankLogo(bank.accountBank)}
            className="size-14"
            resizeMode="contain"
          />
          <Text className="text-gray-700 font-rubik-medium">
            {bank.accountBank}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#888"
        />
      </TouchableOpacity>
    ));
  };

  const qrisData = filterBanksByCategory("QRIS"); // contoh bila mau QRIS di masa depan
  const ewalletData = filterBanksByCategory("E-Wallet");
  const bankData = filterBanksByCategory("Bank");

  return (
    <View className="flex-1 bg-white">
      {/* HEADER + METODE PEMBAYARAN */}
      <View className="bg-bax-primaryBlue">
        <SafeAreaView>
          <View className="px-5">
            {/* Toolbar */}
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center justify-center">
                <Image
                  source={icons.backArrow}
                  className="size-6"
                  tintColor="#ffffff"
                />
              </TouchableOpacity>
              <Text className="text-white text-base font-rubik-medium ml-4">
                Pilih Metode Pembayaran
              </Text>
            </View>

            {/* BAX Pay */}
            <Text className="font-bold text-base mt-4 px-1 text-white">
              BAXPay
            </Text>
            <BlurView
              intensity={70}
              tint="light"
              style={{ borderRadius: 12, overflow: "hidden", marginTop: 2 }}>
              <TouchableOpacity
                className="flex-row items-center justify-between rounded-xl p-4"
                onPress={openWarningModal}>
                {/* Konten KAI Pay */}
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{
                      uri: "https://img.icons8.com/color/48/000000/bank-card-back-side.png",
                    }}
                    className="w-8 h-8"
                  />
                  <View>
                    <Text className="font-semibold text-gray-800 uppercase">
                      bax pay
                    </Text>
                    <Text className="text-xs text-gray-700">
                      co-Branding dengan BAXPRO
                    </Text>
                    <Text className="text-sm text-red-500 mt-1">Aktivasi</Text>
                  </View>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#2563eb"
                />
              </TouchableOpacity>
            </BlurView>

            {/* Metode pembayaran saya */}
            <Text className="font-bold text-base px-1 mt-6 text-white">
              Metode Pembayaran Saya
            </Text>
            <BlurView
              intensity={70}
              tint="light"
              style={{ borderRadius: 12, overflow: "hidden", marginTop: 2 }}>
              <TouchableOpacity className="flex-row items-center justify-between rounded-xl p-4">
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{
                      uri: "https://img.icons8.com/color/48/000000/bank-card-back-side.png",
                    }}
                    className="w-6 h-6"
                  />
                  <Text className="text-gray-800 font-medium">
                    Tambah Pembayaran
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#2563eb"
                />
              </TouchableOpacity>
            </BlurView>
          </View>
        </SafeAreaView>
      </View>

      {/* SCROLLABLE SECTION PUTIH */}
      <View className="flex-1 px-1 bg-white rounded-t-3xl -mt-6 overflow-hidden">
        <ScrollView
          contentContainerStyle={{ padding: 15 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {qrisData.length > 0 && (
            <>
              <Text className="font-bold text-base px-1 text-gray-800 mt-6">
                QRIS
              </Text>
              {renderBankList(qrisData)}
            </>
          )}

          {/* E-Wallet */}
          {ewalletData.length > 0 && (
            <>
              <Text className="font-bold px-1 text-base text-gray-800 mt-6">
                E-Wallet
              </Text>
              {renderBankList(ewalletData)}
            </>
          )}

          {/* Bank */}
          {bankData.length > 0 && (
            <>
              <Text className="font-bold px-1 text-base text-gray-800 mt-6">
                ATM / Mobile / Internet Banking
              </Text>
              {renderBankList(bankData)}
            </>
          )}

          {/* Jika semua kosong */}
          {qrisData.length === 0 &&
            ewalletData.length === 0 &&
            bankData.length === 0 && (
              <View className="w-full flex-col items-center justify-center px-5 mt-10">
                <Image
                  source={images.noResult}
                  className="w-full h-96 mb-2"
                  resizeMode="contain"
                />
                <Text className="text-center text-gray-500">
                  Belum ada metode pembayaran tersedia.
                </Text>
                <TouchableOpacity
                  className={`w-full bg-white border border-bax-primaryBlue py-4 px-8 my-4 rounded-3xl items-center ${
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
                      Hubungi Admin
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
      </View>

      {/* Bottom Action */}
      <SafeAreaView edges={["bottom"]}>
        <View className="px-5 py-6 flex-row items-center justify-between border-t border-bax-primaryBlue/20">
          <Text className="text-gray-500 font-rubik-semibold">Total Harga</Text>
          <Text className="font-rubik-semibold text-gray-900">{`IDR ${
            totalAmount?.toLocaleString("id-ID") ?? 0
          }`}</Text>
        </View>
      </SafeAreaView>

      <GlobalModal
        isOpen={isWarningModalOpen}
        variant="warning"
        title="Fitur BAX Pay belum aktif"
        message="Mohon maaf, fitur BAX Pay saat ini belum tersedia dan akan segera hadir."
        autoClose={3000} // dalam ms, misal 3 detik
        onClose={closeWarningModal}
      />
    </View>
  );
};

export default PaymentMethodScreen;
