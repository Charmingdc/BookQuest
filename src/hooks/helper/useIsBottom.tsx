import { useState, useEffect } from "react"

const useIsBottom = (threshold: number = 10): boolean => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setIsBottom(scrollTop + clientHeight >= scrollHeight - threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isBottom;
};

export default useIsBottom;