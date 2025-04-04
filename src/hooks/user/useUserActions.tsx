import { useState } from 'react';
import { auth, db } from '@fb/config.ts';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';



const useUserActions = () => {
  const changeUsername = async (newUsername: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in');

      const oldUsername = user.displayName;
      if (!oldUsername) throw new Error('Current username not found');

      if (newUsername.trim().length < 4) throw new Error('Username characters must not be less than four (4)');
      
      if (oldUsername === newUsername) throw new Error('New username can\'t be the same as the current username');

      const userRef = doc(db, 'users', oldUsername.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error('User does not exist in the database');

      await updateProfile(auth.currentUser, { displayName: newUsername });

      await setDoc(doc(db, 'users', newUsername.toLowerCase()), {
        username: newUsername.toLowerCase(),
      }, { merge: true });


      return { type: 'success', message: 'Username updated successfully' };
    } catch (err: any) {
      return { type: 'error', message: err.message };
    }
  };


  const signoutUser = async () => {
    try {
      await auth.signOut();
      return { type: 'success', message: 'Logged out successfully' };
    } catch (err: any) {
      return { type: 'error', message: 'Error logging out' };
    }
  };


  const updatePreferredGenres = async (preferredGenres: string[]) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in');

      const userRef = doc(db, 'users', user.displayName?.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) throw new Error('User does not exist in the database');

      await setDoc(userRef, { preferredGenres }, { merge: true });


      return { type: 'success', message: 'Preferred genres updated successfully' };
    } catch (err: any) {
      return { type: 'error', message: err.message };
    }
  };

  return {
    changeUsername,
    signoutUser,
    updatePreferredGenres,
  };
};

export default useUserActions;