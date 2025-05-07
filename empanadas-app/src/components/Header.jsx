import React from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const accordionAnimation = keyframes`
  0% {
    transform: scaleY(0.8);
    opacity: 0;
  }
  50% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: 100vh;
  margin-top: -70px;
  padding-top: 30px;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 90vh;
    margin-top: -60px;
  }

  @media (max-width: 768px) {
    height: 80vh;
    margin-top: -50px;
    padding-top: 20px;
  }

  @media (max-width: 480px) {
    height: 70vh;
    margin-top: -40px;
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
  padding-top: 0;
  width: 90%;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.3));

  @media (max-width: 1024px) {
    top: 45%;
    width: 85%;
  }

  @media (max-width: 768px) {
    top: 45%;
    width: 90%;
  }

  @media (max-width: 480px) {
    top: 45%;
    width: 95%;
  }
`;

const MainTitle = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-family: var(--font-main);
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(45deg,hsl(39, 90.30%, 51.40%),rgb(226, 193, 102));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${accordionAnimation} 1s ease-out;
  transform-origin: center;
  text-shadow: 0 0 10px rgba(0,0,0,0.3);

  @media (max-width: 1024px) {
    font-size: 3.8rem;
    margin-bottom: 1.2rem;
    letter-spacing: 1.5px;
  }

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.8rem;
    letter-spacing: 0.5px;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  font-family: var(--font-main);
  letter-spacing: 2px;
  color: rgb(182, 124, 37);
  text-shadow: 0 0 10px rgba(240, 237, 81, 0.3);
  animation: ${accordionAnimation} 1s ease-out 0.3s backwards;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
    letter-spacing: 1.5px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    letter-spacing: 0.5px;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    height: 100vh;
    margin-top: -70px;
  }
  
  .slick-dots {
    bottom: 95px;
    
    @media (max-width: 1024px) {
      bottom: 85px;
    }

    @media (max-width: 768px) {
      bottom: 75px;
    }

    @media (max-width: 480px) {
      bottom: 65px;
    }
  }
  
  .slick-dots li button:before {
    color: white;
    font-size: 12px;

    @media (max-width: 768px) {
      font-size: 10px;
    }

    @media (max-width: 480px) {
      font-size: 8px;
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

  @media (max-width: 1024px) {
    height: 90vh;
    margin-top: -60px;
  }

  @media (max-width: 768px) {
    height: 80vh;
    margin-top: -50px;
  }

  @media (max-width: 480px) {
    height: 70vh;
    margin-top: -40px;
  }
`;

const FloatingOrderButton = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(45deg, hsl(39, 90.30%, 51.40%), rgb(226, 193, 102));
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
    bottom: 1rem;
    right: 1rem;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  
  const handleOrderClick = () => {
    navigate('/order-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <FloatingOrderButton onClick={handleOrderClick}>
        <i className="fas fa-shopping-cart"></i>
        Pedir Ahora
      </FloatingOrderButton>
    </HeaderContainer>
  );
};

export default Header; 