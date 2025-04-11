import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import { collection, serverTimestamp, addDoc, query, where, getDocs } from "firebase/firestore";
import { FavouriteBooksProps } from "@types/book/types";

const useFavouriteBooks = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addToFavourite = async ({ title, key, cover, ratings_average }: FavouriteBooksProps) => {
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user signed in');

      const favBooksRef = collection(db, "favBooks");
      
      const q = query(
        favBooksRef,
        where("userId", "==", user.uid),
        where("key", "==", key)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error('Book already in favourites');
      }

      await addDoc(favBooksRef, {
        title, key, cover, ratings_average,
        userId: user.uid,
        createdAt: serverTimestamp()
      });

      console.log('Book added successfully');
      return { type: 'success', message: 'Book added to favourites' };
    } catch (err: any) {
      return { type: 'error', message: err.message || 'An error occurred' };
    } finally {
      setLoading(false);
    }
  };

  return { addToFavourite, loading };
};

export default useFavouriteBooks;