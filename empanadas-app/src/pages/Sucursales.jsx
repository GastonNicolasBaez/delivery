import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 2rem 4rem;
  background-color:rgb(26, 27, 71);
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

const SucursalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SucursalCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SucursalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SucursalInfo = styled.div`
  padding: 1.5rem;
`;

const SucursalName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const SucursalAddress = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const SucursalPhone = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const SucursalHours = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Sucursales = () => {
  const sucursales = [
    {
      id: 1,
      name: "Sucursal Centro",
      address: "Av. Corrientes 1234, CABA",
      phone: "011-1234-5678",
      hours: "Lunes a Domingo: 10:00 - 23:00",
      image: "/sucursales/centro.jpg"
    },
    {
      id: 2,
      name: "Sucursal Molino",
      address: "Av. Rivadavia 5678, CABA",
      phone: "011-8765-4321",
      hours: "Lunes a Domingo: 10:00 - 23:00",
      image: "/sucursales/molino.jpg"
    }
  ];

  return (
    <PageContainer>
      <Title>Nuestras Sucursales</Title>
      <SucursalesGrid>
        {sucursales.map(sucursal => (
          <SucursalCard key={sucursal.id}>
            <SucursalImage src={sucursal.image} alt={sucursal.name} />
            <SucursalInfo>
              <SucursalName>{sucursal.name}</SucursalName>
              <SucursalAddress>{sucursal.address}</SucursalAddress>
              <SucursalPhone>Tel: {sucursal.phone}</SucursalPhone>
              <SucursalHours>{sucursal.hours}</SucursalHours>
            </SucursalInfo>
          </SucursalCard>
        ))}
      </SucursalesGrid>
    </PageContainer>
  );
};

export default Sucursales; 