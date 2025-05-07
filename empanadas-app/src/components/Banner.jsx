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

  @media (max-width: 768px) {
    padding: ${props => props.isScrolled ? '0.4rem 0.8rem' : '0.8rem 1rem'};
    height: ${props => props.isScrolled ? '50px' : '70px'};
  }

  @media (max-width: 480px) {
    padding: ${props => props.isScrolled ? '0.3rem 0.6rem' : '0.6rem 0.8rem'};
    height: ${props => props.isScrolled ? '40px' : '60px'};
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
    display: block;
    margin-bottom: 0;
  }

  @media (max-width: 1024px) {
    height: ${props => {
      if (props.isScrolled) return '100px';
      if (props.isSecondaryPage || props.isOrderPage) return '140px';
      return '260px';
    }};
    transform: ${props => {
      if (props.isScrolled) return 'translate(-50%, -20%)';
      return 'translate(-50%, -15%)';
    }};
    img {
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    height: ${props => props.isScrolled ? '60px' : '120px'};
    transform: translate(-50%, -18%);
    img {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 480px) {
    height: ${props => props.isScrolled ? '40px' : '90px'};
    transform: translate(-50%, -15%);
    img {
      margin-bottom: 2.5rem;
    }
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

  @media (max-width: 1024px) {
    padding-right: 100px;
    gap: 2rem;
  }
`;

const RightNav = styled(NavLinks)`
  flex: 1;
  justify-content: flex-end;
  padding-left: 200px;
  gap: 3rem;

  @media (max-width: 1024px) {
    padding-left: 100px;
    gap: 2rem;
  }
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

  @media (max-width: 1024px) {
    font-size: 1rem;
    letter-spacing: 1.5px;
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

  @media (max-width: 768px) {
    font-size: 1.25rem;
    left: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    left: 0.3rem;
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

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
    letter-spacing: 1px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    letter-spacing: 0.5px;
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
    display: none;
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
  const isEmpanadasMenu = location.pathname === '/menu';
  const isDeliveryOrPickup = ['/delivery', '/pickup'].includes(location.pathname);

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
        const empanadasSection = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent.includes('Nuestras Empanadas'));
        if (empanadasSection) {
          const offset = 150;
          const elementPosition = empanadasSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const empanadasSection = Array.from(document.querySelectorAll('h2')).find(h2 => h2.textContent.includes('Nuestras Empanadas'));
      if (empanadasSection) {
        const offset = 150;
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
      {!isEmpanadasMenu && !isDeliveryOrPickup && (
        <FloatingOrderButton onClick={handleOrderClick}>
          <i className="fas fa-shopping-cart"></i>
          Pedir Ahora
        </FloatingOrderButton>
      )}
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Banner; 