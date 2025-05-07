import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #8B4513;
  color: #FFF5EE;
  padding: 3rem 2rem;
  margin-top: 4rem;

  @media (max-width: 1024px) {
    padding: 2.5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0.5rem;
    margin-top: 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 0.7rem;
  }

  @media (max-width: 600px) {
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;

const FooterTitle = styled.h3`
  color: #D2691E;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.05rem;
    margin-bottom: 0.7rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  color: #FFF5EE;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: #D2691E;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 600px) {
    justify-content: center;
    width: 100%;
    gap: 0.7rem;
  }
`;

const SocialIcon = styled.a`
  color: #FFF5EE;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #D2691E;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ContactInfo = styled.p`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    gap: 0.4rem;
  }

  @media (max-width: 600px) {
    justify-content: center;
    font-size: 0.9rem;
    gap: 0.3rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>NONINO EMPANADAS</FooterTitle>
          <p>Las mejores empanadas artesanales de San Martín de los Andes</p>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Enlaces Rápidos</FooterTitle>
          <FooterLink to="/">Inicio</FooterLink>
          <FooterLink to="/sucursales">Sucursales</FooterLink>
          <FooterLink to="/franquicias">Franquicias</FooterLink>
          <FooterLink to="/contacto">Contacto</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Horarios</FooterTitle>
          <ContactInfo>
            <i className="far fa-clock"></i>
            Lunes a Viernes: 10:00 - 22:00
          </ContactInfo>
          <ContactInfo>
            <i className="far fa-clock"></i>
            Sábados y Domingos: 11:00 - 23:00
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contacto</FooterTitle>
          <ContactInfo>
            <i className="fas fa-phone"></i>
            +54 9 2972 123456
          </ContactInfo>
          <ContactInfo>
            <i className="fas fa-envelope"></i>
            info@noninoempanadas.com
          </ContactInfo>
          <ContactInfo>
            <i className="fas fa-map-marker-alt"></i>
            San Martín de los Andes, Neuquén
          </ContactInfo>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 