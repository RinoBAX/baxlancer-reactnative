import icons from "@/constants/icons";
import React from "react";
import {
  Modal,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function GalleryModal({
  visible,
  images,
  onClose,
}: {
  visible: boolean;
  images: any[];
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black justify-center items-center">
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{ width, height: height * 0.8 }}
              resizeMode="contain"
            />
          )}
          keyExtractor={(_, idx) => idx.toString()}
        />
        <TouchableOpacity
          className="absolute top-10 right-5 bg-white p-2 rounded-full"
          onPress={onClose}
        >
          <Image source={icons.logout} className="w-5 h-5" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
