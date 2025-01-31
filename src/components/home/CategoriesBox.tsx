import { useState } from 'react'

import useBooks from '@hooks/useBooks.tsx';
import useDefaultGenres from '@hooks/useDefaultGenres.tsx';

import Tab from './Tab.tsx';
import BookCard from './BookCard.tsx';

type SelectedGenre = {
  name: string;
  index: number;
}


const CategoriesBox = () => {
  const { genres } = useDefaultGenres();
  const { books } = useBooks();
  
  const [selectedGenre, setSelectedGenre] = useState<SelectedGenre>({name: 'All', index: 0});
 
  
  return (
   <section className='categories-section'>
    <h2> Categories </h2>
    
    
    <div className='tabs flex-between'>
     {genres.map((genre, index) => (
       <Tab 
         genre={genre} 
         key={genre}
         onClick={() => setSelectedGenre({name: genre, index: index})} 
         isActive={selectedGenre.index == index} />
      ))}
    </div>
    
    
    <div className='booksWrapper flex-col-center'>
      {books.map((book, index) => (
        <BookCard 
          bookDetails={book}
          key={book.key} />
      ))}
    </div>
   </section>
  )
}

export default CategoriesBox;