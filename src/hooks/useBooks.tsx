import { useState, useEffect } from "react"
import { Book } from '@types/book/types.tsx'

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/mockData.json");
        if (!response.ok) throw new Error("Failed to load books");
        
        const data = await response.json();
        
        setBooks(data.docs);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useBooks;