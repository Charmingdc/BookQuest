import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import { collection, serverTimestamp, addDoc, query, where, getDocs } from "firebase/firestore";
import { FavouriteBooksProps } from "@types/book/types";
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface FavouriteBooksPropsWithId extends FavouriteBooksProps {
  id: string;
}

const useFavouriteBooks = () => {
  const [updatingFavBooks, setUpdatingFavBooks] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const addToFavourite = async ({ title, isbn, cover, ratings_average }: FavouriteBooksProps) => {
    setUpdatingFavBooks(true);
    
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No user signed in');

      const favBooksRef = collection(db, "favBooks");
      const q = query(
        favBooksRef,
        where("userId", "==", user.uid),
        where("isbn", "==", isbn)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error('Book already in favourites');
      }

      await addDoc(favBooksRef, {
        title, isbn, cover, ratings_average,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      
      queryClient.invalidateQueries(['favouriteBooks']);
      
      return { type: 'success', message: 'Book added to favourites' };
    } catch (err: any) {
      return { type: 'error', message: err.message || 'An error occurred' };
    } finally {
     setUpdatingFavBooks(false);
    }
  };

  const fetchFavouriteBooks = async (): Promise<FavouriteBooksPropsWithId[]> => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user signed in');

    const favBooksRef = collection(db, "favBooks");
    const q = query(favBooksRef, where("userId", "==", user.uid));

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FavouriteBooksPropsWithId[];
  };

  const { data: favouriteBooks, isLoading, isError, error } = useQuery({
    queryKey: ['favouriteBooks'],
    queryFn: fetchFavouriteBooks,
    enabled: !!auth.currentUser,
  });

  return { addToFavourite, favouriteBooks, isLoading, updatingFavBooks, isError, error };
};

export default useFavouriteBooks;