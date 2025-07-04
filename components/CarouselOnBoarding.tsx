import React, { useState, useCallback } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { router, useFocusEffect, useRouter } from "expo-router";
import images from "@/constants/images";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
  ReduceMotion,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import PaginationDot from "./PaginationDot";
import { SafeAreaView } from "react-native-safe-area-context";
import gif from "@/constants/gif";
import GlobalModal from "./modal/GlobalModal";
import { setIsFirstLaunch } from "@/app/utils/storage";

const COLORS = {
  primary: "#030014",
  bluePrimary: "#1b4974",
  accent: "#0762D9",
};

const onboardingData = [
  {
    id: 1,
    title: "Gabung & Dapat Duit Sambil Rebahan",
    description:
      "Di BAXLancer, kamu bisa jadi affiliate dan hasilkan komisi dari tiap user yang daftar pakai link kamu. Gak perlu ribet, cukup share link dan duit ngalir sendiri.",
    image: images.goodTeam,
  },
  {
    id: 2,
    title: "Dapetin Duit Sambil Rebahan? Bisa Banget Broo!",
    description:
      "Selain jadi affiliate, kamu juga bisa ngerjain project dari klien. Dari rumah, dari kosan, dari mana aja — yang penting skill jalan, saldo nambah.",
    image: images.relax,
  },
  {
    id: 3,
    title: "Passive Income Jalan Terus",
    description:
      "BAXLancer bikin kamu bisa tetap dapet penghasilan pasif sambil fokus kerja utama. Tinggal rebahan, duit tetap datang!",
    image: images.income,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const fadeAnim = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      setCurrentIndex(0);
      fadeAnim.value = 1;
    }, [])
  );

  const handleNext = async () => {
    if (currentIndex < onboardingData.length - 1) {
      // Masih ada slide berikutnya → lanjutkan animasi + ganti index
      fadeAnim.value = withTiming(
        0,
        {
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          reduceMotion: ReduceMotion.System,
        },
        (finished) => {
          if (finished) {
            runOnJS(setCurrentIndex)(currentIndex + 1);

            fadeAnim.value = withTiming(1, {
              duration: 700,
              easing: Easing.in(Easing.sin),
              reduceMotion: ReduceMotion.System,
            });
          }
        }
      );
    } else {
      // Ini slide terakhir → animasi fade-out lalu redirect
      // fadeAnim.value = withTiming(
      //   0,
      //   {
      //     duration: 600,
      //     easing: Easing.out(Easing.sin),
      //     reduceMotion: ReduceMotion.System,
      //   },
      //   (finished) => {
      //     if (finished) {
      //       runOnJS(async () => {
      //         await setIsFirstLaunch(false);
      //         router.replace("/login");
      //       })();
      //     }
      //   }
      // );
      await setIsFirstLaunch(false);
      router.replace("/login");
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const currentSlide = onboardingData[currentIndex];
  if (!currentSlide) return null;

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.bluePrimary, COLORS.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-between">
          {/* Title & description (rata kiri) */}
          <Animated.View style={[animatedStyle]}>
            <View className="px-5 pt-8 mt-4">
              <Text className="font-rubik-semibold text-2xl text-white text-left">
                {currentSlide.title}
              </Text>
              <Text className="text-white/70 text-left mt-3 pr-3 font-rubik-medium text-xs">
                {currentSlide.description}
              </Text>
            </View>
          </Animated.View>

          {/* Image di tengah screen */}
          <Animated.View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",
                // flex: 1,
              },
              animatedStyle,
            ]}>
            <Image
              source={currentSlide.image}
              className="w-full h-4/6"
              resizeMode="cover"
            />
          </Animated.View>

          {/* Pagination dan tombol lanjut */}
          <View className="items-center px-5 pb-12">
            <View className="flex-row justify-center mb-1">
              {onboardingData.map((_, index) => (
                <PaginationDot
                  key={index}
                  isActive={index === currentIndex}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleNext}
              className="bg-white py-4 px-6 rounded-xl w-full my-4">
              <Text className="text-center text-bax-primaryBlue font-rubik-bold text-sm">
                LANJUTKAN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
