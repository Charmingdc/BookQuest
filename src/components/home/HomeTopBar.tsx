import { LuSearch } from "react-icons/lu";

const HomeTopBar = () => {
  return (
    <nav>
     <ul className='flex-between home-topbar'>
       <li className='flex-center'>
        <h2> BookQuest </h2>
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