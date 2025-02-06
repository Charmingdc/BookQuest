export type Book = {
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


export type BookInfoProp {
  title: string;
  url: string;
  author_name: string;
  author_key: string;
  key: string;
  excerpts?: { text: string }[];
  links?: { title: string; url: string }[];
  number_of_pages?: number;
  pagination?: string;
  publish_date?: string;
  publishers?: string[];
  weight?: string;
}