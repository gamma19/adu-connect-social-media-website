import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Coverflow.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={require("../../components/swiper-js/1.jpg")} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("../../components/swiper-js/5.jpg")} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("../../components/swiper-js/3.jpg")} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={require("../../components/swiper-js/4.jpg")} alt="" />
        </SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
