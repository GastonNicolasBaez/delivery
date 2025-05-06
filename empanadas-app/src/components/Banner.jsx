import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SideMenu from './SideMenu';

const BannerContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.isScrolled ? '0.8rem 2rem' : '2rem 2rem'};
  z-index: 998;
  transition: all 0.3s ease;
  background-color: ${props => props.isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'rgba(0, 0, 0, 0.2)'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'blur(0px)'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none'};
  height: ${props => props.isScrolled ? '80px' : '100px'};

  @media (max-width: 1024px) {
    padding: ${props => props.isScrolled ? '0.5rem 1rem' : '1rem'};
    height: ${props => props.isScrolled ? '60px' : '80px'};
  }
`;

const Logo = styled(Link)`
  height: ${props => {
    if (props.isScrolled) return '140px';
    if (props.isSecondaryPage || props.isOrderPage) return '180px';
    return '340px';
  }};
  cursor: pointer;
  transition: all 0.5s ease;
  position: absolute;
  left: 50%;
  transform: ${props => {
    if (props.isScrolled) return 'translate(-50%, -25%)';
    if (props.isSecondaryPage || props.isOrderPage) return 'translate(-50%, -20%)';
    return 'translate(-50%, -20%)';
  }};
  display: block;
  filter: ${props => props.isScrolled ? 'none' : 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'};
  z-index: 999;
  top: ${props => props.isScrolled ? '50%' : '100%'};
  
  img {
    height: 100%;
    width: auto;
    transition: all 0.5s ease;
  }

  @media (max-width: 1024px) {
    height: ${props => {
      if (props.isScrolled) return '100px';
      if (props.isSecondaryPage || props.isOrderPage) return '140px';
      return '260px';
    }};
    transform: ${props => {
      if (props.isScrolled) return 'translate(-50%, -20%)';
      if (props.isSecondaryPage || props.isOrderPage) return 'translate(-50%, -20%)';
      return 'translate(-50%, -15%)';
    }};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LeftNav = styled(NavLinks)`
  flex: 1;
  justify-content: flex-start;
  padding-right: 200px;
  gap: 3rem;
`;

const RightNav = styled(NavLinks)`
  flex: 1;
  justify-content: flex-end;
  padding-left: 200px;
  gap: 3rem;
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: var(--color-text-light);
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 1.1rem;
  padding: 0.5rem;
  transition: all 0.3s ease;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: ${props => !props.$isScrolled && '0 2px 4px rgba(0,0,0,0.3)'};
  white-space: nowrap;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 1024px) {
    display: block;
  }
`;

const StyledButton = styled.button`
  text-decoration: none;
  color: var(--color-text-light);
  font-family: var(--font-main);
  font-weight: 400;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: 2px;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  text-shadow: ${props => !props.$isScrolled && '0 2px 4px rgba(0,0,0,0.3)'};
  
  &:hover {
    color: var(--color-primary);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }
`;

const OrderButton = styled(StyledButton)`
  background-color: var(--color-primary);
  color: var(--color-text-light);
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 1rem;
  text-shadow: none;
  letter-spacing: 2px;
  
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-text-light);
  }

  @media (max-width: 1024px) {
    &.mobile-only {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 0.8rem 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Banner = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSecondaryPage = ['/sucursales', '/franquicias', '/contacto'].includes(location.pathname);
  const isOrderPage = ['/delivery', '/pickup', '/order-type'].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEmpanadas = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const empanadasSection = document.getElementById('empanadas-section');
        if (empanadasSection) {
          const offset = 80;
          const elementPosition = empanadasSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const empanadasSection = document.getElementById('empanadas-section');
      if (empanadasSection) {
        const offset = 80;
        const elementPosition = empanadasSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderClick = () => {
    navigate('/order-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <BannerContainer isScrolled={isScrolled}>
        <MenuButton onClick={() => setIsMenuOpen(true)}>
          <i className="fas fa-bars"></i>
        </MenuButton>
        <LeftNav>
          <StyledButton onClick={() => scrollToEmpanadas()} $isScrolled={isScrolled}>Sabores</StyledButton>
          <StyledButton onClick={() => handleNavClick('/sucursales')} $isScrolled={isScrolled}>Sucursales</StyledButton>
          <StyledButton onClick={() => handleNavClick('/franquicias')} $isScrolled={isScrolled}>Franquicias</StyledButton>
        </LeftNav>
        <LogoContainer>
          <Logo 
            to="/" 
            onClick={handleLogoClick} 
            isScrolled={isScrolled} 
            isSecondaryPage={isSecondaryPage}
            isOrderPage={isOrderPage}
          >
            <img src="/logo.png" alt="Empanadas Logo" />
          </Logo>
        </LogoContainer>
        <RightNav>
          <OrderButton onClick={handleOrderClick} $isScrolled={isScrolled}>PEDIR ON-LINE</OrderButton>
          <StyledButton onClick={() => handleNavClick('/contacto')} $isScrolled={isScrolled}>Contacto</StyledButton>
        </RightNav>
      </BannerContainer>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Banner; 