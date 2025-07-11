// components/SearchBar.tsx
import { View, Image, TextInput } from "react-native";
import React, { useState, type ReactNode } from "react";
import icons from "@/constants/icons";
import { useLocalSearchParams, usePathname } from "expo-router";

type SearchBarProps = {
  children?: ReactNode;
  value?: string;
  onChangeText?: (text: string) => void;
};

const SearchBar = ({ children, value, onChangeText }: SearchBarProps) => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const handleSearch = (text: string) => {
    setSearch(text);
    // router.setParams({ query: text });
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image
          source={icons.search}
          className="size-5"
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      {/* <TouchableOpacity onPress={() => customRef.current?.open()}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity> */}
      {children && <View className="ml-2">{children}</View>}
    </View>
  );
};

export default SearchBar;
