import { useState, useEffect, useRef } from 'react';
import { BookInfoProp } from '@types/book/types.tsx';



const useBookInfo = (identifier: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookInfo, setBookInfo] = useState<BookInfoProp | null>(null);
  const hasFetched = useRef(false);


  
 
  const normalizeInfo = (book: BookInfoProp, coverUrl: string): BookInfoProp => ({
    title: book.title,
    url: book.url || '',
    author_name: book.authors?.[0]?.name || 'Unknown Author',
    author_key: book.authors?.[0]?.url?.split('/').at(-2) || '',
    key: book.key || '',
    cover: book?.cover?.large || 'https://via.placeholder.com/150',
    excerpts: book.excerpts || [],
    links: book.links || [],
    number_of_pages: book.number_of_pages || 'N/A',
    pagination: book.pagination || 'N/A',
    publish_date: book.publish_date || 'Unknown',
    publishers: book.publishers || [],
    weight: book.weight || 'Unknown',
  });


  useEffect(() => {
    if (hasFetched.current || !identifier) return;

    const getBookDetails = async () => {
      setLoading(true);
      try {
        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${identifier}&format=json&jscmd=data`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching book info");

        const data = await response.json();
        const bookData = data[`ISBN:${identifier}`];

        if (!bookData) throw new Error("Book not found");

        setBookInfo(normalizeInfo(bookData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBookDetails();
    hasFetched.current = true;
  }, [identifier]);

  return { bookInfo, loading, error };
};

export default useBookInfo;