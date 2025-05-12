import { useNavigate } from 'react-router-dom';

import useRecommendedBooks from '@hooks/book/useRecommendedBooks';
import { Book } from '@tp/book/types';
import { useBookId } from '@contexts/BookIdContext.tsx';
import getCoverUrl from '@utils/helper/getCoverUrl.tsx';
import convertToStar from '@utils/helper/convertToStar.tsx';
import ErrorBox from "../helper/ErrorBox.tsx";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';


const RecommendationBox = () => {
  const { recommendedBooks, isLoading, isError, error } = useRecommendedBooks();
  const { updateBookId } = useBookId();
  const navigate = useNavigate();
  
  if (isError) {
   console.log(error)
  };
  
  const openPreview = (clickedBook: Book) => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 726 && clickedBook.isbn) {
     updateBookId(clickedBook.isbn[0]);
     return;
    }
    
    if (clickedBook.isbn) {
     navigate(`/book/${clickedBook.isbn[0]}`);
    }
  }
  
  
  if (isLoading) {
   return (
     <section className="recommendation-section flex-col-center">
      <h2>Recommended Books</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 90,
          modifier: 2.5,
          scale: 0.9,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper">
        {[...Array(50)].map((_, index) => (
          <SwiperSlide
            key={index}> 
            <div></div>
            
           <h3> 
             <em> Fetching... </em>
           </h3>
           <p> {/** placeholders **/} </p>
           <p> {/** placeholders **/} </p>
         </SwiperSlide>
        ))}
      </Swiper>
    </section>
   )
  }
  
  if (isError) {
    return (
      <section className="recommendation-section">
        <h2>Categories</h2>
        <ErrorBox 
         type='internal-error'
         message='There was an error fetching the books. Please try again later.' />
      </section>
    );
  }
  
  
  return (
    <section className="recommendation-section flex-col-center">
      <h2>Recommended Books</h2>
       <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 90,
          modifier: 2.5,
          scale: 0.9,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper">
        {recommendedBooks.map((book, index) => (
          <SwiperSlide
            onClick={() => openPreview(book)}
            key={index}> 
            <div 
             style={{backgroundImage: `url(${getCoverUrl(book.cover_i, book.isbn?.[0])})`}}>
            </div>
            
            <h3> { book.title } </h3>
            <p> { book.author_name } </p>
            <p> 
              { convertToStar(book.ratings_average) }
              <span> 
                { book.ratings_average }
              </span>
            </p>
         </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecommendationBox;