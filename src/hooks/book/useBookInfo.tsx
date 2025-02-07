import { useState, useEffect, useRef } from 'react';
import { RawBook, WorkDetails, BookInfoProp } from '@types/book/types.tsx';



const useBookInfo = (identifier: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookInfo, setBookInfo] = useState<BookInfoProp | null>(null);
  const hasFetched = useRef(false);


  const normalizeInfo = (
    book: RawBook,
    workDetails: WorkDetails
  ): BookInfoProp => ({
    title: book.title || 'Unknown Title',
    url: `https://openlibrary.org${book.key}`,
    author_name: book.author_name?.[0] || 'Unknown Author',
    author_key: book.author_key?.[0] || '',
    key: book.key || '',
    cover: book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : '/illustrations/no-thumbnail.jpeg',
    excerpts: workDetails?.excerpts || [],
    links: workDetails?.links || [],
    number_of_pages: book.number_of_pages_median ?? 'N/A',
    publish_date: book.first_publish_year || 'Unknown',
    publishers: book.publisher || [],
    editions_count: book.edition_count || 0,
    ratings_average: book.ratings_average.toFixed(1) ?? 'N/A',
    description: typeof workDetails?.description === 'string'
    ? workDetails.description
    : workDetails?.description?.value || 'No description available',
    subjects: book.subject || [],
    first_sentence: workDetails?.first_sentence?.value || 'No first sentence available',
  });


  useEffect(() => {
    if (hasFetched.current || !identifier) return;

    const getBookDetails = async () => {
      setLoading(true);
      try {
        const searchUrl = `https://openlibrary.org/search.json?isbn=${identifier}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject`;

        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) throw new Error("Error fetching book info");

        const searchData = await searchResponse.json();
        const bookData: RawBook = searchData.docs?.[0];

        if (!bookData) throw new Error("Book not found");

        let workDetails: WorkDetails = {};
        if (bookData.key) {
          const workUrl = `https://openlibrary.org${bookData.key}.json`;

          const workResponse = await fetch(workUrl);
          if (workResponse.ok) workDetails = await workResponse.json();
        }

        setBookInfo(normalizeInfo(bookData, workDetails));
      } catch (err: any) {
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