import React, {useEffect, useMemo, useRef} from "react";
import {View, type StyleProp, type ViewStyle} from "react-native";
import {BottomSheetBackdropProps, BottomSheetModal, type BottomSheetModalProps} from "@gorhom/bottom-sheet";
import {useTheme} from "@/src/context/ThemeContext";
import {BottomSheetBackdrop} from "@gorhom/bottom-sheet";

type Props = Omit<BottomSheetModalProps, "ref" | "snapPoints" | "children"> & {
  isOpen: boolean;
  onDismiss?: () => void;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function GeneralBottomSheet({isOpen, onDismiss, snapPoints: snapPointsProp, children, contentContainerStyle, ...modalProps}: Props) {
  const modalRef = useRef<BottomSheetModal>(null);
  const {theme} = useTheme();

  const snapPoints = useMemo<(string | number)[]>(() => snapPointsProp ?? ["90%"], [snapPointsProp]);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
      return;
    }
    modalRef.current?.dismiss();
  }, [isOpen]);

  const renderBackdrop = (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />;

  return (
    <BottomSheetModal
      {...modalProps}
      ref={modalRef}
      snapPoints={snapPoints}
      index={0}
      onDismiss={onDismiss}
      enableDynamicSizing={false}
      backgroundStyle={{backgroundColor: theme.mainContent, borderRadius: 30}}
      handleIndicatorStyle={{backgroundColor: theme.foreground}}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={[{padding: 12, flex: 1}, contentContainerStyle]}>{children}</View>
    </BottomSheetModal>
  );
}
