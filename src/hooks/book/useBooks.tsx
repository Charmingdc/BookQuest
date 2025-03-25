import { useQuery } from "@tanstack/react-query";
import normalizedBookData from "@utils/helper/normalizedBookData.tsx";
import { Book } from "@types/book/types.tsx";

const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(
    "https://openlibrary.org/search.json?q=romance&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=10"
  );

  if (!response.ok) throw new Error("Failed to load books");

  const data = await response.json();
  return data.docs.map((book: Book) => normalizedBookData(book));
};

const useBooks = () => {
  const { data, isLoading, isError, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 6 * 60 * 1000,
  });

  return { books: data ?? [], isLoading, isError, error };
};

export default useBooks;