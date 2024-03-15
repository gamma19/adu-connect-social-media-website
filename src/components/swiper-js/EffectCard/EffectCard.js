import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./EffectCard.css";

// import required modules
import { EffectCards } from "swiper/modules";

export default function EffectCard() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={require("../../../pages/about/students.jpg")} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={require("../../../pages/about/7.jpg")} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={require("../../../pages/about/3.jpg")} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={require("../../../pages/about/4.jpg")} />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={require("../../../pages/about/5.jpg")} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
