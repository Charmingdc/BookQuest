import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import useBookInfo from '@hooks/book/useBookInfo.tsx';
import convertToStar from '@utils/helper/convertToStar.tsx';

import TopBar from '@components/helper/TopBar.tsx';
import Footer from '@components/helper/Footer.tsx';

import { IoBookOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";

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
         <div className='book-info-img-wrapper flex-center'>
           <img src={bookInfo.cover} alt={bookInfo.title} />
          </div>
          
          
          <div className='action-tab'>
            <a href={`${bookInfo.url}`} className='flex-center'>
              Read Book 
              <span>
               <IoBookOutline /> 
              </span>
            </a>
            
            <button className='flex-center'>
              Add to Favourites
              <span>
               <LuHeart /> 
              </span>
            </button>
           </div>
          
          
          <div className='book-brief flex-col-center'>
            <h2 className='book-name'>
              { bookInfo.title } 
            </h2>
            
            <p className='star-rating'>
             { convertToStar(bookInfo.ratings_average) }
             
             <span>
              { bookInfo.ratings_average }
             </span>
            </p>
            
            <p className='author-name'> 
              {bookInfo.author_name}
            </p>
            
            <div className='quick-info flex-between'>
             <div>
              <strong> Published </strong>
              <p>
                { bookInfo.publish_date }
              </p>
             </div>
             
             <div>
              <strong> Pages </strong>
              <p>
                { bookInfo.number_of_pages }
              </p>
             </div>
             
             <div>
              <strong> Editions </strong>
              <p>
                { bookInfo.editions_count }
              </p>
             </div>
            </div>
            
          </div>
   
          
         <div className='book-about flex-col-center'>
           <h3> Description </h3>
           <p>{ bookInfo.description }</p>
           
          { /*
          <h3> Subjects </h3>
           <div className='subjects-wrapper flex-center'>
            {bookInfo.subjects.length > 0 ? (
              bookInfo.subjects.map((s,i) => (
                <div className='flex-center' key={i}>
                 { s }
                </div>
               ))
             ) : (
              <h2> No subjects found </h2>
             )}
           </div>
          */}
          
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