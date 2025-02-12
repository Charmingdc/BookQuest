import { useNavigate } from 'react-router-dom';


const Sidebar = (currentPage: string) => {
  const navigate = useNavigate();
  const activeColor: string = 'rgb(64, 90, 255)';
  
  
  return (
   <nav>
    <ul>
     <li onClick={() => navigate('/home')}>
       <h2 style={{color: currentPage === 'home' ? activeColor : ''}}>
         Home
       </h2>
     </li>
     
     <li onClick={() => navigate('/favourites')}>
       <h2> Fav </h2>
     </li>
     
     <li onClick={() => navigate('/setting')}>
       <h2> Setting </h2>
     </li>
    </ul>
   </nav>
  )
}


export default Sidebar;