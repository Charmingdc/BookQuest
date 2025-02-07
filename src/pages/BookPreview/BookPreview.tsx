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
    console.log(bookInfo);
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
        <section className='book-info-section flex-col-center'>
         <div className='book-info-img-wrapper'>
           <img src={bookInfo.cover} alt={bookInfo.title} />
          </div>
          
          
          <div className='book-info-about flex-col-center'>
            <h2> { bookInfo.title } </h2>
            
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