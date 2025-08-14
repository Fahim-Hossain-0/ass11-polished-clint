import React from 'react';
import bannerImg from '../../assets/katie-smith-uQs1802D0CQ-unsplash.jpg'
import '../../index.css'
const Banner = () => {
  return (
    <div
      className="hero min-h-screen font rounded-2xl"
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-7xl leading-22 text-gray-300 font-bold banner-font">It's Food <br /> Hub</h1>
         

        </div>
      </div>
    </div>
  );
};

export default Banner;
