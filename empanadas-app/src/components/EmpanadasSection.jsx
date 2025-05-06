import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { endpoints } from '../config/api';

const SectionContainer = styled.section`
  padding: 6rem 2rem;
  background-color: var(--color-background);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, var(--color-primary-light) 0%, transparent 60%),
                radial-gradient(circle at bottom left, var(--color-lake) 0%, transparent 60%);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: var(--fs-h1);
  color: var(--color-text);
  margin-bottom: 3rem;
  font-family: var(--font-titles);
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: var(--fs-h2);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterTag = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${props => props.active ? 
    'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' : 
    'rgba(255, 255, 255, 0.1)'};
  color: var(--color-text);
  font-family: var(--font-decorative);
  font-size: var(--fs-body);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, ${props => props.active ? '0.2' : '0.1'});
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 3rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
  font-size: var(--fs-body);
  font-family: var(--font-main);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-family: var(--font-main);
    font-weight: 300;
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  opacity: 0.5;
`;

const EmpanadasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const EmpanadaCard = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2),
                0 0 20px rgba(var(--color-primary-rgb), 0.2);
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.07);

    img {
      transform: scale(1.1);
    }
  }
`;

const EmpanadaImageContainer = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  flex-shrink: 0;
`;

const EmpanadaImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const EmpanadaInfo = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  ${EmpanadaCard}:hover & {
    background: rgba(0, 0, 0, 0.6);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

const EmpanadaName = styled.h3`
  font-size: var(--fs-h3);
  color: var(--color-text);
  font-family: var(--font-decorative);
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  letter-spacing: 0.5px;
`;

const EmpanadaDescription = styled.p`
  color: var(--color-text-light);
  font-size: var(--fs-body);
  font-family: var(--font-main);
  line-height: 1.5;
  opacity: 0.9;
  margin: 0;
  font-weight: 300;
`;

const CategoryTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: var(--color-text);
  border-radius: 15px;
  font-size: var(--fs-small);
  font-family: var(--font-main);
  font-weight: 500;
  backdrop-filter: blur(5px);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const BACKEND_URL = 'http://localhost:5000';

const EmpanadasSection = () => {
  const [empanadas, setEmpanadas] = useState([]);
  const [filteredEmpanadas, setFilteredEmpanadas] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener todas las empanadas de la API
  useEffect(() => {
    const fetchEmpanadas = async () => {
      try {
        const response = await fetch(endpoints.empanadas);
        if (!response.ok) {
          throw new Error('Error al cargar las empanadas');
        }
        const data = await response.json();
        setEmpanadas(data);
        setFilteredEmpanadas(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmpanadas();
  }, []);

  // Filtrar empanadas cuando cambia el filtro o el término de búsqueda
  useEffect(() => {
    let filtered = empanadas;

    // Aplicar filtro de categoría
    if (activeFilter !== 'Todas') {
      filtered = filtered.filter(empanada => empanada.categoria === activeFilter);
    }

    // Aplicar búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(empanada =>
        empanada.nombre.toLowerCase().includes(searchLower) ||
        empanada.descripcion.toLowerCase().includes(searchLower)
      );
    }

    setFilteredEmpanadas(filtered);
  }, [activeFilter, searchTerm, empanadas]);

  // Obtener categorías únicas para los filtros
  const categories = ['Todas', ...new Set(empanadas.map(emp => emp.categoria))];

  if (loading) {
    return (
      <SectionContainer>
        <ContentWrapper>
          <SectionTitle>Cargando empanadas...</SectionTitle>
        </ContentWrapper>
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <SectionContainer>
        <ContentWrapper>
          <SectionTitle>Error: {error}</SectionTitle>
        </ContentWrapper>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="empanadas">
      <ContentWrapper>
        <SectionTitle>Nuestras Empanadas</SectionTitle>
        
        <FiltersContainer>
          {categories.map(category => (
            <FilterTag
              key={category}
              active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </FilterTag>
          ))}
        </FiltersContainer>

        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Buscar empanadas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <EmpanadasGrid>
          {filteredEmpanadas.map(empanada => (
            <EmpanadaCard key={empanada.id}>
              <EmpanadaImageContainer>
                <EmpanadaImage
                  src={empanada.imagen && empanada.imagen.startsWith('/uploads/')
                    ? `${BACKEND_URL}${empanada.imagen}`
                    : '/images/default-empanada.jpg'}
                  alt={empanada.gusto}
                />
              </EmpanadaImageContainer>
              <EmpanadaInfo>
                <EmpanadaName>{empanada.gusto}</EmpanadaName>
                <EmpanadaDescription>{empanada.descripcion}</EmpanadaDescription>
                {empanada.esEspecial && <span style={{marginLeft: '1rem', color: 'gold'}}>★ Especial</span>}
              </EmpanadaInfo>
            </EmpanadaCard>
          ))}
        </EmpanadasGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default EmpanadasSection; 