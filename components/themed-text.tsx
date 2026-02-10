
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import {TextProps, Text} from "react-native";

export const ThemedText = ({style, ...props}: TextProps) => {
  const {theme, isDark} = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.foreground,
          fontFamily: "Montserrat_400Regular",
          fontSize: 16,
        },
        style,
      ]}
      {...props}
    />
  );
};
