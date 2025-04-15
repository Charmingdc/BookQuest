import { useEffect, useMemo, useState } from "react";
import { db, auth } from "@fb/config.ts";
import { doc, getDoc } from "firebase/firestore";

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
  const [userPreferredGenres, setUserPreferredGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserPreferredGenres(data.preferredGenres || []);
        }
      } catch (error: any) {
        console.error("Error fetching user genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const genres = useMemo(() => {
    const availableGenres =
      userPreferredGenres.length > 0 ? userPreferredGenres : randomGenres;
    return [...availableGenres]
      .sort(() => Math.random() - 0.5)
      .slice(0, numOfGenres);
  }, [userPreferredGenres, numOfGenres]);

  return { genres };
};

export default useGenres;