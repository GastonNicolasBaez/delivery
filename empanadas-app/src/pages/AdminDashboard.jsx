import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9fe 0%, #ffffff 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: #2d3748;
  font-weight: 700;
  background: linear-gradient(120deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #ff4444 0%, #ff1111 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 68, 68, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const MenuItem = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(66, 153, 225, 0.1) 0%, rgba(99, 179, 237, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 1;
    }
  }

  h2 {
    margin: 0 0 1rem 0;
    color: #2d3748;
    font-size: 1.5rem;
    font-weight: 700;
    position: relative;
  }

  p {
    color: #718096;
    margin: 0;
    line-height: 1.6;
    font-size: 1.1rem;
    position: relative;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #4299e1;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/dashboard');
  };

  const navigateToEmpanadas = () => {
    navigate('/admin/empanadas');
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Panel de Administración</Title>
        <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
      </Header>

      <MenuGrid>
        <MenuItem onClick={navigateToEmpanadas}>
          <IconWrapper>🥟</IconWrapper>
          <h2>Gestionar Empanadas</h2>
          <p>Agregar, editar o eliminar empanadas del menú</p>
        </MenuItem>
        
        <MenuItem>
          <IconWrapper>🏪</IconWrapper>
          <h2>Gestionar Sucursales</h2>
          <p>Administrar información de las sucursales</p>
        </MenuItem>

        <MenuItem>
          <IconWrapper>🛍️</IconWrapper>
          <h2>Pedidos Online</h2>
          <p>Ver y gestionar pedidos realizados</p>
        </MenuItem>

        <MenuItem>
          <IconWrapper>📊</IconWrapper>
          <h2>Estadísticas</h2>
          <p>Ver reportes y análisis de ventas</p>
        </MenuItem>
      </MenuGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard; 