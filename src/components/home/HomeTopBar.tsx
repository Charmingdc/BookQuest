import { useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";


const HomeTopBar = () => {
  const navigate = useNavigate();
  
  return (
    <nav>
     <ul className='flex-between home-topbar'>
       <li className='flex-center'>
        <h2> BookQuest </h2>
       </li>
       
       <li className='flex-center'>
        <LuSearch 
         className='home-topbar-icon' 
         onClick={() => navigate('/search')}/>
        
        <div className='flex-center'>
          <img src='/illustrations/default-dp.webp' alt='User avatar' />
        </div>
       </li>
     </ul>
    </nav>
  )
}


export default HomeTopBar;