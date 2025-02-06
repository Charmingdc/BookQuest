import { Book } from '@types/book/types.tsx';

const normalizedBookData = (data: Book): Book => {
    if (!data) {
      console.error('No book data to normalize');
      return;
    }
    
    return {
      key: data.key,
      title: data.title,
      author_name: data.author_name,
      first_publish_year: data.first_publish_year,
      subject: data.subject || [],
      cover_i: data.cover_i,
      ratings_average: data.ratings_average.toFixed(2),
      edition_count: data.edition_count,
      isbn: data.isbn || []
    };
};


export default normalizedBookData;