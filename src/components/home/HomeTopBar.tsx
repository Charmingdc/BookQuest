import { HiMenuAlt1 } from "react-icons/hi"
import { LuSearch } from "react-icons/lu";

import './index.css'

const HomeTopBar = () => {
  return (
    <nav>
     <ul className='flex-between home-topbar'>
       <li className='flex-center'>
        <HiMenuAlt1 
          className='home-topbar-icon'
          style={{width: '2.8rem', height: '2.8rem'}}/>
       </li>
       
       <li className='flex-center'>
        <LuSearch className='home-topbar-icon' />
        
        <div className='flex-center'>
          <img src='/illustrations/default-dp.webp' alt='User avatar' />
        </div>
       </li>
     </ul>
    </nav>
  )
}


export default HomeTopBar;