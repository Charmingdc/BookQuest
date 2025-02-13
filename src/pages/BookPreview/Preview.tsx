import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import useBookInfo from '@hooks/book/useBookInfo.tsx';

import TopBar from '@components/helper/TopBar.tsx';
import Loader from '@components/helper/Loader.tsx';
import BookPreview from '@components/helper/BookPreview.tsx';
import Footer from '@components/helper/Footer.tsx';



import './index.css';

const Preview = () => {
  const params = useParams();
  const identifier = params.identifier;
  const { bookInfo, loading, error } = useBookInfo(identifier);


  return (
    <>
     <header>
      <TopBar pageTitle={(bookInfo) ? bookInfo.title : 'Book Title'} />
     </header>

     <main>
      {loading && <Loader />}


      {error && (
        <div className="error-box">
          <img src="/illustrations/internal-server-error.png" alt="Error getting data" />
          <h3>Error getting book</h3>
        </div>
      )}


      {bookInfo && (
        <BookPreview bookInfo={bookInfo} />
      )}
    </main>

    <footer>
      <Footer currentPage="home" />
    </footer>
   </>
  );
};

export default Preview;