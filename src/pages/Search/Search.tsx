import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useBookSearch from "@hooks/book/useBookSearch.tsx";

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

  const { loading, error, books } = useBookSearch(searchValue);


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
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <span onClick={() => navigate(-1)}>
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
        <SearchedTerms />
        
        <div className="search-result">
         <h1> Hwllow world </h1>
        </div>
        </section> 
      </main>
    </>
  );
};

export default Search;