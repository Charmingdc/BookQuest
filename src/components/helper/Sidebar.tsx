import { useNavigate } from 'react-router-dom';

import { TbSmartHome } from "react-icons/tb";
import { LuSettings, LuHeart } from "react-icons/lu";



const Sidebar = ({currentPage}: string) => {
  const navigate = useNavigate();
  const activeColor: string = 'rgb(64, 90, 255)';
  
  
  return (
   <nav>
    <ul className='side-bar'>
     <li onClick={() => navigate('/home')}>
       <TbSmartHome size={34} 
         color={currentPage === 'home' ? activeColor : 'green'} />
     </li>
     
     <li onClick={() => navigate('/favourites')}>
       <LuHeart size={30} color={currentPage === 'favourites' ? activeColor : ''} />
     </li>
     
     <li onClick={() => navigate('/setting')}>
       <LuSettings size={30} color={currentPage === 'setting' ? 'red' : ''} />
     </li>
    </ul>
   </nav>
  )
}


export default Sidebar;