import { useState } from 'react';

import { FaAngleDown } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";

const SearchedTerms = () => {
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
     <li>
      <p>Lean Startup</p>
        <button className="remove-button flex-center">
          <HiMiniXMark size={14} />
        </button>
     </li>
     <li>
       <p>Deep Work by Carl Newport </p>
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
  </div>
 )
}



export default SearchedTerms;