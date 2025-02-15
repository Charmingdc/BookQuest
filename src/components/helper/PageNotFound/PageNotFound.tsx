import { useNavigate } from 'react-router-dom';
import './index.css';


const PageNotFound = () => {
  const navigate = useNavigate();
  
  return (
   <section className='page-not-found'>
     <h1> Oops.. </h1>
     
     <p>
      Page not found, we coudn't find the page you are trying to access
     </p>
     
     <button onClick={() => navigate(-1)}>
       Go back :)
     </button>
   </section>
  )
}


export default PageNotFound;