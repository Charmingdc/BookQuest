import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const RecommendationBox = () => {
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
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2.5,
          scale: 0.9,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="slide">Slide 1</SwiperSlide>
        <SwiperSlide className="slide">Slide 2</SwiperSlide>
        <SwiperSlide className="slide">Slide 3</SwiperSlide>
        <SwiperSlide className="slide">Slide 4</SwiperSlide>
        <SwiperSlide className="slide">Slide 5</SwiperSlide>
      </Swiper>
    </section>
  );
};

export default RecommendationBox;