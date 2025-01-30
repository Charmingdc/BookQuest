import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

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
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 80,
          modifier: 2.5,
          scale: 0.9,
          slideShadows: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper">
        <SwiperSlide className="slide"></SwiperSlide>
        <SwiperSlide className="slide"></SwiperSlide>
        <SwiperSlide className="slide"></SwiperSlide>
        <SwiperSlide className="slide"></SwiperSlide>
        <SwiperSlide className="slide"></SwiperSlide>
      </Swiper>
    </section>
  );
};

export default RecommendationBox;