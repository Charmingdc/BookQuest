import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { auth } from "@fb/config.ts";


const HomeTopBar = () => {
  const [username, setUsername] = useState<string>('');
  const navigate = useNavigate();
  
  useEffect(() => {
   const user = auth.currentUser;
   if (!user) navigate('/login');
   
   setUsername(user.displayName.slice(0, 2));
  }, [])
  
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
        
        <div className='flex-center' onClick={() => navigate('/setting')}>
         <h3> { username } </h3>
        </div>
       </li>
     </ul>
    </nav>
  )
}


export default HomeTopBar;