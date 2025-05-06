import React from 'react';
import styled from 'styled-components';

const FloatingButton = styled.a`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 9999;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #25D366;
    border-radius: 50%;
    opacity: 0.4;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    50% {
      transform: scale(1.2);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }

  i {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 1.5rem;
    left: 1.5rem;

    i {
      font-size: 1.7rem;
    }
  }
`;

const WhatsAppButton = () => {
  const phoneNumber = '+5491112345678'; // Reemplazar con el número real
  const message = 'Hola! Quisiera hacer un pedido de empanadas.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <FloatingButton 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </FloatingButton>
  );
};

export default WhatsAppButton; 