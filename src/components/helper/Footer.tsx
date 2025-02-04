import { useNavigate } from 'react-router-dom';

import { TbSmartHome } from "react-icons/tb";
import { BsHeart } from "react-icons/bs";
import { LuSettings, LuHeart } from "react-icons/lu"


const Footer = ({currentPage}: string) => {
  const navigate = useNavigate();
  
  return (
   <ul className='footer'>
     <li>
       <TbSmartHome size={29} color={currentPage === 'home' ? 'red' : 'green'} />
       <p> Home </p>
     </li>
      
     <li>
       <LuHeart size={25} color={currentPage === 'favourite' ? 'red' : ''} />
       <p> Favourites </p>
     </li>
      
     <li>
       <LuSettings size={25} color={currentPage === 'setting' ? 'red' : ''} />
       <p> Settings </p>
     </li>
   </ul>
  )
}

export default Footer;