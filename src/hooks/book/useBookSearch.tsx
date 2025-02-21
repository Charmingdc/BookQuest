import { useState, useEffect } from "react";
import useDebounce from "@hooks/helper/useDebounce.tsx";
import normalizedBookData from "@utils/helper/normalizedBookData.tsx";
import { Book } from "@types/book/types.tsx";

const useBookSearch = (query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!debouncedQuery.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedQuery)}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20`
        );

        if (!response.ok) throw new Error("Failed to load books");

        const data = await response.json();

        if (data.docs) {
          const normalizedBooks = data.docs.map((book) => normalizedBookData(book));
          setBooks(normalizedBooks);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [debouncedQuery]);

  return { loading, error, books };
};

export default useBookSearch;