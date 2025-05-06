import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: -70px;
  padding-top: 30px;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-top: -70px;
    padding-top: 10px;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding-top: 0;
  width: 90%;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    height: 100vh;
    margin-top: -70px;
  }
  
  .slick-dots {
    bottom: 95px;
    
    @media (max-width: 768px) {
      bottom: 85px;
    }
  }
  
  .slick-dots li button:before {
    color: white;
    font-size: 12px;

    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
  
  .slick-dots li.slick-active button:before {
    color: white;
  }
`;

const SlideImage = styled.div`
  height: 100vh;
  margin-top: -70px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    background-position: center center;
  }
`;

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true
  };

  const slides = [
    {
      id: 1,
      image: '/slide1.jpg',
    },
    {
      id: 2,
      image: '/slide2.jpg',
    },
    {
      id: 3,
      image: '/slide3.jpg',
    }
  ];

  return (
    <HeaderContainer>
      <TitleContainer>
        <MainTitle>NONINO EMPANADAS</MainTitle>
        <SubTitle>San Martín de los Andes</SubTitle>
      </TitleContainer>
      <StyledSlider {...settings}>
        {slides.map(slide => (
          <SlideImage key={slide.id} image={slide.image} />
        ))}
      </StyledSlider>
    </HeaderContainer>
  );
};

export default Header; 