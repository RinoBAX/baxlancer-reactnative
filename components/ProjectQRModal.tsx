import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import * as ClipboardExpo from "expo-clipboard"; // Untuk Expo
import QRCode from "react-native-qrcode-svg"; // Pastikan kamu install ini

import CustomPopupModal from "@/components/CustomPopupModal";
import icons from "@/constants/icons";
import Toast from "react-native-toast-message";

const ProjectQRModal = ({
  isModalOpen,
  setIsModalOpen,
  projectUrl,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  projectUrl: string;
}) => {
  const handleCopy = () => {
    if (Platform.OS === "web") {
      navigator.clipboard.writeText(projectUrl);
    } else {
      ClipboardExpo.setStringAsync(projectUrl);
    }

    Toast.show({
      type: "success",
      text1: "URL disalin!",
      text2: "Link berhasil disalin ke clipboard.",
      position: "top",
    });
  };

  const handleRedirect = async () => {
    try {
      const supported = await Linking.canOpenURL(projectUrl);
      if (supported) {
        await Linking.openURL(projectUrl);
      } else {
        Alert.alert(
          "Tidak dapat membuka link",
          "URL tidak valid atau tidak didukung."
        );
      }
    } catch (error) {
      Alert.alert(
        "Gagal membuka link",
        "Terjadi kesalahan saat mencoba membuka URL."
      );
    }
  };

  return (
    <CustomPopupModal isOpen={isModalOpen}>
      <View className="bg-white w-full p-4 rounded-xl items-center">
        <View className="flex flex-row items-center justify-between w-full mb-4">
          <Text className="text-black-300 text-base font-rubik-bold">
            Start Project
          </Text>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <Image
              source={icons.closeCircle}
              className="size-8"
            />
          </TouchableOpacity>
        </View>

        {/* QR Code */}
        <QRCode
          value={projectUrl}
          size={180}
        />

        {/* URL and Copy Button */}
        <View className="mt-4 flex-row items-center justify-center bg-gray-100 px-4 py-2 gap-3 rounded-lg">
          <Text
            numberOfLines={1}
            className="flex-1 text-black-300 text-sm mr-2">
            {projectUrl}
          </Text>
          <TouchableOpacity onPress={handleCopy}>
            <Image
              source={icons.copyIcon}
              className="w-5 h-5"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRedirect}>
            <Image
              source={icons.redirect}
              className="w-5 h-5"
            />
          </TouchableOpacity>
        </View>
      </View>
    </CustomPopupModal>
  );
};

export default ProjectQRModal;
