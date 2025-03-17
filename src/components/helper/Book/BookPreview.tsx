import { IoBookOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";

import { BookInfoProp } from '@types/book/types.tsx';
import convertToStar from '@utils/helper/convertToStar.tsx';


import '@pages/BookPreview/index.css';

const BookPreview = ({bookInfo}: BookInfoProp) => {
  return (
    <section className='book-info-section flex-col-center'>
      <div className='book-main-info'>
        <div className='book-info-img-wrapper flex-center'>
          <img src={bookInfo.cover} alt={bookInfo.title} />
        </div>
          
        
        <div className='book-meta-data'>  
         <div className='action-tab'>
           <a href={`${bookInfo.url}`} className='flex-center'>
             Read Book 
             <span>
              <IoBookOutline /> 
             </span>
           </a>
            
           <button className='flex-center'>
             Add to Favourites
             <span>
              <LuHeart /> 
             </span>
           </button>
         </div>
        
   
         <h2 className='book-name'>
           { bookInfo.title } 
         </h2>
            
         <p className='star-rating'>
           { convertToStar(bookInfo.ratings_average) }
             
          <span>
           { bookInfo.ratings_average }
          </span>
         </p>
            
         <p className='author-name'> 
           {bookInfo.author_name}
         </p>
       </div>
      </div>
         
          
      <div className='quick-info flex-between'>
        <div>
        <strong> Published </strong>
         <p>
          { bookInfo.publish_date }
         </p>
        </div>
             
        <div>
         <strong> Pages </strong>
         <p>
          { bookInfo.number_of_pages }
         </p>
        </div>
             
        <div>
         <strong> Editions </strong>
          <p>
            { bookInfo.editions_count }
          </p>
        </div>
      </div>
            
      <div className='book-about flex-col-center'>
       <h3> Description </h3>
       <p>{ bookInfo.description }</p>
      </div>
    </section>
  )
}

export default BookPreview;