import { useNavigate, useLocation } from 'react-router-dom';
import { Book } from '@types/book/types.tsx';
import { useBookId } from '@contexts/BookIdContext.tsx';
import convertToStar from '@utils/helper/convertToStar.tsx';
import getCoverUrl from '@utils/helper/getCoverUrl.tsx';


import '@pages/Home/index.css';

const BookCard = ({bookDetails}: Book) => {
  const { updateBookId } = useBookId();
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const openPreview = (clickedBook: Book) => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 726 && location.pathname === '/home') {
     updateBookId(clickedBook.isbn[0]);
     return;
    }
    
    navigate(`/book/${clickedBook.isbn[0]}`);
  }
  
  
  return (
    <div className='bookCard flex-start' onClick={() => openPreview(bookDetails)}>
      <div className='bookImgWrapper'>
        <img
          src={getCoverUrl(bookDetails.cover_i, bookDetails.isbn?.[0])}
          load='lazy'
          alt={`${bookDetails.title} by ${bookDetails.author_name}`} />
      </div>
      
      <div className='bookInfo'>
        <p> 
          <strong>
            { bookDetails.author_name } 
          </strong>
        </p>
        
        <h4>
         { bookDetails.title }
        </h4>
        
        <p>
         <span> First Published: </span>
          { bookDetails.first_publish_year }
        </p>
        
        <p>
          <span> Edition count: </span> 
           { bookDetails.edition_count }
        </p>
        
        <p> 
         <span> Ratings: </span>
          { convertToStar(bookDetails.ratings_average) }
        </p>
      </div>
    </div>
  )
}


export default BookCard;