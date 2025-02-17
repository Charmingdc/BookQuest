import { useNavigate } from 'react-router-dom';
import { TbSmartHome } from "react-icons/tb";
import { LuSettings, LuHeart } from "react-icons/lu";


const Footer = ({currentPage}: string) => {
  const navigate = useNavigate();
  const activeColor: string = 'rgb(64, 90, 255)';
  
  return (
   <ul className='footer'>
     <li onClick={() => navigate('/home')}>
       <TbSmartHome size={29} 
         color={currentPage === 'home' ? activeColor : 'green'} />
       <p 
         style={{color: currentPage === 'home' ? activeColor : ''}}>
         Home 
       </p>
     </li>
      
     <li onClick={() => navigate('/favourites')}>
       <LuHeart size={25} color={currentPage === 'favourites' ? activeColor : ''} />
       <p 
         style={{color: currentPage === 'favourites' ? activeColor : ''}}>
         Favourites
       </p>
     </li>
      
     <li onClick={() => navigate('/setting')}>
       <LuSettings size={25} color={currentPage === 'setting' ? 'red' : ''} />
       <p 
         style={{color: currentPage === 'setting' ? activeColor : ''}}>
         Setting
       </p>
     </li>
   </ul>
  )
}

export default Footer;