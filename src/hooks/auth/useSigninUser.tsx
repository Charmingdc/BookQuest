import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";

type SigninCredProps = {
  username: string;
  password: string;
};

const useSigninUser = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const signin = async ({ username, password }: SigninCredProps) => {
    setLoading(true);

    try {
      const userRef = doc(collection(db, "users"), username.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        return { type: "error", message: "This username is not registered on BookQuest" };
      }

      const email = userSnap.data()?.email;
      if (!email) {
        return { type: "error", message: "User email not found." };
      }

      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const emailVerified = userCredentials.user.emailVerified;

      if (!emailVerified) {
       await signOut(auth);
       return { type: "error", message: "Signin unsuccessful, verify your email and try again" };
      }

      return { type: "success", message: `Welcome back ${username}` };
    } catch (err: any) {
      console.log("Error signing user in:", err.message);
      return { type: "error", message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { signin, loading };
};

export default useSigninUser;