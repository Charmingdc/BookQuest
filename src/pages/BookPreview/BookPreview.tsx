import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useBookInfo from '@hooks/book/useBookInfo.tsx';

import TopBar from '@components/helper/TopBar.tsx';
import Footer from '@components/helper/Footer.tsx';

import './index.css';


const BookPreview = () => {
  const params = useParams();
  const identifier = params.identifier;
  const { bookInfo, loading, error } = useBookInfo(identifier);

  useEffect(() => {
    console.log(bookInfo, identifier, error);
  }, [bookInfo, identifier]);


  return (
    <>
     <header>
      <TopBar pageTitle={(bookInfo) ? bookInfo.title : 'Book Title'} />
     </header>

     <main>
      {loading && <p>Loading...</p>}

      {error && (
        <div className="error-box">
          <img src="/illustrations/internal-server-error.png" alt="Error getting data" />
          <h3>Error getting book</h3>
        </div>
      )}

      {bookInfo && (
        <section className='book-info-section'>
         <div className='book-info-wrapper'>
           <img src={bookInfo.cover} alt={bookInfo.title} />
           
           <img
              src={`https://covers.openlibrary.org/a/olid/${bookInfo.author_key}-S.jpg`}
              alt={bookInfo.author_name}
            />
         </div>
        </section>
      )}
    </main>

    <footer>
      <Footer currentPage="home" />
    </footer>
   </>
  );
};

export default BookPreview;