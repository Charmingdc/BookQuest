import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

type SearchedTermProps = {
 searchedTerms: string[];
 setSearchValue: (value: string) => string;
 deleteSearchedTerm: (index: number) => void;
 clearAllHistory: () => void;
}


const SearchedTerms = ({ setSearchValue, searchedTerms, deleteSearchedTerm, clearAllHistory }: SearchedTermProps) => {
 const [showSearchedTerms, setShowSearchedTerms] = useState<boolean>(false);
 
 
 return (
  <div className={`searched-terms-box ${showSearchedTerms ? 'expanded' : ''}`}>
    <div className="show-searched-terms flex-between">
      <p>Recently searched terms</p>
      <span onClick={() => setShowSearchedTerms(!showSearchedTerms)}>
         <FaAngleDown size={24} />
      </span>
    </div>

    <ul className="searched-terms">
     {searchedTerms.length > 0 ? (
       searchedTerms.map((term, i) => (
        <li key={i}>
        <p 
         onClick={() => {
          setSearchValue(term)
          setShowSearchedTerms(false)}}> 
         { term } 
        </p>
        <button 
          className="remove-button flex-center"
          onClick={() => deleteSearchedTerm(i)}>
          <HiMiniXMark size={14} />
        </button>
        </li>
       ))
      ) : (
        <p> No search history </p>
      )}
    </ul>

    { searchedTerms.length > 0 ? (
     <button 
      onClick={() => clearAllHistory()}>
      Clear All
      <span className="flex-center">
       <HiMiniXMark size={14} />
      </span>
    </button>) : null }
  </div>
 )
}



export default SearchedTerms;