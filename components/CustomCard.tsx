import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";

interface CardContainerProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  children,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  content: {
    // You can define spacing or layout here
  },
});

export default CardContainer;
