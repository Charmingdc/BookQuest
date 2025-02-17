import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaAngleLeft } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";

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
        
        <ul className='searched-terms'>
          <li> 
            <p>
              Lean Startup 
            </p>
            
            <button className='remove-button flex-center'>
              <HiMiniXMark size={14} />
            </button>
          </li>
          <li> 
            <p>
              Deep work
            </p>
            
            <button className='remove-button flex-center'>
              <HiMiniXMark size={14} />
            </button>
          </li>
          <li> 
            <p>
             The subtle art of not giving a fuck
            </p>
            
            <button className='remove-button flex-center'>
              <HiMiniXMark size={14} />
            </button>
          </li>
        </ul>
        
        <button>
          clear all
          <span className='flex-center'>
           <HiMiniXMark size={14} />
          </span>
        </button>
      </section>
     </main>
   </>
  )
}


export default Search;