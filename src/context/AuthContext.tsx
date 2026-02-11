import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  GoogleAuthProvider,
  type FirebaseAuthTypes,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

type AuthCtx = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authInstance = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(authInstance, (u) => {
      setUser(u);
      setIsLoading(false);
    });
    return unsub;
  }, [authInstance]);

  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signIn();

    const { idToken } = await GoogleSignin.getTokens();
    if (!idToken) throw new Error("No Google idToken");

    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(authInstance, credential);
  }

  async function signOutUser() {
    await signOut(authInstance);
    // Show the Google account chooser next time
    await GoogleSignin.signOut();
  }

  const value = useMemo(
    () => ({ user, isLoading, signInWithGoogle, signOut: signOutUser }),
    [user, isLoading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
