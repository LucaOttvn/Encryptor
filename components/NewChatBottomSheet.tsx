import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { BottomSheetModal, type BottomSheetModalProps } from "@gorhom/bottom-sheet";

export type GeneralBottomSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = Omit<BottomSheetModalProps, "ref" | "snapPoints" | "children"> & {
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export const GeneralBottomSheet = forwardRef<GeneralBottomSheetRef, Props>(
  function GeneralBottomSheet(
    {
      snapPoints: snapPointsProp,
      children,
      contentContainerStyle,
      ...modalProps
    },
    ref
  ) {
    const modalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo<(string | number)[]>(
      () => snapPointsProp ?? ["60%", "90%"],
      [snapPointsProp]
    );

    const open = useCallback(() => modalRef.current?.present(), []);
    const close = useCallback(() => modalRef.current?.dismiss(), []);

    useImperativeHandle(ref, () => ({ open, close }), [open, close]);

    return (
      <BottomSheetModal ref={modalRef} snapPoints={snapPoints} index={0} {...modalProps}>
        <View style={[{ padding: 12 }, contentContainerStyle]}>{children}</View>
      </BottomSheetModal>
    );
  }
);
