import { View, Text, Image } from "react-native";

import icons from "@/constants/icons";
// import { Models } from "react-native-appwrite";

interface Props {
  item: any;
}

const Comment = ({ item }: Props) => {
  return (
    <View className="bg-gray-100 p-3 rounded-xl">
      <View className="flex-row items-center">
        <Image source={item.avatar} className="w-8 h-8 rounded-full" />
        <View className="ml-2">
          <Text className="font-semibold">{item.name}</Text>
          <Text className="text-xs text-gray-500">{item.daysAgo}</Text>
        </View>
      </View>
      <Text className="text-sm text-gray-600 mt-2">{item.text}</Text>
      <Text className="mt-2 text-orange-500 text-xs">❤️ {item.likes}</Text>

      <View className="flex flex-row items-center justify-between w-full mt-4">
        <View className="flex flex-row items-center">
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#0061FF"}
          />
          <Text className="text-black-300 text-sm font-rubik-medium ml-2">
            {item.likes}
          </Text>
        </View>
        <Text className="text-black-100 text-sm font-rubik">
          {new Date(item.daysAgo).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
