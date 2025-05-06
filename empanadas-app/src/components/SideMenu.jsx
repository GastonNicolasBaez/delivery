import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-300px'};
  width: 300px;
  height: 100vh;
  background-color: var(--color-secondary);
  padding: 2rem;
  z-index: 1200;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const MenuItem = styled(Link)`
  color: var(--color-text-light);
  text-decoration: none;
  font-family: var(--font-main);
  font-size: 1.2rem;
  letter-spacing: 2px;
  padding: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

const SideMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <MenuOverlay isOpen={isOpen} onClick={onClose} />
      <MenuContainer isOpen={isOpen}>
        <CloseButton onClick={onClose}>
          <i className="fas fa-times"></i>
        </CloseButton>
        <MenuItem to="/" onClick={onClose}>INICIO</MenuItem>
        <MenuItem to="/" onClick={(e) => {
          e.preventDefault();
          onClose();
          document.getElementById('empanadas-section')?.scrollIntoView({ behavior: 'smooth' });
        }}>SABORES</MenuItem>
        <MenuItem to="/sucursales" onClick={onClose}>SUCURSALES</MenuItem>
        <MenuItem to="/franquicias" onClick={onClose}>FRANQUICIAS</MenuItem>
        <MenuItem to="/contacto" onClick={onClose}>CONTACTO</MenuItem>
      </MenuContainer>
    </>
  );
};

export default SideMenu; 