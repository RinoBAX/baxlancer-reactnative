import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
// import { Models } from "react-native-appwrite";

interface Props {
  //   item: Models.Document;
  item?: any;
  onPress?: () => void;
}
type Status = "APPROVED" | "PENDING" | "REJECTED";

interface ReportCardProps {
  item: {
    id: string;
    title: string;
    status: string; // e.g., APPROVED, PENDING, REJECTED
    price: string | number;
    referral: string;
    category: string;
  };
  onPress?: () => void;
}

export const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative">
      <Image
        source={item.image}
        className="size-full rounded-2xl"
      />
      {/* <Image source={images.japan} className="size-full rounded-2xl" /> */}

      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image
          source={icons.star}
          className="size-3.5"
        />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          {item.rating}
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text
          className="text-xl font-rubik-extrabold text-primary"
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          className="text-base font-rubik text-primary"
          numberOfLines={1}>
          {item.location}
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">
            ${item.price}
          </Text>
          <Image
            source={icons.heart}
            className="size-5"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
      onPress={onPress}>
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image
          source={icons.star}
          className="size-2.5"
        />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">
          {item.rating}
        </Text>
      </View>

      <Image
        source={{ uri: item.picture }}
        className="w-full h-40 rounded-lg"
      />

      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-bold text-primary/70">
          {item.name}
        </Text>
        <Text className="text-xs font-rubik text-primary/30">
          {item.Category.name}
        </Text>

        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            IDR {item.price}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const statusIconMap: Record<string, any> = {
  APPROVED: icons.success,
  PENDING: icons.pending,
  REJECTED: icons.errorIcon,
};
const statusColorMap: Record<Status, { tint: string; bg: string }> = {
  APPROVED: { tint: "#22C55E", bg: "#D1FAE5" }, // Hijau + Hijau muda
  PENDING: { tint: "#FACC15", bg: "#FEF9C3" }, // Kuning + Kuning muda
  REJECTED: { tint: "#EF4444", bg: "#FECACA" }, // Merah + Merah muda
};
export const ReportCard = ({ item, onPress }: ReportCardProps) => {
  const status = item.status?.toUpperCase() as Status;
  const iconSource = statusIconMap[status] || icons.pending;
  const { tint, bg } = statusColorMap[status] || statusColorMap.PENDING;
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center bg-white px-5 py-3 rounded-2xl mb-4 shadow-md shadow-gray-400">
        {/* Ikon Status */}
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: bg }}>
          <Image
            source={iconSource}
            style={{
              width: 20,
              height: 20,
              tintColor: tint,
              borderRadius: 100,
            }}
            resizeMode="contain"
          />
        </View>
        <View className="flex-1 ml-3 justify-between">
          <View className="flex-row justify-between">
            <Text className="font-rubik-semibold text-sm flex-1 pr-1">
              {item.title}
            </Text>
            <Text
              className=" text-xs font-rubik-medium px-2 py-0.5 rounded-xl"
              style={{ backgroundColor: bg, color: tint }}>
              {item.status}
            </Text>
          </View>
          <Text className="text-xs text-gray-400 mt-1">{item.referral}</Text>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <Image
                source={iconSource}
                className="size-2.5"
                tintColor={tint}
              />
              <Text className="ml-1 text-xs">{item.category}</Text>
            </View>
            <Text className="text-bax-primaryBlue font-bold text-sm">
              {item.price}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
