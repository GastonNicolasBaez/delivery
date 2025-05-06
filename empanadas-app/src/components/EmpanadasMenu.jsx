import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 120px;

  @media (max-width: 768px) {
    padding-top: 2rem;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--color-text);
  font-family: var(--font-main);
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--color-primary);
    border-radius: 2px;
  }
`;

const EmpanadasList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmpanadasItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 0.4rem;
  font-family: var(--font-main);
`;

const ItemPrice = styled.span`
  font-size: 1rem;
  color: var(--color-text-light);
  display: block;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: none;
    }
  }
`;

const Quantity = styled.span`
  min-width: 36px;
  text-align: center;
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 600;
`;

const EmpanadasMenu = ({ cart, onIncrement, onDecrement, empanadasEspeciales, empanadasComunes }) => {
  const renderEmpanadasList = (empanadas) => (
    <EmpanadasList>
      {empanadas.map(empanada => (
        <EmpanadasItem key={empanada.id}>
          <ItemInfo>
            <ItemName>{empanada.gusto}</ItemName>
            <ItemPrice>${empanada.precio}</ItemPrice>
          </ItemInfo>
          <Controls>
            <QuantityButton 
              onClick={() => onDecrement(empanada.id)}
              disabled={!cart[empanada.id]}
            >
              -
            </QuantityButton>
            <Quantity>{cart[empanada.id] || 0}</Quantity>
            <QuantityButton onClick={() => onIncrement(empanada.id)}>
              +
            </QuantityButton>
          </Controls>
        </EmpanadasItem>
      ))}
    </EmpanadasList>
  );

  return (
    <Container>
      <Section>
        <SectionTitle>Empanadas Especiales</SectionTitle>
        {renderEmpanadasList(empanadasEspeciales)}
      </Section>

      <Section>
        <SectionTitle>Empanadas Comunes</SectionTitle>
        {renderEmpanadasList(empanadasComunes)}
      </Section>
    </Container>
  );
};

export default EmpanadasMenu; 