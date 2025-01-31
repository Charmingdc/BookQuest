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
      </div>
      
      <div className='bookInfo'>
        <h4> { bookDetails.title } </h4>
      </div>
    </div>
  )
}


export default BookCard;