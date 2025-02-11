import { useState, useEffect } from 'react'
import useBookInfo from '@hooks/book/useBookInfo.tsx';
import { useBookId } from '@contexts/BookIdContext.tsx';

import HomeTopBar from '@components/home/HomeTopBar.tsx';
import RecommendationBox from '@components/home/RecommendationBox.tsx';
import CategoriesBox from '@components/home/CategoriesBox.tsx';
import BookPreview from '@components/helper/BookPreview.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';


const Home = () => {
 const { bookId, updateBookId } = useBookId();
 const { bookInfo, loading, error } = useBookInfo(bookId);
 const [isDesktop, setIsDesktop] = useState<boolean>(false);
 
 useEffect(() => {
  const screenWidth = window.innerWidth;
  
  if (screenWidth > 726) {
   setIsDesktop(true);
  }
 }, []);
 
 
 useEffect(() => {
  console.log("Home log:", bookId);
  if (bookInfo) console.log("Book info:", bookInfo);
}, [bookId, bookInfo, loading, error]);
  
  return (
    <>
     <header>
       <HomeTopBar />
     </header>
      
     <main className='home-main'>
       <aside arial-label='Sidebar'>
        
       </aside>
       
       <section className='mobile-home'>
         <RecommendationBox />
         <CategoriesBox />
       </section>
       
       <aside arial-label='Book-preview'>
         {(isDesktop && bookInfo) ? (
          <BookPreview bookInfo={bookInfo}/> 
          ) : (<h1> Toor </h1>)}
       </aside>
     </main>
     
     <footer>
       <Footer currentPage='home' />
     </footer>
    </>
  )
}

export default Home;