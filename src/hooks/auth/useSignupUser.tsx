import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import { collection, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

type SignupCredProps = {
  username: string;
  email: string;
  password: string;
};

const useSignupUser = () => {
 const [loading, setLoading] = useState<boolean>(false);

 const signup = async ({ username, email, password }: SignupCredProps) => {
   setLoading(true);

   try {
    const userRef = doc(collection(db, "users"), username.toLowerCase());
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) return { type: "error", message: "Username already exists." };

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);

    await setDoc(userRef, {
      username,
      email,
      joinedAt: serverTimestamp(),
    });

    return { type: "success", message: "Sign up successful, check your inbox for confirmation email." };
   } catch (err: any) {
    return { type: "error", message: err.message };
   } finally {
    setLoading(false);
   }
 };
 
 const logout = async () => {
   try {
     await signOut(auth);
   } catch (err: any) {
     console.log('Error logging user out:', err.message);
   }
 };

 return { signup, loading, logout };
};

export default useSignupUser;