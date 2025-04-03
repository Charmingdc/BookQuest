import { useState } from "react";
// import { auth, db } from "@firebase/config.ts";


type UserSignupProps = {
 username: string;
 email: string;
 password: string;
}

const signupUser = async ({ username, email, password}: UserSignupProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  
  try {
    setLoading(true);
  
  } catch (err: any) {
    console.error('Error signing user up:', err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}
export default signupUser;