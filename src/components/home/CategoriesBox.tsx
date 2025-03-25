import { useState, useEffect } from "react"
import { Book } from "@types/book/types"
import useBooks from "@hooks/book/useBooks"
import useGenres from "@hooks/book/useGenres";

import Tab from "./Tab.tsx";
import BookCard from "../helper/Book/BookCard.tsx";
import BookSkeletonLoader from "../helper/Book/BookSkeletonLoader.tsx";
import ErrorBox from "../helper/ErrorBox";

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const { genres } = useGenres(8);
  const { books, isError, isLoading } = useBooks();
  
  const [bookLists, setBookLists] = useState<Book[]>(books);
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: "All", index: 0 });
 
  const tabGenres: string[] = ['All', ...genres];
  
  useEffect(() => {
    if (selectedGenre.name === "All") {
      setBookLists(books);
    } else {
      const filteredBooks = books.filter((currentBook) =>
        currentBook.subject?.includes(selectedGenre.name)
      );
      setBookLists(filteredBooks);
    }
  }, [selectedGenre, books]);

  
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
         type='internal-error'
         message='There was an error fetching the books. Please try again later.' />
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
        {bookLists.length > 0 ? (
          bookLists.map((book, index) => <BookCard bookDetails={book} key={index} />)
        ) : (
         <ErrorBox
          type='no-data'
          message='No books available for this genre' />
        )}
      </div>
    </section>
  );
};

export default CategoriesBox;