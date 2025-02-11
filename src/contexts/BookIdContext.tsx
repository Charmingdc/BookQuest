import React, { createContext, useState, useEffect, useContext } from 'react';


export const BookIdContext = createContext();

export const BookIdProvider = ({ children }) => {
  const [bookId, setBookId] = useState<string>(''); 
  

  const updateBookId = (id: string) => {
   if (!id) throw new Error('No id passed');
   setBookId(id);
  }

  return (
    <BookIdContext.Provider value={{ bookId, updateBookId }}>
      {children}
    </BookIdContext.Provider>
  );
};

export const useBookId = () => useContext(BookIdContext);