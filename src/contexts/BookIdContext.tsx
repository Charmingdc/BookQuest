import { createContext, useState, useContext, ReactNode } from 'react';


interface BookIdContextType {
  bookId: string;
  updateBookId: (id: string) => void;
}

const defaultContext: BookIdContextType = {
  bookId: '',
  updateBookId: () => {
    throw new Error('updateBookId function must be overridden inside a Provider');
  },
};


export const BookIdContext = createContext<BookIdContextType>(defaultContext);

interface BookIdProviderProps {
  children: ReactNode;
}


export const BookIdProvider = ({ children }: BookIdProviderProps) => {
  const [bookId, setBookId] = useState<string>('');

  const updateBookId = (id: string) => {
    if (!id) throw new Error('No id passed');
    setBookId(id);
  };

  return (
    <BookIdContext.Provider value={{ bookId, updateBookId }}>
      {children}
    </BookIdContext.Provider>
  );
};

export const useBookId = () => useContext(BookIdContext);