import React from 'react';
import { Carousel } from 'antd';
import './homecarousel.css';

const contentStyle = {
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const HomeCarousel = () => {
  const onChange = (currentSlide) => {
  };

  return (
    <Carousel autoplay afterChange={onChange} className="custom-carousel">
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
