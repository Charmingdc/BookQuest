import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useBookSearch from "@hooks/book/useBookSearch.tsx";

import BookCard from "@components/helper/Book/BookCard.tsx";
import BookSkeletonLoader from "@components/helper/Book/BookSkeletonLoader.tsx";

import { FaAngleLeft, FaAngleDown } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";

import "./index.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchedTerms, setShowSearchedTerms] = useState<boolean>(false);

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
        <section className="searched-terms-box" style={{ height: showSearchedTerms ? "9.8rem" : "2.4rem" }}>
          <div className="show-searched-terms flex-between">
            <p>Recently searched terms</p>
            <span onClick={() => setShowSearchedTerms(!showSearchedTerms)}>
              <FaAngleDown size={24} />
            </span>
          </div>

          <ul className="searched-terms">
            <li>
              <p>Lean Startup</p>
              <button className="remove-button flex-center">
                <HiMiniXMark size={14} />
              </button>
            </li>
            <li>
              <p>Deep Work</p>
              <button className="remove-button flex-center">
                <HiMiniXMark size={14} />
              </button>
            </li>
            <li>
              <p>The Subtle Art of Not Giving a F*ck</p>
              <button className="remove-button flex-center">
                <HiMiniXMark size={14} />
              </button>
            </li>
          </ul>

          <button>
            Clear All
            <span className="flex-center">
              <HiMiniXMark size={14} />
            </span>
          </button>
        </section>

        <section>
          {loading ? (
            [...Array(10)].map((_, i) => <BookSkeletonLoader key={i} />)
          ) : error ? (
            <div className="error-box">
              <img src="/illustrations/internal-server-error.png" alt="Error Fetching books" />
              <h4>There was an error fetching the books. Please try again later.</h4>
            </div>
          ) : books.length > 0 ? (
            books.map((book, i) => <BookCard bookDetails={book} key={i} />)
          ) : (
            searchValue && (
              <div className="error-box">
                <img src="/illustrations/no-data-pana.png" alt="No Books Found" />
                <h4>No books match your search. Try a different term.</h4>
              </div>
            )
          )}
        </section>
      </main>
    </>
  );
};

export default Search;