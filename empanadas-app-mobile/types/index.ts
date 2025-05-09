export interface Empanada {
  id: number;
  gusto: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  categoria: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PedidoEmpanada {
  id?: number;
  pedidoId?: number;
  empanadaId: number;
  cantidad: number;
  precio: number;
}

export interface CartItem {
  id: number;
  gusto: string;
  cantidad: number;
  precio: number;
  categoria?: string;
}

export type PedidoTipo = 'delivery' | 'pickup';

export type PedidoEstado = 'pendiente' | 'en preparación' | 'listo' | 'entregado' | 'cancelado';

export interface Pedido {
  id?: number;
  nombre: string;
  telefono: string;
  email: string;
  direccion?: string;
  sucursal?: string;
  pisoDepto?: string;
  notas?: string;
  tipo: PedidoTipo;
  metodoPago: string;
  estado?: PedidoEstado;
  createdAt?: string;
  Empanadas?: Array<Empanada & { PedidoEmpanada: PedidoEmpanada }>;
  empanadas?: PedidoEmpanada[];
} 