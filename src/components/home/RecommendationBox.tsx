import useBooks from '@hooks/useBooks.tsx';
import getCoverUrl from '@utils/helper/getCoverUrl.tsx';
import convertToStar from '@utils/helper/convertToStar.tsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';


const RecommendationBox = () => {
  const { books, error, loading } = useBooks();
  
  return (
    <section className="recommendation-section flex-col-center">
      <h2>Recommended Books</h2>

      { error ? (
        <div className='error-box'>
          <img 
            src='/illustrations/internal-server-error.png'
           alt='Error Fetching books' />
          <h4> Error fetching recommended books </h4>
        </div>
       ) :
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
        
        {books.map((book, index) => (
          <SwiperSlide
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
      </Swiper>}
    </section>
  );
};

export default RecommendationBox;