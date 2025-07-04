import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ProgressBar = ({ visible }: { visible: boolean }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      animation.setValue(0);
      Animated.loop(
        Animated.timing(animation, {
          toValue: width,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    } else {
      animation.stopAnimation();
      animation.setValue(0);
    }
  }, [visible]);

  return visible ? (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: animation }]} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    height: 4,
    width: "100%",
    backgroundColor: "#eee",
    zIndex: 9999,
  },
  bar: {
    height: "100%",
    backgroundColor: "#2D60E3",
  },
});

export default ProgressBar;
