import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 2rem 4rem;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: #ff6b6b;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const BenefitItem = styled.li`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #ff6b6b;
  }
`;

const ContactButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #ff5252;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const FranchiseImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Franquicias = () => {
  return (
    <PageContainer>
      <Title>Franquicias</Title>
      <ContentContainer>
        <InfoSection>
          <InfoTitle>Únete a Nuestra Familia</InfoTitle>
          <InfoText>
            Ofrecemos una oportunidad única para emprender en el negocio de las empanadas. 
            Con más de 10 años de experiencia en el mercado, hemos desarrollado un modelo 
            de negocio probado y exitoso.
          </InfoText>
          <InfoText>
            Nuestras franquicias incluyen:
          </InfoText>
          <BenefitsList>
            <BenefitItem>Entrenamiento completo para el personal</BenefitItem>
            <BenefitItem>Recetas exclusivas y estandarizadas</BenefitItem>
            <BenefitItem>Asesoramiento en la selección del local</BenefitItem>
            <BenefitItem>Diseño y equipamiento del local</BenefitItem>
            <BenefitItem>Marketing y publicidad</BenefitItem>
            <BenefitItem>Soporte continuo y seguimiento</BenefitItem>
          </BenefitsList>
          <ContactButton>Contactar para más información</ContactButton>
        </InfoSection>
        <ImageSection>
          <FranchiseImage src="/franquicias/molino.jpg" alt="Nuestro local modelo" />
        </ImageSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default Franquicias; 