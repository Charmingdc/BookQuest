import { useState, useEffect } from "react";
import useIsBottom from "@hooks/helper/useIsBottom";
import useBooks from "@hooks/book/useBooks";
import { Book } from "@types/book/types";

import Tab from "./Tab.tsx";
import BookCard from "../helper/Book/BookCard.tsx";
import BookSkeletonLoader from "../helper/Book/BookSkeletonLoader.tsx";
import ErrorBox from "../helper/ErrorBox";

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const isBottom = useIsBottom();
  
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: "All", index: 0 });
  const [offset, setOffset] = useState<number>(0);
  const { books, genres, isError, isLoading } = useBooks(selectedGenre.name, offset);
  
  const [booksList, setBooksList] = useState<Book[]>([]);
  const tabGenres: string[] = ["All", ...genres];


  useEffect(() => {
   setBooksList(prev => [...prev, ...books]); 
  }, [books, offset]);

  useEffect(() => {
   if (isBottom) setOffset(prev => prev + 20);
  }, [isBottom]);


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
          booksList.map((book) => <BookCard bookDetails={book} key={book.key} />)
        ) : (
          <ErrorBox type="no-data" message="No books available for this genre" />
        )}
      </div>
      
      { ( booksList.length > 0 && isLoading) && (
        <p> Getting more books... </p>
       ) } 
    </section>
  );
};

export default CategoriesBox;