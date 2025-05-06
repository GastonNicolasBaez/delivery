import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg,rgb(134, 144, 196) 0%,rgb(93, 105, 207) 100%);
`;

const LoginForm = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(120deg, #2d3748, #4a5568);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(66, 153, 225, 0.2);
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 153, 225, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  text-align: center;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem;
  background: rgba(255, 68, 68, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: '⚠️';
  }
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías implementar la validación real con tu backend
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Acceso Administrador</Title>
        <InputGroup>
          <Label htmlFor="username">Usuario</Label>
          <Input
            type="text"
            id="username"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Ingresar</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default AdminLogin; 