import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 6rem 2rem 4rem;
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

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #fcdada;
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
    background-color:#f39797;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const SubmitButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  
  &:hover {
    background-color: #ff5252;
  }
`;

const ContactInfo = styled.div`
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

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
  color: #ff6b6b;
  margin-right: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  color: #666;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Form data:', formData);
  };

  return (
    <PageContainer>
      <Title>Contacto</Title>
      <ContentContainer>
        <ContactForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nombre</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">Asunto</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Mensaje</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Enviar Mensaje</SubmitButton>
        </ContactForm>

        <ContactInfo>
          <InfoTitle>Información de Contacto</InfoTitle>
          <InfoItem>
            <InfoIcon>📍</InfoIcon>
            <InfoText>Av. Corrientes 1234, CABA</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>📞</InfoIcon>
            <InfoText>011-1234-5678</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>✉️</InfoIcon>
            <InfoText>info@empanadas.com</InfoText>
          </InfoItem>
          <InfoItem>
            <InfoIcon>⏰</InfoIcon>
            <InfoText>Lunes a Domingo: 10:00 - 23:00</InfoText>
          </InfoItem>

          <InfoTitle style={{ marginTop: '2rem' }}>Síguenos</InfoTitle>
          <SocialLinks>
            <SocialLink href="#" target="_blank">📱</SocialLink>
            <SocialLink href="#" target="_blank">📸</SocialLink>
            <SocialLink href="#" target="_blank">📘</SocialLink>
            <SocialLink href="#" target="_blank">🐦</SocialLink>
          </SocialLinks>
        </ContactInfo>
      </ContentContainer>
    </PageContainer>
  );
};

export default Contacto; 