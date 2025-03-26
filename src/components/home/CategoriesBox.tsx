import { useState } from "react";
import useBooks from "@hooks/book/useBooks"

import Tab from "./Tab.tsx";
import BookCard from "../helper/Book/BookCard.tsx";
import BookSkeletonLoader from "../helper/Book/BookSkeletonLoader.tsx";
import ErrorBox from "../helper/ErrorBox";

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: "All", index: 0 });
  const [offset, setOffset] = useState<number>(0);
  
  const { books, genres, isError, isLoading } = useBooks(selectedGenre.name, offset);
  console.log(books)
  const tabGenres: string[] = ['All', ...genres];

  if (isLoading) {
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
        <ErrorBox 
          type="internal-error"
          message="There was an error fetching the books. Please try again later." />
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
        {books.length > 0 ? (
          books.map((book) => <BookCard bookDetails={book} key={book.key} />)
        ) : (
          <ErrorBox type="no-data" message="No books available for this genre" />
        )}
      </div>
    </section>
  );
};

export default CategoriesBox;