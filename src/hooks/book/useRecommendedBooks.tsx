import { useQuery } from "@tanstack/react-query";
import useGenres from "@hooks/book/useGenres";
import normalizedBookData from "@utils/helper/normalizedBookData.tsx";
import { Book } from "@types/book/types.tsx";

const fetchRecommendedBooks = async (genres: string[]): Promise<Book[]> => {
  const genreQuery = genres.map((genre) => encodeURIComponent(genre)).join("&");

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${genreQuery}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&sort=new&random&limit=50`
  );

  if (!response.ok) throw new Error("Failed to load books");

  const data = await response.json();
  return data.docs.map((book: Book) => normalizedBookData(book));
};

const useRecommendedBooks = () => {
  const { genres } = useGenres(4);
  
  const { data, isLoading, isError, error } = useQuery<Book[]>({
    queryKey: ["recommended-books"],
    queryFn: () => fetchRecommendedBooks(genres),
    staleTime: 6 * 60 * 1000,
    enabled: genres.length > 0,
  });

  return { recommendedBooks: data ?? [], isLoading, isError, error };
};

export default useRecommendedBooks;