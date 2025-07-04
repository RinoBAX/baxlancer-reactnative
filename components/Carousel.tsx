import images from "@/constants/images";
import React from "react";
import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const data = [
  { title: "Slide 1", image: images.map },
  { title: "Slide 2", image: images.japan },
  { title: "Slide 3", image: images.newYork },
];

export default function CustomCarousel() {
  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - Math.round(progress.value),
      animated: true,
    });
  };

  return (
    <View className="items-center mt-2">
      <Carousel
        ref={ref}
        loop
        width={screenWidth - 30} // batasi lebar sesuai padding parent
        height={200}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={2000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        style={styles.carousel}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />

      <Pagination.Basic
        progress={progress}
        data={data}
        dotStyle={{
          borderRadius: 100,
          backgroundColor: "#262626",
        }}
        activeDotStyle={{
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: "#f1f1f1",
        }}
        containerStyle={styles.paginationContainer}
        horizontal
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    overflow: "hidden",
  },
  item: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    bottom: 16,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  dot: {
    width: 25,
    height: 2,
    backgroundColor: "#3C3C43",
    borderRadius: 100,
  },
  activeDot: {
    backgroundColor: "#f1f1f1",
  },
  paginationContainer: {
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
