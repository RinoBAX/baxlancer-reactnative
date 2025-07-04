// components/PaginationDot.tsx
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface Props {
  isActive: boolean;
}

export default function PaginationDot({ isActive }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: withTiming(
        isActive ? "#2563eb" : "#d1d5db", // Tailwind: blue-600 & gray-300
        {
          duration: 200,
          easing: Easing.inOut(Easing.poly(2)),
          reduceMotion: ReduceMotion.System,
        }
      ),
    } as ViewStyle;
  });

  useEffect(() => {
    scale.value = withTiming(isActive ? 1.4 : 1, { duration: 200 });
  }, [isActive]);

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 6,
          marginHorizontal: 4,
        },
        animatedStyle,
      ]}
    />
  );
}
