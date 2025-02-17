import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaAngleLeft } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu"

import './index.css';


const Search = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  
  return (
   <>
     <header>
      <nav>
        <div className='search-bar'>
        
         <span 
           onClick={() => navigate(-1)}>
           <FaAngleLeft />
         </span>
         
         
         <div className='searc-box'>
           <input
             type='text'
             placeholder='Search for any book...'
             value={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}/>
           
           <span 
             onClick={() => navigate(-1)}>
             <LuSearch />
           </span>
         </div>
         
        </div>
      </nav>
     </header>
   
     <main>
       <h1> Hello </h1>
     </main>
   </>
  )
}


export default Search;