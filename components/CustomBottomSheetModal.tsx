// components/CustomBottomSheetModal.tsx
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  ReactNode,
  useMemo,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export type BottomSheetModalRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  children: ReactNode;
};

const CustomBottomSheetModal = forwardRef<BottomSheetModalRef, Props>(
  ({ children }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(() => ["75%"], []);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    return (
      <BottomSheetModal
        ref={modalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        style={{ paddingBottom: insets.bottom }}
      >
        <BottomSheetScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 16,
          }}
        >
          <View className="gap-4">{children}</View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheetModal.displayName = "CustomBottomSheetModal";
export default CustomBottomSheetModal;
