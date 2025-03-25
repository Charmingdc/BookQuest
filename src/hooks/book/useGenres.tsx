import { useState, useMemo } from "react";

const randomGenres: string[] = [
  "Fantasy",
  "SciFi",
  "Mystery",
  "Thriller",
  "Horror",
  "Romance",
  "History",
  "Adventure",
  "Dystopia",
  "Poetry",
  "SelfHelp",
  "Biography",
  "Memoir",
  "Philosophy",
  "Psychology",
  "Classics",
  "YoungAdult",
  "Humor",
  "Productivity",
  "Mythology"
];

const useGenres = (numOfGenres: number) => {
  const userPreferredGenres: string[] = [];

  const genres = useMemo(() => {
    const availableGenres = userPreferredGenres.length > 0 ? userPreferredGenres : randomGenres;
    
    return [...availableGenres].sort(() => Math.random() - 0.5).slice(0, numOfGenres);
  }, []); 

  return { genres };
};

export default useGenres;