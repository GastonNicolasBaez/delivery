import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 100px;
  width: 350px;
  height: calc(100vh - 100px);
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;

  @media (max-width: 1200px) {
    width: 320px;
  }

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    top: 0;
    border-left: none;
  }
`;

const ScrollContainer = styled.div`
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: 3px;
    
    &:hover {
      background: var(--color-primary-light);
    }
  }
`;

const CartTitle = styled.h2`
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 0.5rem;
  font-family: var(--font-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-light);
  padding: 0.4rem 0.6rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuCart = ({ cart, empanadasEspeciales, empanadasComunes, children }) => {
  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const empanada = [...empanadasEspeciales, ...empanadasComunes].find(e => String(e.id) === String(id));
      if (!empanada) return total;
      return total + (empanada.precio * quantity);
    }, 0);
  };

  return (
    <Container>
      <ScrollContainer>
        <div>
          <CartTitle>Tu Pedido</CartTitle>
          <CartItems>
            {Object.entries(cart).map(([id, quantity]) => {
              const empanada = [...empanadasEspeciales, ...empanadasComunes].find(e => String(e.id) === String(id));
              if (!empanada) return null;
              return (
                <CartItem key={id}>
                  <span>{empanada.gusto} x{quantity}</span>
                  <span>${empanada.precio * quantity}</span>
                </CartItem>
              );
            })}
          </CartItems>
          <Total>
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </Total>
        </div>
        <FormSection>
          {children}
        </FormSection>
      </ScrollContainer>
    </Container>
  );
};

export default MenuCart; 