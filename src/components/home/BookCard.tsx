import convertToStar from '@utils/helper/convertToStar.tsx';
import getCoverUrl from '@utils/helper/getCoverUrl.tsx';


type BookDetailsProps = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  subject: string[];
  cover_i: number;
  ratings_average: number;
  edition_count: number;
}


const BookCard = ({bookDetails}: BookDetailsProps) => {
  return (
    <div className='bookCard flex-start'>
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