import React, { useState } from "react";
// import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity } from "react-native";

import { categories } from "@/constants/data";

type FiltersProps = {
  options: string[];
  selected: string;
  onSelect: (category: string) => void;
};

const Filters = ({ options, selected, onSelect }: FiltersProps) => {
  const handleCategoryPress = (category: string) => {
    if (selected === category) {
      onSelect("All");
    } else {
      onSelect(category);
    }
  };

  // const handleCategoryPress = (category: string) => {
  //   if (selectedCategory === category) {
  //     setSelectedCategory("");
  //     router.setParams({ filter: "" });
  //     return;
  //   }

  //   setSelectedCategory(category);
  //   router.setParams({ filter: category });
  // };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2">
      {options.map((category) => (
        <TouchableOpacity
          onPress={() => onSelect(category)}
          key={category}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
            selected === category
              ? "bg-accent"
              : "bg-primary-100 border border-bax-grey/30"
          }`}>
          <Text
            className={`text-sm ${
              selected === category
                ? "text-white font-rubik-bold mt-0.5"
                : "text-black-300 font-rubik"
            }`}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
