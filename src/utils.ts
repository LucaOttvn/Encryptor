import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import * as Notifications from "expo-notifications";
import { StyleSheet } from 'react-native';
import { ColorPalette } from "./context/ThemeContext";
import { updateUser } from "./services/user/updateUser";

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

/**
 * Get the Expo notification token.
 * This token is the “address” the backend needs to target the user's device through Expo’s push service.
*/
export async function getExpoPushToken() {
  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}

/**
 * Check whether the user gave the permission for notifications. 
 * If they didn't, show the popup.
 * After the confirmation, update the user with the expoPushToken field.
 */
export async function handleNotificationToken(uid: string) {
  const current = await Notifications.getPermissionsAsync();
  let granted = current.granted;

  if (!granted) {
    const requested = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    granted = requested.granted;
  }

  if (!granted) {
    return { ok: false as const, reason: "no-permission" as const };
  }

  const tokenRes = await Notifications.getExpoPushTokenAsync();
  const token = tokenRes.data;

  await updateUser(uid, { expoPushToken: token });

  return { ok: true as const, token };
}