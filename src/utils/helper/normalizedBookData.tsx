const normalizedBookData = (data: Book): Book => {
  if (!data) {
    console.error('No book data to normalize');
    throw new Error('Invalid book data');
  }

  return {
    key: data.key,
    title: data.title,
    author_name: data.author_name,
    first_publish_year: data.first_publish_year,
    subject: data.subject || [],
    cover_i: data.cover_i,
    ratings_average: data.ratings_average ? data.ratings_average.toFixed(1) : "N/A",
    edition_count: data.edition_count,
    isbn: data.isbn || []
  };
};

export default normalizedBookData;