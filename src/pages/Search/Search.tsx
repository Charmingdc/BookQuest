import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useBookSearch from "@hooks/book/useBookSearch";
import useSearchHistory from "@hooks/book/useSearchHistory";

import BookCard from "@components/helper/Book/BookCard.tsx";
import BookSkeletonLoader from "@components/helper/Book/BookSkeletonLoader.tsx";
import SearchedTerms from "@components/search/SearchedTerms.tsx";
import SideBar from '@components/helper/Navigation/SideBar.tsx';

import { FaAngleLeft } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import "./index.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const prevSearchValueRef = useRef<string>("");
  
  const { searchedTerms, saveSearchedTerm, deleteSearchedTerm, clearAllHistory } = useSearchHistory();
  const { loading, error, books } = useBookSearch(searchValue);
  

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
         {loading ? (
          [...Array(10)].map((_, i) =>   <BookSkeletonLoader key={i} />)
          ) : error ? (
           <div className="error-box">
             <img src="/illustrations/internal-server-error.png" alt="Error Fetching books" /> 
             <h4>There was an error fetching the books. Please try again later.</h4> 
           </div> 
          ) : books.length > 0 ? (
           books.map((book, i) => <BookCard bookDetails={book} key={i} />)
          ) : (
           searchValue && ( 
            <div className="error-box"> <img src="/illustrations/no-data-pana.png" alt="No Books Found" />
            
             <h4>No books match your search. Try a different term.</h4> 
            </div>) 
          )}
        </div>
       </section> 
      </main>
    </>
  );
};

export default Search;