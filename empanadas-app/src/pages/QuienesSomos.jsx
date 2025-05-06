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
`;

const StorySection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const StoryText = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const ValuesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ValueCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

const TeamSection = styled.section`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const MemberName = styled.h4`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const QuienesSomos = () => {
  return (
    <PageContainer>
      <Title>Quiénes Somos</Title>
      <ContentContainer>
        <StorySection>
          <SectionTitle>Nuestra Historia</SectionTitle>
          <StoryText>
            Fundada en 2010, nuestra empresa nació con la misión de llevar las mejores empanadas 
            a cada rincón de la ciudad. Lo que comenzó como un pequeño local familiar, hoy se ha 
            convertido en una cadena reconocida por la calidad y autenticidad de sus productos.
          </StoryText>
          <StoryText>
            Nuestro secreto está en la combinación perfecta entre recetas tradicionales y 
            técnicas modernas de producción, manteniendo siempre la esencia de la cocina 
            casera que nos caracteriza.
          </StoryText>
        </StorySection>

        <ValuesSection>
          <ValueCard>
            <ValueIcon>🌟</ValueIcon>
            <ValueTitle>Calidad</ValueTitle>
            <ValueDescription>
              Utilizamos ingredientes frescos y de primera calidad para garantizar 
              el mejor sabor en cada empanada.
            </ValueDescription>
          </ValueCard>
          <ValueCard>
            <ValueIcon>❤️</ValueIcon>
            <ValueTitle>Pasión</ValueTitle>
            <ValueDescription>
              Amamos lo que hacemos y eso se refleja en cada empanada que preparamos 
              con dedicación y cariño.
            </ValueDescription>
          </ValueCard>
          <ValueCard>
            <ValueIcon>🤝</ValueIcon>
            <ValueTitle>Compromiso</ValueTitle>
            <ValueDescription>
              Nos comprometemos con nuestros clientes a ofrecer siempre el mejor 
              servicio y la mejor experiencia.
            </ValueDescription>
          </ValueCard>
        </ValuesSection>

        <TeamSection>
          <SectionTitle>Nuestro Equipo</SectionTitle>
          <TeamGrid>
            <TeamMember>
              <MemberImage src="/team/chef1.jpg" alt="Chef Principal" />
              <MemberName>Juan Pérez</MemberName>
              <MemberRole>Chef Principal</MemberRole>
            </TeamMember>
            <TeamMember>
              <MemberImage src="/team/chef2.jpg" alt="Chef Especialista" />
              <MemberName>María González</MemberName>
              <MemberRole>Chef Especialista</MemberRole>
            </TeamMember>
            <TeamMember>
              <MemberImage src="/team/manager.jpg" alt="Gerente" />
              <MemberName>Carlos Rodríguez</MemberName>
              <MemberRole>Gerente General</MemberRole>
            </TeamMember>
          </TeamGrid>
        </TeamSection>
      </ContentContainer>
    </PageContainer>
  );
};

export default QuienesSomos; 