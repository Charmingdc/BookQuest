import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useDebounce from '@hooks/helper/useDebounce.tsx';
import normalizedBookData from "@utils/helper/normalizedBookData.tsx";
import { Book } from "@types/book/types.tsx";

// import BookCard from '@components/helper/Book/BookCard.tsx';

import { FaAngleLeft, FaAngleDown } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";

import './index.css';

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>('');
  const [showSearchedTerms, setShowSearchedTerms] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
   const fetchBooks = async () => {
     if (!debouncedSearchValue.trim()) return;

     try {
       console.log('Searching for:', debouncedSearchValue);

       const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedSearchValue)}&fields=key,title,author_name,first_publish_year,cover_i,ratings_average,edition_count,author_key,subject,isbn&limit=20`
      );

       if (!response.ok) throw new Error("Failed to load books");

       const data = await response.json();
       
       if (data.docs && Array.isArray(data.docs)) {
         const normalizedBooks = data.docs.map((book) => normalizedBookData(book));
         setBooks(normalizedBooks);
       } else {
         console.error('Invalid data format:', data);
       }
     } catch (err: any) {
       console.error('Error searching book:', err.message);
     }
   };

   fetchBooks();
  }, [debouncedSearchValue])

  useEffect(() => {
    console.log('Current books:', books);
  }, [books]);

  return (
    <>
      <header>
        <nav>
          <div className='search-bar flex-between'>
            <span className='flex-center' onClick={() => navigate(-1)}>
              <FaAngleLeft size={34} />
            </span>

            <div className='search-box'>
              <input
                type='text'
                placeholder='Search for any book...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} />

              <span onClick={() => navigate(-1)}>
                <LuSearch size={28} />
              </span>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className='searched-terms-box' style={{ height: showSearchedTerms ? '9.8rem' : '2.4rem' }}>
          <div className='show-searched-terms flex-between'>
            <p>
             Recently searched terms
            </p>
            <span onClick={() => setShowSearchedTerms(!showSearchedTerms)}>
              <FaAngleDown size={24} />
            </span>
          </div>

          <ul className='searched-terms'>
            <li>
              <p> Lean Startup </p>
              <button className='remove-button flex-center'>
                <HiMiniXMark size={14} />
              </button>
            </li>
            <li>
              <p> Deep Work </p>
              <button className='remove-button flex-center'>
                <HiMiniXMark size={14} />
              </button>
            </li>
            <li>
              <p> The Subtle Art of Not Giving a F*ck </p>
              <button className='remove-button flex-center'>
                <HiMiniXMark size={14} />
              </button>
            </li>
          </ul>

          <button>
            Clear All
            <span className='flex-center'>
              <HiMiniXMark size={14} />
            </span>
          </button>
        </section>
      </main>
    </>
  );
};

export default Search;