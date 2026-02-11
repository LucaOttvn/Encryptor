import { useTheme } from "@/src/context/ThemeContext";
import React from "react";
import { Text, TextProps } from "react-native";

export const ThemedText = ({style, ...props}: TextProps) => {
  const {theme, isDark} = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.foreground,
          fontFamily: "SpaceMono_400Regular",
          fontSize: 16,
        },
        style,
      ]}
      {...props}
    />
  );
};
