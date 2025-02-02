import { useState, useEffect } from 'react';

import { Book } from '@types/book/types.tsx';
import useBooks from '@hooks/useBooks.tsx';
import useDefaultGenres from '@hooks/useDefaultGenres.tsx';

import Tab from './Tab.tsx';
import BookCard from './BookCard.tsx';

type SelectedGenre = {
  name: string;
  index: number;
};

const CategoriesBox = () => {
  const { genres } = useDefaultGenres();
  const { books, error, loading } = useBooks();
  
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({ name: 'All', index: 0 });
  const [bookLists, setBookLists] = useState<Book[]>([]);
  
  
  
  useEffect(() => {
    setBookLists(books);
  }, [books]);

  useEffect(() => {
   if (selectedGenre.name === 'All') {
    setBookLists(books);
    return;
   }
   
   
   const filteredBooks = books.filter(currentBook => currentBook.subject.includes(selectedGenre.name));
   
   setBookLists(filteredBooks);
  }, [selectedGenre])
  


  return (
    <section className="categories-section">
      <h2>Categories</h2>
      
      <div className="tabs flex-between">
        {genres.map((genre, index) => (
          <Tab 
            genre={genre} 
            key={genre} 
            onClick={() => setSelectedGenre({ name: genre, index: index })}
            isActive={selectedGenre.index === index} 
          />
        ))}
      </div>
      
      <div className="booksWrapper flex-col-center">
        {bookLists.length > 0 ? (
          bookLists.map((book, index) => (
            <BookCard 
              bookDetails={book} 
              key={index} 
            />
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>
    </section>
  );
};

export default CategoriesBox;