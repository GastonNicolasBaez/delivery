import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #8B4513;
  color: #FFF5EE;
  padding: 3rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #D2691E;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const FooterLink = styled(Link)`
  color: #FFF5EE;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #D2691E;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialIcon = styled.a`
  color: #FFF5EE;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #D2691E;
  }
`;

const ContactInfo = styled.p`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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