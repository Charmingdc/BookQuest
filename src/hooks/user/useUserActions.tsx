import { useState, useEffect } from 'react';
import { auth, db } from '@fb/config.ts';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const useUserActions = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(auth.currentUser?.displayName || null);
  
  
  useEffect(() => {
   const user = auth.currentUser;
   if (user?.displayName) setUsername(user.displayName);
  }, []);



  const changeUsername = async (newUsername: string) => {
    setSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in');

      const oldUsername = user.displayName;
      if (!oldUsername) throw new Error('Current username not found');

      if (newUsername.trim().length < 4)
        throw new Error('Username characters must not be less than four (4)');

      if (oldUsername === newUsername)
        throw new Error('New username can\'t be the same as the current username');

      const oldUserRef = doc(db, 'users', oldUsername.toLowerCase());
      const oldUserSnap = await getDoc(oldUserRef);

      if (!oldUserSnap.exists())
        throw new Error('User does not exist in the database');

      const userData = oldUserSnap.data();

      await updateProfile(user, { displayName: newUsername });
      setUsername(newUsername);
      
      const newUserRef = doc(db, 'users', newUsername.toLowerCase());
      await setDoc(newUserRef, {
        ...userData,
        username: newUsername.toLowerCase(),
      });

      await deleteDoc(oldUserRef);

      return { type: 'success', message: 'Username updated successfully' };
    } catch (err: any) {
      return { type: 'error', message: err.message };
    } finally {
      setSaving(false);
    }
  };


  const signoutUser = async () => {
    setSaving(true);
    try {
      await auth.signOut();
      setUsername(null);
      
      return { type: 'success', message: 'Logged out successfully' };
    } catch (err: any) {
      return { type: 'error', message: 'Error logging out' };
    } finally {
      setSaving(false);
    }
  };


  const updatePreferredGenres = async (preferredGenres: string[]) => {
    setSaving(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in');

      const userRef = doc(db, 'users', user.displayName?.toLowerCase() || '');
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists())
        throw new Error('User does not exist in the database');

      await updateDoc(userRef, { preferredGenres });

      return { type: 'success', message: 'Preferred genres updated successfully' };
    } catch (err: any) {
      return { type: 'error', message: err.message };
    } finally {
      setSaving(false);
    }
  };
  

  const currentUsername = () => username;

  return {
    changeUsername,
    signoutUser,
    updatePreferredGenres,
    currentUsername: username,
    saving,
  };
};

export default useUserActions;