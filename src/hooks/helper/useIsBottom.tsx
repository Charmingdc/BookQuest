import { useState, useEffect } from "react";

const useIsBottom = (threshold: number = 10): boolean => {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      setIsBottom(atBottom);
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isBottom;
};

export default useIsBottom;