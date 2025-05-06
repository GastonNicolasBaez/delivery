import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import MenuCart from '../components/MenuCart';
import EmpanadasMenu from '../components/EmpanadasMenu';
import { endpoints } from '../config/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
  position: relative;
`;

const ContentContainer = styled.div`
  padding-top: 120px;
  padding-bottom: 4rem;
  padding-right: 350px;
  padding-left: 20px;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding-right: 320px;
  }
  
  @media (max-width: 768px) {
    padding: 80px 15px 30px;
  }
`;

const FormContainer = styled.div`
  background: transparent;
  width: 100%;
  max-width: 100%;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  font-family: var(--font-main);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormSection = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.9;

  &::before {
    content: '${props => props.icon}';
    font-size: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  color: var(--color-text-light);
  font-size: 0.8rem;
  opacity: 0.8;
`;

const Input = styled.input`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--color-text);
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--color-text);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.08);
  }
  
  option {
    background: var(--color-background);
    color: var(--color-text);
    padding: 0.5rem;
  }
`;

const TimeSlotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  gap: 0.5rem;
`;

const TimeSlot = styled.button`
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  background: ${props => props.selected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)'};
  color: var(--color-text-light);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.selected ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.08)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;

  ${props => props.primary ? `
    background: var(--color-primary);
    color: var(--color-text-light);
    
    &:hover {
      background: var(--color-primary-light);
    }
  ` : `
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text-light);
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  `}
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  max-width: 100%;
`;

const PaymentOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${props => props.selected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.selected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  color: var(--color-text-light);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background: ${props => props.selected ? 'var(--color-primary-light)' : 'rgba(255, 255, 255, 0.08)'};
  }

  img {
    height: 20px;
    width: auto;
  }

  i {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem;
    
    img {
      height: 16px;
    }
    
    i {
      font-size: 1rem;
    }
  }
`;

const Pickup = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const carritoGuardado = localStorage.getItem('carritoEmpanadas');
    return carritoGuardado ? JSON.parse(carritoGuardado) : {};
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    timeSlot: '',
    paymentMethod: ''
  });
  const [empanadasEspeciales, setEmpanadasEspeciales] = useState([]);
  const [empanadasComunes, setEmpanadasComunes] = useState([]);
  const [loading, setLoading] = useState(true);

  const locations = [
    { id: '1', name: 'Sucursal Centro' },
    { id: '2', name: 'Sucursal Norte' },
    { id: '3', name: 'Sucursal Sur' }
  ];

  const timeSlots = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00'
  ];

  useEffect(() => {
    const fetchEmpanadas = async () => {
      try {
        const response = await fetch(endpoints.empanadas);
        const data = await response.json();
        setEmpanadasEspeciales(data.filter(e => e.esEspecial));
        setEmpanadasComunes(data.filter(e => !e.esEspecial));
      } finally {
        setLoading(false);
      }
    };
    fetchEmpanadas();
  }, []);

  useEffect(() => {
    localStorage.setItem('carritoEmpanadas', JSON.stringify(cart));
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIncrement = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrement = (id) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (!newCart[id]) return newCart;
      
      if (newCart[id] === 1) {
        delete newCart[id];
      } else {
        newCart[id] = newCart[id] - 1;
      }
      return newCart;
    });
  };

  const handleTimeSlotSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      timeSlot: time
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el array de empanadas para el pedido
    const empanadasPedido = [
      ...empanadasEspeciales,
      ...empanadasComunes
    ]
      .filter(emp => cart[emp.id]) // Solo las que están en el carrito
      .map(emp => ({
        id: emp.id,
        cantidad: cart[emp.id],
        precio: emp.precio
      }));

    // Buscar el nombre de la sucursal seleccionada
    const sucursalSeleccionada = locations.find(loc => loc.id === formData.location)?.name || "";

    // Construir el objeto del pedido
    const pedido = {
      nombre: formData.name,
      telefono: formData.phone,
      email: formData.email,
      direccion: "", // Pickup no tiene dirección
      sucursal: sucursalSeleccionada,
      pisoDepto: "", // No aplica para pickup
      notas: formData.notes,
      tipo: "pickup",
      metodoPago: formData.paymentMethod,
      empanadas: empanadasPedido
    };

    try {
      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      });

      if (!response.ok) {
        throw new Error('Error al enviar el pedido');
      }

      const data = await response.json();
      alert('¡Pedido realizado con éxito! N°: ' + data.pedidoId);
      // Aquí puedes limpiar el carrito, el formulario, o redirigir al usuario
    } catch (error) {
      alert('Hubo un error al enviar el pedido');
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate('/order-type');
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <PageContainer>
      <Banner />
      <ContentContainer>
        <EmpanadasMenu 
          cart={cart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          empanadasEspeciales={empanadasEspeciales}
          empanadasComunes={empanadasComunes}
        />
        <MenuCart 
          cart={cart}
          empanadasEspeciales={empanadasEspeciales}
          empanadasComunes={empanadasComunes}
        >
          <FormContainer>
            <Title>Datos para Retirar</Title>
            <Form onSubmit={handleSubmit}>
              <FormSection>
                <SectionTitle icon="👤">Información Personal</SectionTitle>
                <InputGroup>
                  <Label htmlFor="name">Nombre y Apellido</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa tu nombre completo"
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Ej: 11-1234-5678"
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </InputGroup>
              </FormSection>

              <FormSection>
                <SectionTitle icon="🏪">Seleccionar Sucursal</SectionTitle>
                <InputGroup>
                  <Label htmlFor="location">Sucursal para retirar</Label>
                  <Select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar sucursal</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </Select>
                </InputGroup>
              </FormSection>

              <FormSection>
                <SectionTitle icon="⏰">Horario de Retiro</SectionTitle>
                <TimeSlotContainer>
                  {timeSlots.map(time => (
                    <TimeSlot
                      key={time}
                      type="button"
                      selected={formData.timeSlot === time}
                      onClick={() => handleTimeSlotSelect(time)}
                    >
                      {time}
                    </TimeSlot>
                  ))}
                </TimeSlotContainer>
              </FormSection>

              <FormSection>
                <SectionTitle icon="💳">Método de Pago</SectionTitle>
                <PaymentOptions>
                  <PaymentOption
                    selected={formData.paymentMethod === 'mercadopago'}
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'mercadopago' } })}
                  >
                    <img src="/mercadopago-logo.png" alt="" />
                    MercadoPago
                  </PaymentOption>
                  <PaymentOption
                    selected={formData.paymentMethod === 'efectivo'}
                    onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'efectivo' } })}
                  >
                    <i className="fas fa-money-bill-wave"></i>
                    Efectivo
                  </PaymentOption>
                </PaymentOptions>
              </FormSection>

              <Button 
                type="submit" 
                primary 
                disabled={!formData.paymentMethod}
                style={{ width: '100%' }}
              >
                Proceder al Pago
              </Button>
            </Form>
          </FormContainer>
        </MenuCart>
      </ContentContainer>
    </PageContainer>
  );
};

export default Pickup; 