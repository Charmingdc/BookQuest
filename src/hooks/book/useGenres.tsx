import { useState, useMemo } from "react";

export const randomGenres: string[] = [
  "fiction", "nonfiction", "fantasy", "mystery", "romance", "science fiction",
  "history", "biography", "poetry", "philosophy", "psychology", "self-help",
  "health", "education", "science", "technology", "business", "economics",
  "politics", "law", "religion", "mythology", "horror", "thriller",
  "young adult", "children", "graphic novels", "art", "music",
  "cooking", "sports", "travel", "war", "literature", "drama",
  "LGBTQ", "classic", "contemporary", "spirituality"
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