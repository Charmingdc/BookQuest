import { useState, useEffect } from 'react';
import useBookInfo from '@hooks/book/useBookInfo.tsx';
import { useBookId } from '@contexts/BookIdContext.tsx';

import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';
import Loader from '@components/helper/Loader.tsx';
import BookPreview from '@components/helper/Book/BookPreview.tsx';
import SideBar from '@components/helper/Navigation/SideBar.tsx';
import Footer from '@components/helper/Navigation/Footer.tsx';


/* import '@pages/BookPreview/index.css'; */
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



  return (
    <>
      <header>
        <HomeTopBar />
      </header>

      <main className="home-main">
        <aside aria-label="Sidebar">
          <SideBar currentPage='home' />
        </aside>

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