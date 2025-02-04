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
    return; // return immediately if selected genre is all
   }
   
   const filteredBooks = books.filter(currentBook => currentBook.subject.includes(selectedGenre.name)); // check if book subject includes selected genre
   
   setBookLists(filteredBooks); // update book lists
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
            isActive={selectedGenre.index === index} />
        ))}
      </div>
      
      { error ? (
        <div className='error-box'>
          <img 
            src='/illustrations/internal-server-error.png'
           alt='Error Fetching books' />
          <h4> Error fetching books </h4>
        </div>
      ) : 
      <div className="booksWrapper flex-col-center">
        {bookLists.length > 0 ? (
          bookLists.map((book, index) => (
            <BookCard 
              bookDetails={book} 
              key={index} 
            />
          ))
        ) : (
          <div className='error-box'>
            <img 
              src='/illustrations/no-data-pana.png' 
              alt='No Books Found' />
            <h4> No books available </h4>
          </div>
        )}
      </div>
      }
    </section>
  );
};

export default CategoriesBox;