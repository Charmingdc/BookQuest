import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useBookSearch from "@hooks/book/useBookSearch";
import useSearchHistory from "@hooks/book/useSearchHistory";
import { Book } from "@types/book/types";

import ErrorBox from "@components/helper/ErrorBox";
import BookCard from "@components/helper/Book/BookCard";
import BookSkeletonLoader from "@components/helper/Book/BookSkeletonLoader";
import Spinner from "@components/helper/Spinner";
import SearchedTerms from "@components/search/SearchedTerms";
import SideBar from '@components/helper/Navigation/SideBar';

import { FaAngleLeft } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import "./index.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const prevSearchValueRef = useRef<string>("");
  
  const { searchedTerms, saveSearchedTerm, deleteSearchedTerm, clearAllHistory } = useSearchHistory();
  const { loading, error, books } = useBookSearch(searchValue, offset);
  

  const handleInputChange = (query: string) => {
   setSearchValue(query);
   saveSearchedTerm(query);
  }
  
  const handleSearch = () => {
   if (searchValue) {
    prevSearchValueRef.current = searchValue;
    
    saveSearchedTerm(prevSearchValueRef.current);
    setSearchValue('');
   } else {
    setSearchValue(prevSearchValueRef.current);
   }
  };
  
  const handleScroll = () => {
   const isBottom: boolean = window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight;
   
   if (isBottom)
    setOffset(prev => prev + 20);
  }
  
  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
   
   return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
   if (books.length > 0) 
    setBooksList(prev => [...prev, ...books]); 
  }, [books]);
  
  useEffect(() => {
   setBooksList([]);
  }, [searchValue]);
  
  
  return (
    <>
     <header>
       <nav>
        <div className="search-bar flex-between">
          <span className="flex-center" onClick={() => navigate(-1)}>
            <FaAngleLeft size={34} />
          </span>

          <div className="search-box">
           <input
             type="text"
             placeholder="Search for any book..."
             value={searchValue}
             onChange={(e) => handleInputChange(e.target.value)}
           />
           <span onClick={handleSearch}>
             <LuSearch size={28} />
           </span>
          </div>
            
         </div>
       </nav>
      </header>

      <main>
       <aside aria-label="Sidebar">
        <SideBar currentPage='home' />
       </aside>

       <section>
        <SearchedTerms 
          setSearchValue={setSearchValue}
          searchedTerms={searchedTerms} 
          deleteSearchedTerm={deleteSearchedTerm}
          clearAllHistory={clearAllHistory} />
        
        
        <div className="search-result">
         {(booksList.length === 0 && loading) ? (
          [...Array(10)].map((_, i) =>   <BookSkeletonLoader key={i} />)
          ) : error ? (
           <ErrorBox
            type='internal-error'
            message='There was an error fetching the books. Please try again later.' />
          ) : booksList.length > 0 ? (
           booksList.map((book, i) => <BookCard bookDetails={book} key={i} />)
          ) : (
           searchValue && (
            <ErrorBox
             type='no-data'
             message='No books match your search. Try a different term.' />) 
          )}
        </div>
        
        {(booksList.length > 0 && loading) && (
          <div className="flex-center" style={{marginBottom: '3rem'}}> <Spinner />
          </div>
        )} 
       </section> 
      </main>
    </>
  );
};

export default Search;