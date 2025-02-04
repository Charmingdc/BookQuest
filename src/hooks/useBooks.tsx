import { useState, useEffect } from "react";
import { Book } from "@types/book/types.tsx";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const normalizedData = (data: Book): Book => {
    return {
      key: data.key,
      title: data.title,
      author_name: data.author_name,
      first_publish_year: data.first_publish_year,
      subject: data.subject || [],
      cover_i: data.cover_i,
      ratings_average: data.ratings_average.toFixed(2),
      edition_count: data.edition_count,
      isbn: data.isbn || []
    };
  };
  

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=horror&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20"
        );
        if (!response.ok) throw new Error("Failed to load books");

        const data = await response.json();

        const normalizedBooks = data.docs.map((book: Book) => normalizedData(book));

        setBooks(normalizedBooks);
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