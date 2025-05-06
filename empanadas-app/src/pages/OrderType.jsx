import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
  position: relative;
`;

const ContentContainer = styled.div`
  padding-top: 180px;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 120px;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 4rem;
  font-family: var(--font-main);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1200px;
  width: 90%;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 95%;
    padding: 1rem;
  }
`;

const OptionCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);

    &::before {
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const OptionTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-family: var(--font-main);
  font-weight: 600;
`;

const OptionDescription = styled.p`
  color: var(--color-text-light);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const TimeEstimate = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-light);
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::before {
    content: '⏱️';
  }
`;

const OrderType = () => {
  const navigate = useNavigate();

  const handleDelivery = () => {
    navigate('/delivery');
  };

  const handlePickup = () => {
    navigate('/pickup');
  };

  return (
    <PageContainer>
      <Banner />
      <ContentContainer>
        <Title>¿Cómo querés recibir tu pedido?</Title>
        <OptionsContainer>
          <OptionCard onClick={handleDelivery}>
            <IconWrapper>🛵</IconWrapper>
            <OptionTitle>Envío a Domicilio</OptionTitle>
            <OptionDescription>
              Te llevamos las empanadas calentitas hasta la puerta de tu casa
            </OptionDescription>
            <TimeEstimate>30-45 minutos aprox.</TimeEstimate>
          </OptionCard>

          <OptionCard onClick={handlePickup}>
            <IconWrapper>🏪</IconWrapper>
            <OptionTitle>Retirar en el Local</OptionTitle>
            <OptionDescription>
              Pasá a buscar tu pedido por la sucursal más cercana
            </OptionDescription>
            <TimeEstimate>15-20 minutos aprox.</TimeEstimate>
          </OptionCard>
        </OptionsContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default OrderType; 