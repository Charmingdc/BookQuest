import { Link } from 'react-router-dom';
import './index.css';


const Landing = () => {
  return (
   <>
    <header>
      <nav>
       <ul>
         <li>
          <h3> BookQuest </h3>
         </li>
       
         <li>
          <Link to='/login'> Login </Link>
          <Link to='/signup'> Signup </Link>
         </li>
       </ul>
      </nav>
    </header>
    
    <main>
     <section>
      <img src='/illustrations/discover-book.png' alt='Discover books' />
      
      <h1> 
       Discover books 📚 effortlessly across different genres 🚀
       </h1>
     </section>
     
     <section>
       <div>
         <div className='feature-tag'>
           Discover
         </div>
         
         <p>
           Discover your next book tk read by browsing through a wide and dynamic range of books with feature to filter by genres
         </p>
       </div>
       
       <div>
         <div className='feature-tag'>
           Search
         </div>
         
         <p>
           Find books effortlessly with our powerful search feature, allowing you to quickly locate titles, authors, or genres that match your interests.
         </p>
       </div>
       
       <div>
         <div className='feature-tag'>
           Favourites
         </div>
         
         <p>
           Save your favorite books to your personal collection for easy access and revisit them anytime you want.
         </p>
       </div>
       
       <div>
         <div className='feature-tag'>
           Privacy
         </div>
         
         <p>
           Your reading experience is secure with us. We prioritize your privacy, ensuring your data and personal preferences remain protected.
         </p>
       </div>
     </section>
    </main>
    
    
    <footer>
     <section>
      <p>
       Every book is a new world 🌍—keep exploring 📖, keep growing 🚀.
      </p>
     </section>
    </footer>
   </>
  )
}


export default Landing;