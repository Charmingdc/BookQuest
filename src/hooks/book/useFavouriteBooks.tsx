import { useState } from "react";
import { auth, db } from "@fb/config.ts";
import { collection, serverTimestamp, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FavouriteBooksProps } from "@tp/book/types";
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
      
     // queryClient.invalidateQueries(['favouriteBooks']);
      queryClient.invalidateQueries({ queryKey: ['favouriteBooks'] });
      
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
  
  
  const removeFromFavourites = async (bookId: string) => {
    setUpdatingFavBooks(true);

   try {
     const docRef = doc(collection(db, 'favBooks'), bookId);
     await deleteDoc(docRef);
     
     // queryClient.invalidateQueries(['favouriteBooks']);
     queryClient.invalidateQueries({ queryKey: ['favouriteBooks'] });
     
     return { type: 'success', message: 'Book removed from favourites.' };
   } catch (err: any) {
     return { type: 'error', message: err.message || 'An error occurred' };
   } finally {
     setUpdatingFavBooks(false);
   }
  };


  const { data: favouriteBooks, isLoading, isError, error } = useQuery({
    queryKey: ['favouriteBooks'],
    queryFn: fetchFavouriteBooks,
    enabled: !!auth.currentUser,
  });

  return { addToFavourite, favouriteBooks, removeFromFavourites, isLoading, updatingFavBooks, isError, error };
};

export default useFavouriteBooks;