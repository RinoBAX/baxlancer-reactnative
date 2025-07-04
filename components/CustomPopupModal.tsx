import React from "react";
import {
  View,
  Modal as RNModal,
  ModalProps,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

type CustomModalProps = ModalProps & {
  isOpen: boolean;
  onBackdropPress?: () => void;
  disableBackdropPress?: boolean;
  withInput?: boolean;
};

const CustomPopupModal = ({
  isOpen,
  onBackdropPress,
  disableBackdropPress = false,
  withInput = false,
  children,
  ...rest
}: CustomModalProps) => {
  const Wrapper = withInput ? KeyboardAvoidingView : View;

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          if (!disableBackdropPress && onBackdropPress) {
            onBackdropPress();
          }
        }}>
        <Wrapper
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // semi transparent background
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              backgroundColor: "white", // white modal box
              borderRadius: 12,
              padding: 20,
              width: "100%",
              maxWidth: 400,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {children}
          </View>
        </Wrapper>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default CustomPopupModal;
