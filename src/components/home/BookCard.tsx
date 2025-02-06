import { useNavigate } from 'react-router-dom';
import { Book } from '@types/book/types.tsx';

import convertToStar from '@utils/helper/convertToStar.tsx';
import getCoverUrl from '@utils/helper/getCoverUrl.tsx';



const BookCard = ({bookDetails}: Book) => {
  const navigate = useNavigate();
  
  const openPreview = (bookInfo: Book) => {
    if (!bookInfo.isbn) {
     navigate(`book-preview/${bookInfo.key}`); // fallback option for book preview navigation
     return;
    }
    
    navigate(`/book-preview/${bookInfo.isbn[0]}`); // navigate to preview book
  }
  
  
  return (
    <div className='bookCard flex-start' onClick={() => openPreview(bookDetails)}>
      <div className='bookImgWrapper'>
        <img
          src={getCoverUrl(bookDetails.cover_i, bookDetails.isbn?.[0])}
          load='lazy'
          alt={bookDetails.title} />
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