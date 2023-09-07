import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/banner/hero-banner-1.jpg";
import slide2 from "../assets/banner/banner-2.jpg";
import slide3 from "../assets/banner/banner-3.jpg";
import SlideCarousel from "./SlideCarousel";
import { GrNext, GrPrevious } from "react-icons/gr";
const Carousel = () => {
  const sliderRef = useRef(null); // Ref for the Slider component

  const prevSlide = () => {
    sliderRef.current.slickPrev(); // Go to the previous slide
  };

  const nextSlide = () => {
    sliderRef.current.slickNext(); // Go to the next slide
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    autoplay: true,
    fade: true,
    cssEase: "linear",
    appendDots: (dots) => <ul className="slick-dots custom-dots">{dots}</ul>,
    customPaging: (i) => (
      <div className="custom-dot">
        <span className="dot" />
      </div>
    ),
  };

  const images = [slide1, slide2, slide3];

  return (
    <div className="lg:pt-10 lg:px-10 px-4 md:px-7 md:pt-10 md:mt-16">
      <Slider {...settings} ref={sliderRef}>
        {images.map((image, index) => (
          <SlideCarousel key={index} src={image} />
        ))}
      </Slider>
      <div
        className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-10 text-2xl cursor-pointer z-10 bg-white/70 rounded-full hover:bg-white"
        onClick={prevSlide}
      >
        <GrPrevious />
      </div>
      <div
        className="group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-10 text-2xl cursor-pointer z-10 bg-white/70 rounded-full hover:bg-white"
        onClick={nextSlide}
      >
        <GrNext />
      </div>
    </div>
  );
};

export default Carousel;
