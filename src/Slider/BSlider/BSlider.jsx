import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import "./BSlider.css";

// import required modules
import { EffectCards, FreeMode, Pagination } from "swiper";

const BSlider = () => {
  const slider = [
    "https://i.ibb.co/ncrXc2V/1.png",
    "https://i.ibb.co/B3s7v4h/2.png",
    "https://i.ibb.co/XXR8kzF/3.png",
    "https://i.ibb.co/yg7BSdM/4.png",
    "https://i.ibb.co/ncrXc2V/1.png",
    "https://i.ibb.co/B3s7v4h/2.png",
    "https://i.ibb.co/XXR8kzF/3.png",
    "https://i.ibb.co/yg7BSdM/4.png",
    "https://i.ibb.co/ncrXc2V/1.png",
    "https://i.ibb.co/B3s7v4h/2.png",
    "https://i.ibb.co/XXR8kzF/3.png",
    "https://i.ibb.co/yg7BSdM/4.png",
  ];
  return (
    <>
      <Swiper
        
        effect={"cards"}
        
       
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, EffectCards]}
        className="mySwiper  rounded-xl w-[500px]"
      >
        {slider.map((img, index) => (
          <SwiperSlide key={index}>
            <img className="rounded-xl " src={img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BSlider;
