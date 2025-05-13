import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import {
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";


const useGoogleAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const googleAuth = async (): Promise<{ type: string; message: string } | null> => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const email = user.email || "";
      const username = email.split("@")[0].toLowerCase();
      const userRef = doc(db, "users", username);

      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await updateProfile(user, { displayName: username });

        await setDoc(userRef, {
          username,
          email,
          joinedAt: serverTimestamp(),
        });

        return { type: "success", message: "Sign up successful." };
      } else {
        return { type: "success", message: "Welcome back, Chapter Chaser!" };
      }
    } catch (err: any) {
      console.error("Error signing in with Google:", err);
      return { type: "error", message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { googleAuth, loading };
};

export default useGoogleAuth;