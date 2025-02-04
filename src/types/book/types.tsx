type Book = {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  subject: string[];
  cover_i: number;
  ratings_average: number | null;
  edition_count: number;
  isbn?: string[]
};
