import React from 'react';
import { Carousel } from 'antd';
import './carousel.css';


const ImagesCarousel = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
    </Carousel>
  );
};
export default ImagesCarousel;
