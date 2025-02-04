import { useNavigate } from 'react-router-dom';

const Footer = ({currentPage: string}) => {
  const navigate = useNavigate();
  
  return (
   <ul className='footer'>
     <li>
      <p> Home </p>
     </li>
      
     <li>
       <p> Favorites </p>
     </li>
      
     <li>
       <p> Profile </p>
     </li>
   </ul>
  )
}

export default Footer;