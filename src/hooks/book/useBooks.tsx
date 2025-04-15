import { useQuery } from "@tanstack/react-query";
import { randomGenres as generalKeywords } from "./useGenres";
import normalizedBookData from "@utils/helper/normalizedBookData";

const fetchBooks = async (keyword: string, booksOffset: number) => {
  const randomKeywords = [...generalKeywords]
    .sort(() => Math.random() - 0.5)
    .slice(0, 9);
  
   const query = keyword === "All" ? randomKeywords.map(encodeURIComponent).join("&") : encodeURIComponent(keyword);

  const response = await fetch(
   `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20&offset=${booksOffset}`
  );

  if (!response.ok) throw new Error("Failed to load books");

  const data = await response.json();
  return { books: data.docs.map((book) => normalizedBookData(book)), genres: randomKeywords };
};


const useBooks = (keyword: string, booksOffset: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books", keyword, booksOffset],
    queryFn: () => fetchBooks(keyword, booksOffset),
    staleTime: 6 * 60 * 1000,
  });

  return {
    books: data?.books ?? [],
    genres: data?.genres ?? [],
    isLoading,
    isError,
    error,
  };
};

export default useBooks;