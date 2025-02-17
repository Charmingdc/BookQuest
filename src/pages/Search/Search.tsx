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
        <div className='search-bar flex-between'>
        
         <span 
           className='flex-center'
           onClick={() => navigate(-1)}>
           <FaAngleLeft size={34} />
         </span>
         
         
         <div className='search-box'>
           <input
             type='text'
             placeholder='Search for any book...'
             value={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}/>
           
           <span 
             onClick={() => navigate(-1)}>
             <LuSearch size={28} />
           </span>
         </div>
         
        </div>
      </nav>
     </header>
   
     <main>
      <section className='searched-terms-box'>
        <p> Recently searched terms </p>
        
        <div className='searched-terms'>
          <p> Lean Startup </p>
          <p> Millionaire Fastlane </p>
          <p> Deep Work </p>
          <p> Subtle art of not giving a fuck </p>
        </div>
        
        <button>
          clear all
        </button>
      </section>
     </main>
   </>
  )
}


export default Search;