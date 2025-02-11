import { useState, useEffect } from 'react';
import useBookInfo from '@hooks/book/useBookInfo.tsx';
import { useBookId } from '@contexts/BookIdContext.tsx';

import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';
import Loader from '@components/helper/Loader.tsx';
import BookPreview from '@components/helper/BookPreview.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';

const Home = () => {
  const { bookId } = useBookId();
  const { bookInfo, loading } = useBookInfo(bookId);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth > 726);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 726);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Home log:", bookId);
    if (bookInfo) console.log("Book info:", bookInfo);
  }, [bookId, bookInfo, loading]);

  return (
    <>
      <header>
        <HomeTopBar />
      </header>

      <main className="home-main">
        <aside aria-label="Sidebar"></aside>

        <section className="mobile-home">
          <RecommendationBox />
          <CategoriesBox />
        </section>

        <aside aria-label="Book-preview">
          {isDesktop && (
            bookId ? (
              loading ? <Loader /> : bookInfo ? <BookPreview bookInfo={bookInfo} /> : <h1>Book not found</h1>
            ) : (
              <div className='no-book'>
               <img src='/illustrations/welcome-home.png' alt='Welcome to BookQuest' />
               
               <h2>
                 Welcome to BookQuest 📚
               </h2>
              </div>
            )
          )}
        </aside>
      </main>

      <footer>
        <Footer currentPage="home" />
      </footer>
    </>
  );
};

export default Home;