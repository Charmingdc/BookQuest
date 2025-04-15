import { useState, useEffect } from 'react';
import { auth, db } from '@fb/config.ts';
import { updateProfile } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

const useUserActions = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(auth.currentUser?.displayName || null);
  const [userGenres, setUserGenres] = useState<string[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    setUsername(user.displayName);
    const userRef = doc(db, 'users', user.displayName?.toLowerCase() || '');
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserGenres(data?.preferredGenres || []);
      }
    }, (error) => {
      console.error('Genre sync error:', error.message);
    });

    return () => unsubscribe(); 
  }, []);


  const changeUsername = async (newUsername: string) => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user is logged in');

      const oldUsername = user.displayName;
      if (!oldUsername) throw new Error('Current username not found');

      if (newUsername.trim().length < 4)
        throw new Error('Username must be at least four characters long');

      if (oldUsername === newUsername)
        throw new Error("New username can't be the same as the current username");

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

      return { type: 'success', message: 'Username successfully updated to: ' };
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
      return { type: 'error', message: err.message};
    } finally {
      setSaving(false);
    }
  };


  const updatePreferredGenres = async (newGenre: string) => {
    setSaving(true);
    try {
     if (!newGenre.trim()) throw new Error('Invalid genre value');
     
     const user = auth.currentUser;
     if (!user) throw new Error('No user is logged in');

     if (userGenres.includes(newGenre))
        throw new Error('Genre already added');

     if (userGenres.length >= 20)
       throw new Error('You can only add up to 20 genres');

     const userRef = doc(db, 'users', user.displayName?.toLowerCase() || '');
     await updateDoc(userRef, {
      preferredGenres: [...userGenres, newGenre.toLowerCase()],
     });
   
     return { type: 'success', message:`'${newGenre}' added to genres list successfully` };
    } catch (err: any) {
     return { type: 'error', message: err.message };
    } finally {
     setSaving(false);
    }
  };

  const removePreferredGenre = async (genreToRemove: string) => {
    setSaving(true);
    try {
     const user = auth.currentUser;
     if (!user) throw new Error('No user is logged in');

     const updatedGenres = userGenres.filter(g => g !== genreToRemove);
     const userRef = doc(db, 'users', user.displayName?.toLowerCase() || '');
     await updateDoc(userRef, {
       preferredGenres: updatedGenres,
     });
     
     return { type: 'success', message: `'${genreToRemove}' removed from genres list successfully` };
    } catch (err: any) {
     return { type: 'error', message: err.message };
    } finally {
     setSaving(false);
    }
  };

  return {
    changeUsername,
    signoutUser,
    updatePreferredGenres,
    removePreferredGenre,
    currentUsername: username,
    preferredGenres: userGenres,
    saving,
  };
};

export default useUserActions;