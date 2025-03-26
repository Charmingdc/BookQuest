import { useState, useEffect } from "react"

const useIsBottom = () => {
  const [isBottom, setIsBottom] = useState(false);
  let ticking = false;
  
  useEffect(() => {
    const handleScroll = () => {
     if (!ticking) {
      ticking = true;
       requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        setIsBottom(scrollTop + clientHeight >= scrollHeight - 10);
        ticking = false;
      });
    }
  };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isBottom;
};

export default useIsBottom;