import { useState, useEffect, useRef } from 'react';
import { Book } from '@types/book/types.tsx';

const useBookInfo = (identifier: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookInfo, setBookInfo] = useState<Book | null>(null);
  const hasFetched = useRef(false);


  useEffect(() => {
    if (hasFetched.current || !identifier) return;

    const getBookDetails = async () => {
      try {
        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${identifier}&format=json&jscmd=data`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('Error fetching book info');

        const data = await response.json();
        setBookInfo(data[`ISBN:${identifier}`] || null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
    hasFetched.current = true;
  }, [identifier]);

  useEffect(() => {
    hasFetched.current = false;
  }, [identifier]);

  return { bookInfo, loading, error };
};

export default useBookInfo;