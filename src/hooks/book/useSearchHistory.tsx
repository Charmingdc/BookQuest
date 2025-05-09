import { useState, useEffect } from "react"
import useDebounce from "../helper/useDebounce.tsx";

const useSearchHistory = () => {
  const [searchedTerms, setSearchedTerms] = useState<string[]>(() => {
    const savedTerms = localStorage.getItem("DayForge_searchedTerms");
    return savedTerms ? JSON.parse(savedTerms) : [];
  });

  const [term, setTerm] = useState<string>("");
  const debouncedTerm: string = useDebounce(term, 2000);
  


  useEffect(() => {
   if (debouncedTerm) {
   const isPresent = searchedTerms.includes(debouncedTerm);
   if (isPresent) return;
    
    setSearchedTerms((prevTerms) => {
     const updatedTerms = [...prevTerms, debouncedTerm];
     
     localStorage.setItem("DayForge_searchedTerms", JSON.stringify(updatedTerms));
     
      return updatedTerms;
    });
   }
  }, [debouncedTerm, searchedTerms]);
   
 
   
  const saveSearchedTerm = (newTerm: string) => {
    setTerm(newTerm);
  };
  
  
  const deleteSearchedTerm = (index: number) => {
    setSearchedTerms((prevTerms) => {
     const updatedTerms = prevTerms.filter((_, i) => i !== index);
     localStorage.setItem("DayForge_searchedTerms", JSON.stringify(updatedTerms));
     
     return updatedTerms;
    });
  };
  
  
  const clearAllHistory = () => {
    setSearchedTerms([]);

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("DayForge")) localStorage.removeItem(key);
    });
  };
  
  return { searchedTerms, saveSearchedTerm, deleteSearchedTerm, clearAllHistory };
};

export default useSearchHistory;