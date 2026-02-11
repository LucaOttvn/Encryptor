import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import auth, {GoogleAuthProvider} from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import type {FirebaseAuthTypes} from "@react-native-firebase/auth";

type AuthCtx = {
  user: any | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged((u) => {
      setUser(u);
      setIsLoading(false);
    });
    return unsub;
  }, []);

  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    await GoogleSignin.signIn();
    const {idToken} = await GoogleSignin.getTokens();
    if (!idToken) throw new Error("No Google idToken");

    const credential = GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(credential);
  }

  async function signOutUser() {
    await auth().signOut();
    // Show the google account chooser on the next login
    await GoogleSignin.signOut();
  }

  const value = useMemo(() => ({user, isLoading, signInWithGoogle, signOut: signOutUser}), [user, isLoading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
