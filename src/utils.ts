import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Platform, StyleSheet } from 'react-native'
import { ColorPalette } from "./context/ThemeContext";

export function formatHHMM(ts?: FirebaseFirestoreTypes.Timestamp | null) {
  if (!ts) return "";
  const d = ts.toDate();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function getSharedStyles(theme: ColorPalette) {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 30,
      borderColor: theme.foreground,
      paddingHorizontal: 15,
      paddingVertical: 15,
      color: theme.foreground
    },
    addButton: {
      position: 'absolute',
      bottom: 60,
      alignSelf: 'center',
      backgroundColor: theme.foreground,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 30,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        },
        android: {
          elevation: 6,
        },
      }),
    }
  })
}