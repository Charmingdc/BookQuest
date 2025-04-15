import { useState, useEffect } from "react";
import useBooks from "@hooks/book/useBooks";
import { Book } from "@types/book/types";

import Tab from "./Tab.tsx";
import BookCard from "../helper/Book/BookCard";
import BookSkeletonLoader from "../helper/Book/BookSkeletonLoader";
import Spinner from "../helper/Spinner";
import ErrorBox from "../helper/ErrorBox";

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const [offset, setOffset] = useState<number>(0);
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: "All", index: 0 });
  const { books, genres, isError, isLoading } = useBooks(selectedGenre.name, offset);
  const [booksList, setBooksList] = useState<Book[]>([]);
  
  const [cachedGenres, setCachedGenres] = useState<string[]>([]);
  const tabGenres: string[] = cachedGenres;
  
  
  useEffect(() => {
   if (genres.length > 0 && cachedGenres.length === 0) {
    setCachedGenres(["All", ...genres]);
   }
  }, [genres, cachedGenres.length]);


  const handleScroll = () => {
   const isBottom: boolean = window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight;
   
   if (isBottom) setOffset(prev => prev + 20);
  }
  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
   
   return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  
  useEffect(() => {
   if (books.length > 0) 
    setBooksList(prev => [...prev, ...books]); 
  }, [books]);
  
  
  useEffect(() => {
   setBooksList([]); 
   setOffset(0); 
  }, [selectedGenre]);
  
  
  if (booksList.length === 0 && isLoading) {
    return (
      <section className="categories-section">
        <h2>Categories</h2>
        {[...Array(5)].map((_, i) => (
          <BookSkeletonLoader key={i} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="categories-section">
        <h2>Categories</h2>
        <ErrorBox type="internal-error" message="There was an error fetching the books. Please try again later." />
      </section>
    );
  }

  return (
    <section className="categories-section">
      <h2>Categories</h2>

      <div className="tabs flex-between">
        {tabGenres.map((genre, index) => (
          <Tab
            genre={genre}
            key={genre}
            onClick={() => setSelectedGenre({ name: genre, index })}
            isActive={selectedGenre.index === index}
          />
        ))}
      </div>

      <div className="booksWrapper flex-col-center">
        {booksList.length > 0 ? (
          booksList.map((book, i) => <BookCard bookDetails={book} key={i} />)
        ) : (
          <ErrorBox type="no-data" message="No books available for this genre" />
        )}
      </div>
      
      { ( booksList.length > 0 && isLoading) && (
        <div className="flex-center" style={{marginTop: '1.2rem'}}> 
          <Spinner />
        </div>
       ) } 
    </section>
  );
};

export default CategoriesBox;