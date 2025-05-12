export interface Book {
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

export interface RawBook {
  title: string;
  key: string;
  author_name?: string[];
  author_key?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
  publisher?: string[];
  edition_count?: number;
  ratings_average?: number;
  isbn?: string[];
  subject?: string[];
}

export interface WorkDetails {
  description?: string | { value: string };
  links?: { title: string; url: string }[];
  subjects?: string[];
}

export interface BookInfoProp {
  title: string;
  url: string;
  author_name: string;
  author_key: string;
  key: string;
  cover: string;
  links?: { title: string; url: string }[];
  number_of_pages: string | number;
  publish_date: string | number;
  editions_count: number;
  ratings_average: number;
  isbn: string;
  description: string;
  subjects: string[];
} 

export interface FavouriteBooksProps {
 title: string;
 isbn: string;
 cover: string;
 ratings_average: number;
}
