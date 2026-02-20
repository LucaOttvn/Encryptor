import React, {ReactNode} from "react";
import {StyleSheet, Text, View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

type SwipeableComponentProps = {
  actions: () => React.JSX.Element;
  children: React.ReactNode;
};

export default function SwipeableComponent(props: SwipeableComponentProps) {
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable renderRightActions={props.actions} overshootRight={false}>
        {props.children}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}
