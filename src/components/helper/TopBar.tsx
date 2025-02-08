import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa6";


const TopBar = ({ pageTitle }: string) => {
  const navigate = useNavigate();
  
  return (
   <nav>
    <ul className='top-bar flex-between'>
      <li onClick={() => navigate(-1)}>
       <FaAngleLeft size={30} />
      </li>
      
      <li>
        <h2> { pageTitle } </h2>
      </li>
      
      <li> {/** left empty on purpose **/}
      </li>
    </ul>
   </nav>
  )
}


export default TopBar;