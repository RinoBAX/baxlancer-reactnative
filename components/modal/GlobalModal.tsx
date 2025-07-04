import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import icons from "@/constants/icons"; // pastikan kamu punya icon success, error, info
import CustomPopupModal from "../CustomPopupModal";

interface GlobalModalProps {
  isOpen: boolean;
  variant: ModalVariant;
  title?: string;
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void; // hanya untuk variant: action
  onCancel?: () => void; // hanya untuk variant: action
  autoClose?: number;
  confirmText?: string;
  cancelText?: string;
}

const GlobalModal = ({
  isOpen,
  variant,
  title,
  message,
  onClose,
  onConfirm,
  onCancel,
  autoClose,
  confirmText = "Ya",
  cancelText = "Tidak",
}: GlobalModalProps) => {
  useEffect(() => {
    if (isOpen && autoClose && onClose) {
      const timeout = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timeout);
    }
  }, [isOpen, autoClose, onClose]);

  const getIcon = () => {
    switch (variant) {
      case "success":
        return icons.success; // icon ceklist
      case "error":
        return icons.errorIcon; // icon silang
      case "info":
        return icons.infoCircle; // icon info
      case "warning":
        return icons.warning; // icon info
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (variant === "loading") {
      return (
        <View className="items-center justify-center gap-3">
          {title && (
            <Text className="text-lg font-bold text-black-300 text-center">
              {title}
            </Text>
          )}
          <ActivityIndicator
            size="large"
            color="#2D60E3"
          />
          {message && (
            <Text className="mt-3 text-black-300 text-base text-center">
              {message}
            </Text>
          )}
        </View>
      );
    }

    if (variant === "action") {
      return (
        <View className="items-center">
          {title && (
            <Text className="text-lg font-bold text-black-300 text-center">
              {title}
            </Text>
          )}
          {message && (
            <Text className="mt-2 mb-4 text-black-300 text-center">
              {message}
            </Text>
          )}
          <View className="flex-row justify-between gap-3 mt-2">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-2 bg-gray-200 rounded-lg">
              <Text className="text-center text-black-300">{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 py-2 bg-primary-500 rounded-lg">
              <Text className="text-center text-white">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // default untuk success, error, info
    return (
      <View className="items-center">
        {getIcon() && (
          <Image
            source={getIcon()}
            className="w-12 h-12 mb-4"
            resizeMode="contain"
          />
        )}
        {title && (
          <Text className="text-lg font-bold text-black-300 text-center">
            {title}
          </Text>
        )}
        {message && (
          <Text className="mt-2 text-black-300 text-center">{message}</Text>
        )}
        {onClose && (
          <TouchableOpacity
            onPress={onClose}
            className="mt-5 py-2 px-4 bg-primary-500 rounded-lg">
            <Text className="text-white text-center">Tutup</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <CustomPopupModal
      isOpen={isOpen}
      onBackdropPress={onClose}
      disableBackdropPress={variant === "action"} // hanya action modal yang tidak bisa close via backdrop
    >
      {renderContent()}
    </CustomPopupModal>
  );
};

export default GlobalModal;
