import { useAffDownLineHook } from "@/app/hooks/useAffiliateHook";
import OnboardingCarousel from "@/components/CarouselOnBoarding";
import TeamCard from "@/components/TeamCard";
import icons from "@/constants/icons";
import { AffiliateDownLineResponse } from "@/interfaces/affiliate";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  blueSky: "#3685CE",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const DownlineListScreen = () => {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const {
    downLineData,
    loading,
    error,
    totalCount,
    totalPage,
    currentPage,
    setPage,
    fetchDownLine,
  } = useAffDownLineHook();
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState<string | null>(null);
  const height = useSharedValue(0);

  useEffect(() => {
    fetchDownLine(currentPage);
  }, [currentPage]);

  const yourUpline = downLineData?.your_upline;
  const downlines = downLineData?.downlines || [];

  const handleNextPage = async () => {
    if (currentPage < totalPage) {
      setPaginationLoading(true);
      try {
        const nextPage = currentPage + 1;
        await fetchDownLine(nextPage);
        setPage(nextPage);
      } catch (err) {
        console.error("Failed to fetch next page:", err);
      } finally {
        setPaginationLoading(false);
      }
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      setPaginationLoading(true);
      try {
        const prevPage = currentPage - 1;
        await fetchDownLine(prevPage);
        setPage(prevPage);
      } catch (err) {
        console.error("Failed to fetch prev page:", err);
      } finally {
        setPaginationLoading(false);
      }
    }
  };

  const toggleAccordion = (id: string) => {
    setIsExpanded((prev) => (prev === id ? null : id));
    height.value = withTiming(isExpanded ? 0 : 60, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    overflow: "hidden",
  }));

  return (
    <View className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-gray-500">Sedang memuat data bank...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center bg-white px-4">
          <Text className="text-red-500 mb-2">Error: {error}</Text>
          <TouchableOpacity
            onPress={() => fetchDownLine(currentPage)}
            className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white">Coba lagi</Text>
          </TouchableOpacity>
        </View>
      ) : !downLineData ? (
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg text-red-500">Tim tidak ditemukan 😢</Text>
        </View>
      ) : (
        <>
          {/* Header Linear Gradient */}
          <LinearGradient
            colors={[COLORS.bluePrimary, COLORS.accent, COLORS.blueSky]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <SafeAreaView>
              <View className="px-5">
                {/* Toolbar Header */}
                <View className="flex-row items-center my-2">
                  <TouchableOpacity onPress={() => router.back()}>
                    <Image
                      source={icons.backArrow}
                      className="size-6"
                      tintColor="#ffffff"
                    />
                  </TouchableOpacity>
                  <Text className="text-white text-base font-rubik-medium ml-4">
                    Tim Member Kamu
                  </Text>
                </View>

                {/* Header Content */}
                <BlurView
                  intensity={50}
                  tint="light"
                  style={{
                    borderRadius: 12,
                    overflow: "hidden",
                    marginTop: 16,
                  }}>
                  <View className=" p-4 rounded-2xl">
                    <Text className="font-bold text-base mb-1 px-3">
                      Tim Kamu
                    </Text>
                    <View className="bg-white/50 p-3 rounded-xl">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600">
                          Manajer Kamu
                        </Text>
                        <Text className="text-xs bg-orange-100 text-orange-500 px-2 py-0.5 rounded-md font-bold">
                          {yourUpline?.name || "-"}
                        </Text>
                      </View>
                      <Text className="text-sm text-gray-500 mt-1 uppercase">
                        {yourUpline?.email}
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </View>
            </SafeAreaView>
          </LinearGradient>

          {/* Main Content List Card Downline*/}
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
                {downlines.map((downline) => (
                  <View
                    key={downline.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 mb-2">
                    <Text className="font-medium text-black">
                      {downline.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {downline.email}
                    </Text>
                    <Text className="text-xs text-green-600 mt-1">
                      Total Achievements: {downline.total_achievements}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-0.5">
                      Total sub-downlines: {downline.total_sub_downlines}
                    </Text>

                    {downline.sub_downline && (
                      // {/* Accordion for see total downline */}
                      <TouchableOpacity
                        onPress={() => toggleAccordion(downline.id)}
                        className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <Image
                            source={icons.people}
                            className="size-4"
                            tintColor="2563eb"
                          />
                          <Text className="font-rubik-medium text-xs text-bax-primaryBlue">
                            Lihat sub-downline
                          </Text>
                        </View>
                        <Ionicons
                          name={
                            isExpanded === downline.id
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={10}
                          color="#000"
                        />
                      </TouchableOpacity>
                    )}

                    {isExpanded === downline.id && (
                      <Animated.View
                        style={animatedStyle}
                        className="mt-4">
                        <View className="mt-2 bg-blue-50 p-2 rounded-lg">
                          <Text className="text-xs text-blue-800">
                            Latest sub-downline:
                          </Text>
                          <Text className="text-blue-900 font-medium">
                            {downline.sub_downline?.email}
                          </Text>
                        </View>
                      </Animated.View>
                    )}
                  </View>
                ))}
              </ScrollView>

              {/* Bottom Buttons */}
              <View className="flex flex-row justify-between items-center px-5  pb-5 gap-3 bottom-12">
                {currentPage > 1 && (
                  <TouchableOpacity
                    onPress={handlePrevPage}
                    disabled={currentPage <= 1}
                    className="flex flex-row items-center">
                    <Image
                      source={icons.backArrow}
                      className="w-5 h-5"
                    />
                    <Text className="text-base text-black-300 ml-2">
                      Previous
                    </Text>
                  </TouchableOpacity>
                )}
                <Text className="font-rubik-semibold text-xs text-bluePrimary">
                  Page {currentPage <= 1 ? currentPage : `of ${totalPage}`}
                </Text>
                {currentPage < totalPage && (
                  <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={currentPage >= totalPage}>
                    <Text
                      className={`text-base ${
                        currentPage >= totalPage
                          ? "text-gray-400"
                          : "text-black-300"
                      }`}>
                      Next
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </SafeAreaView>
        </>
      )}
    </View>
  );
};

export default DownlineListScreen;
