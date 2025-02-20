import { useState, useEffect } from "react";

import { Book } from "@types/book/types.tsx";
import useBooks from "@hooks/book/useBooks.tsx";
import useDefaultGenres from "@hooks/book/useDefaultGenres.tsx";

import Tab from "./Tab.tsx";
import BookCard from "../helper/Book/BookCard.tsx";
import BookSkeletonLoader from "../helper/Book/BookSkeletonLoader.tsx";

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const { genres } = useDefaultGenres();
  const { books, isError, isLoading } = useBooks();

  
  const [bookLists, setBookLists] = useState<Book[]>(books);
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: "All", index: 0 });

 
  useEffect(() => {
    if (selectedGenre.name === "All") {
      setBookLists(books);
    } else {
      const filteredBooks = books.filter((currentBook) =>
        currentBook.subject?.includes(selectedGenre.name)
      );
      setBookLists(filteredBooks);
    }
  }, [selectedGenre]);

  
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
        <div className="error-box">
          <img src="/illustrations/internal-server-error.png" alt="Error Fetching books" />
          <h4>There was an error fetching the books. Please try again later.</h4>
        </div>
      </section>
    );
  }

  return (
    <section className="categories-section">
      <h2>Categories</h2>

      <div className="tabs flex-between">
        {genres.map((genre, index) => (
          <Tab
            genre={genre}
            key={genre}
            onClick={() => setSelectedGenre({ name: genre, index })}
            isActive={selectedGenre.index === index}
          />
        ))}
      </div>

      <div className="booksWrapper flex-col-center">
        {bookLists.length > 0 ? (
          bookLists.map((book, index) => <BookCard bookDetails={book} key={index} />)
        ) : (
          <div className="error-box">
            <img src="/illustrations/no-data-pana.png" alt="No Books Found" />
            <h4>No books available for this genre</h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesBox;