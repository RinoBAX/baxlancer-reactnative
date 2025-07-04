import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomReportField } from "@/interfaces/service";

type Field = {
  name: string;
  type: "string" | "number" | "email" | "phone" | "date" | "image" | "file";
};

type DynamicFieldInputProps = {
  field: CustomReportField;
  value: string;
  onChange: (name: string, value: string) => void;
};

const DynamicFieldInput = ({
  field,
  value,
  onChange,
}: DynamicFieldInputProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const requestPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return (
      cameraPermission.status === "granted" &&
      mediaPermission.status === "granted"
    );
  };

  const handlePickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      alert("Izin kamera/galeri tidak diberikan.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onChange(field.key, result.assets[0].uri);
    }
  };

  const handlePickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      alert("Izin kamera/galeri tidak diberikan.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onChange(field.key, result.assets[0].uri);
    }
  };

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets?.length > 0) {
      onChange(field.key, result.assets[0].uri);
    }
  };

  const renderInput = () => {
    switch (field.type) {
      case "TEXT":
      case "EMAIL":
      case "TEL":
      case "NUMBER":
        return (
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder={`Masukkan ${field.label}`}
            value={value}
            keyboardType={
              field.type === "EMAIL"
                ? "email-address"
                : field.type === "TEL"
                ? "phone-pad"
                : field.type === "NUMBER"
                ? "numeric"
                : "default"
            }
            onChangeText={(val) => onChange(field.key, val)}
          />
        );

      case "DATE":
        return (
          <>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="border border-gray-300 rounded-lg p-2 bg-gray-50">
              <Text className="text-gray-700">
                {value ? new Date(value).toLocaleDateString() : "Pilih Tanggal"}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    onChange(field.key, selectedDate.toISOString());
                  }
                }}
              />
            )}
          </>
        );

      case "IMAGE":
        return (
          <>
            <TouchableOpacity
              onPress={() => setShowImageModal(true)}
              className="bg-gray-100 p-3 rounded-lg mb-2">
              <Text className="text-blue-600">Unggah Gambar</Text>
            </TouchableOpacity>

            {value ? (
              <Image
                source={{ uri: value }}
                className="w-16 h-16 rounded-lg"
              />
            ) : null}

            <Modal
              visible={showImageModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowImageModal(false)}>
              <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-4 rounded-lg w-64">
                  <Text className="font-semibold mb-2">
                    Pilih Sumber Gambar
                  </Text>
                  <TouchableOpacity
                    className="p-2 border-b border-gray-200"
                    onPress={() => {
                      setShowImageModal(false);
                      handlePickImageFromCamera();
                    }}>
                    <Text>📷 Kamera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2 border-b border-gray-200"
                    onPress={() => {
                      setShowImageModal(false);
                      handlePickImageFromGallery();
                    }}>
                    <Text>🖼️ Galeri</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="p-2"
                    onPress={() => setShowImageModal(false)}>
                    <Text className="text-red-500">Batal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        );

      case "FILE":
        return (
          <TouchableOpacity
            onPress={handlePickFile}
            className="bg-gray-100 p-3 rounded-lg">
            <Text className="text-blue-600">
              {value ? "File Dipilih" : "Pilih File"}
            </Text>
          </TouchableOpacity>
        );

      default:
        return <Text className="text-red-500">Tipe input tidak dikenal</Text>;
    }
  };

  return (
    <View className="mb-2">
      <Text className="text-base font-semibold mb-1">{field.label}</Text>
      {renderInput()}
    </View>
  );
};

export default DynamicFieldInput;
