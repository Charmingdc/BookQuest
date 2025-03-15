import { useQuery } from "@tanstack/react-query";
import useDebounce from "@hooks/helper/useDebounce.tsx";
import normalizedBookData from "@utils/helper/normalizedBookData.tsx";
import { Book } from "@types/book/types.tsx";

const fetchBooks = async (query: string): Promise<Book[]> => {
  if (!query.trim()) return [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20`
  );

  if (!response.ok) throw new Error("Failed to load books");

  const data = await response.json();
  if (!data.docs) throw new Error("Invalid data format");

  return data.docs.map((book) => normalizedBookData(book));
};


const useBookSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);

  const { data: books = [], isLoading: loading, isError, error } = useQuery<Book[]>({
    queryKey: ["books", debouncedQuery],
    queryFn: () => fetchBooks(debouncedQuery),
    staleTime: 6 * 60 * 1000,
    enabled: !!debouncedQuery.trim(),
  });

  return { loading, error: isError ? (error as Error).message : null, books };
};

export default useBookSearch;