import axios from 'axios';
import { Empanada, Pedido } from '../types';
import { endpoints } from '../constants/Api';

// Configuración de Axios
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const EmpanadasService = {
  // Obtener todas las empanadas
  getAll: async (): Promise<Empanada[]> => {
    try {
      const response = await api.get(endpoints.empanadas);
      return response.data;
    } catch (error) {
      console.error('Error fetching empanadas:', error);
      throw error;
    }
  },
  
  // Obtener una empanada específica
  getById: async (id: number): Promise<Empanada> => {
    try {
      const response = await api.get(`${endpoints.empanadas}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching empanada with id ${id}:`, error);
      throw error;
    }
  }
};

export const PedidosService = {
  // Crear un nuevo pedido
  create: async (pedido: Pedido): Promise<Pedido> => {
    try {
      const response = await api.post(endpoints.pedidos, pedido);
      return response.data;
    } catch (error) {
      console.error('Error creating pedido:', error);
      throw error;
    }
  },
  
  // Obtener todos los pedidos (usualmente solo para admin)
  getAll: async (): Promise<Pedido[]> => {
    try {
      const response = await api.get(endpoints.pedidos);
      return response.data;
    } catch (error) {
      console.error('Error fetching pedidos:', error);
      throw error;
    }
  },
  
  // Obtener un pedido específico
  getById: async (id: number): Promise<Pedido> => {
    try {
      const response = await api.get(`${endpoints.pedidos}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pedido with id ${id}:`, error);
      throw error;
    }
  },
  
  // Actualizar el estado de un pedido
  updateEstado: async (id: number, estado: string): Promise<Pedido> => {
    try {
      const response = await api.put(`${endpoints.pedidos}/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      console.error(`Error updating estado for pedido ${id}:`, error);
      throw error;
    }
  },
  
  // Actualizar un pedido completo
  update: async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
    try {
      const response = await api.put(`${endpoints.pedidos}/${id}`, pedido);
      return response.data;
    } catch (error) {
      console.error(`Error updating pedido ${id}:`, error);
      throw error;
    }
  }
};

export const AuthService = {
  // Login de administrador
  adminLogin: async (username: string, password: string): Promise<{token: string}> => {
    try {
      const response = await api.post(endpoints.admin.login, { username, password });
      return response.data;
    } catch (error) {
      console.error('Error in admin login:', error);
      throw error;
    }
  }
}; 