import { useState, useEffect, useRef } from "react";
import normalizedBookData from '@utils/helper/normalizedBookData.tsx'
import { Book } from "@types/book/types.tsx";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const hasFetched = useRef(false);

  

  useEffect(() => {
   if (hasFetched.current) return;
   
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=horror&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20"
        );
        if (!response.ok) throw new Error("Failed to load books");

        const data = await response.json();

        const normalizedBooks = data.docs.map((book: Book) => normalizedBookData(book));

        setBooks(normalizedBooks);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
    
    hasFetched.current = true;
  }, []);

  return { books, loading, error };
};

export default useBooks;