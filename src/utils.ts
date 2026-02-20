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
    },
    swipeableActions: {
      flexDirection: "row",
      height: "100%",
    },
    swipeableAction: {
      width: 96,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.accent,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGrey,
    },
  })
}

export function validateEmail(emailRaw: string): { ok: boolean, error?: string } {
  const email = emailRaw.trim();

  if (!email) return { ok: false, error: "Email is required" };
  if (email.length > 254) return { ok: false, error: "Email is too long" };

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return { ok: false, error: "Enter a valid email address" };

  return { ok: true };
}
