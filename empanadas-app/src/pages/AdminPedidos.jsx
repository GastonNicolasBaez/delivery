import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';
import jsPDF from 'jspdf';

const estados = [
  'pendiente',
  'en preparación',
  'listo',
  'entregado',
  'cancelado'
];

const comandaBtnStyle = {
  background: 'linear-gradient(135deg, #4299e1 0%, #90cdf4 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '0.7rem 1.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: 12,
  marginTop: 8,
  boxShadow: '0 2px 8px rgba(66,153,225,0.15)',
  transition: 'all 0.2s',
};

const nextBtnStyle = {
  background: 'linear-gradient(135deg, #38a169 0%, #68d391 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '0.7rem 1.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: 12,
  marginTop: 8,
  boxShadow: '0 2px 8px rgba(56,161,105,0.15)',
  transition: 'all 0.2s',
};

const cancelBtnStyle = {
  background: 'linear-gradient(135deg, #e53e3e 0%, #feb2b2 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '0.5rem 1.2rem',
  fontWeight: 600,
  fontSize: '0.95rem',
  cursor: 'pointer',
  position: 'absolute',
  top: 16,
  right: 16,
  boxShadow: '0 2px 8px rgba(229,62,62,0.15)',
  transition: 'all 0.2s',
};

const modifyBtnStyle = {
  background: 'linear-gradient(135deg, #805ad5 0%, #b794f4 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 8,
  padding: '0.6rem 1.3rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: 16,
  float: 'right',
  boxShadow: '0 2px 8px rgba(128,90,213,0.15)',
  transition: 'all 0.2s',
};

const pedidoCardStyle = {
  border: '1px solid #ccc',
  borderRadius: 8,
  padding: 16,
  display: 'flex',
  gap: '2rem',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  position: 'relative',
};

const entregadoCardStyle = {
  ...pedidoCardStyle,
  background: 'linear-gradient(135deg, #e6fffa 0%, #c6f6d5 100%)',
  border: '2px solid #38a169',
  color: '#2d3748',
};

const colStyle = {
  flex: 1,
  minWidth: 250,
};

const topBarStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 24,
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.3)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: 'white',
  borderRadius: 12,
  padding: 32,
  minWidth: 350,
  maxWidth: 500,
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
  zIndex: 1001,
  color: '#2d3748',
};

const fixedBtnStyle = {
  position: 'fixed',
  bottom: 32,
  right: 32,
  zIndex: 2000,
  background: 'linear-gradient(135deg, #2b6cb0 0%, #90cdf4 100%)',
  color: 'white',
  border: 'none',
  borderRadius: 16,
  padding: '1rem 2rem',
  fontWeight: 700,
  fontSize: '1.1rem',
  boxShadow: '0 4px 16px rgba(44, 62, 80, 0.15)',
  cursor: 'pointer',
};

const resumenModalStyle = {
  ...modalStyle,
  minWidth: 400,
  maxWidth: 700,
  color: '#2d3748',
};

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actualizando, setActualizando] = useState(null);
  const [editPedido, setEditPedido] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [empanadasDisponibles, setEmpanadasDisponibles] = useState([]);
  const [nuevaEmpanadaId, setNuevaEmpanadaId] = useState('');
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const navigate = useNavigate();

  const fetchPedidos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pedidos');
      if (!response.ok) throw new Error('Error al obtener los pedidos');
      const data = await response.json();
      setPedidos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const actualizarEstado = async (id, nuevoEstado) => {
    setActualizando(id);
    try {
      const response = await fetch(`http://localhost:5000/api/pedidos/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (!response.ok) throw new Error('Error al actualizar el estado');
      await fetchPedidos();
    } catch (err) {
      alert('Error al actualizar el estado');
    } finally {
      setActualizando(null);
    }
  };

  // Función para imprimir la comanda y cambiar a "en preparación"
  const handleImprimirComanda = async (pedido) => {
    const hora = new Date(pedido.createdAt).toLocaleTimeString();
    const comanda = `HORA: ${hora}\n` +
      pedido.Empanadas.map(emp => `- ${emp.gusto} x${emp.PedidoEmpanada.cantidad}`).join('\n');
    alert(comanda); // Aquí puedes enviar 'comanda' a la impresora térmica
    if (pedido.estado === 'pendiente') {
      await actualizarEstado(pedido.id, 'en preparación');
    }
  };

  // Botón siguiente según estado
  const renderNextButton = (pedido) => {
    if (pedido.estado === 'en preparación') {
      return (
        <button
          style={nextBtnStyle}
          disabled={actualizando === pedido.id}
          onClick={() => actualizarEstado(pedido.id, 'listo')}
        >
          Pedido Listo
        </button>
      );
    }
    if (pedido.estado === 'listo') {
      return (
        <button
          style={nextBtnStyle}
          disabled={actualizando === pedido.id}
          onClick={() => actualizarEstado(pedido.id, 'entregado')}
        >
          Pedido Entregado
        </button>
      );
    }
    return null;
  };

  // Cancelar pedido
  const handleCancelarPedido = async (pedido) => {
    if (window.confirm('¿Seguro que deseas cancelar este pedido?')) {
      await actualizarEstado(pedido.id, 'cancelado');
      alert('Pedido cancelado correctamente.');
    }
  };

  // Modal de edición
  const handleModificarPedido = async (pedido) => {
    setEditPedido(pedido);
    setEditForm({
      nombre: pedido.nombre,
      telefono: pedido.telefono,
      email: pedido.email,
      direccion: pedido.direccion,
      sucursal: pedido.sucursal,
      pisoDepto: pedido.pisoDepto,
      notas: pedido.notas,
      metodoPago: pedido.metodoPago,
      empanadas: pedido.Empanadas.map(emp => ({
        id: emp.id,
        gusto: emp.gusto,
        cantidad: emp.PedidoEmpanada.cantidad,
        precio: emp.PedidoEmpanada.precio
      }))
    });
    try {
      const response = await fetch(endpoints.empanadas);
      const data = await response.json();
      setEmpanadasDisponibles(data);
    } catch (err) {
      setEmpanadasDisponibles([]);
    }
    setNuevaEmpanadaId('');
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEmpanadaCantidadChange = (index, value) => {
    setEditForm(prev => ({
      ...prev,
      empanadas: prev.empanadas.map((emp, i) => i === index ? { ...emp, cantidad: Number(value) } : emp)
    }));
  };

  const handleGuardarEdicion = async () => {
    // Aquí deberías hacer un fetch/PUT al backend para actualizar el pedido
    alert('Funcionalidad de guardado en desarrollo. Aquí se enviarán los datos editados al backend.');
    setEditPedido(null);
    setEditForm(null);
  };

  const handleCerrarModal = () => {
    setEditPedido(null);
    setEditForm(null);
  };

  const handleAgregarEmpanada = () => {
    if (!nuevaEmpanadaId) return;
    const emp = empanadasDisponibles.find(e => String(e.id) === String(nuevaEmpanadaId));
    if (!emp) return;
    if (editForm.empanadas.some(e => e.id === emp.id)) return;
    setEditForm(prev => ({
      ...prev,
      empanadas: [...prev.empanadas, { id: emp.id, gusto: emp.gusto, cantidad: 1, precio: emp.precio }]
    }));
    setNuevaEmpanadaId('');
  };

  // Filtrar pedidos del día
  const pedidosHoy = pedidos.filter(p => {
    const hoy = new Date();
    const fechaPedido = new Date(p.createdAt);
    return hoy.toDateString() === fechaPedido.toDateString();
  });

  // Calcular resumen
  const resumenCaja = () => {
    let total = 0;
    let empanadasPorTipo = {};
    let pagos = {};
    pedidosHoy.forEach(pedido => {
      pedido.Empanadas.forEach(emp => {
        empanadasPorTipo[emp.gusto] = (empanadasPorTipo[emp.gusto] || 0) + emp.PedidoEmpanada.cantidad;
        total += emp.PedidoEmpanada.cantidad * parseFloat(emp.PedidoEmpanada.precio);
      });
      pagos[pedido.metodoPago] = (pagos[pedido.metodoPago] || 0) + 1;
    });
    return { total, empanadasPorTipo, pagos };
  };

  // Guardar como PDF (simple: imprime solo el modal)
  const handleGuardarPDF = () => {
    window.print();
  };

  if (loading) return <div>Cargando pedidos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <div style={topBarStyle}>
        <button
          style={{ ...comandaBtnStyle, background: 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)', margin: 0 }}
          onClick={() => navigate('/admin/dashboard')}
        >
          Volver al Dashboard
        </button>
      </div>
      <h1>Administración de Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No hay pedidos registrados.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {pedidos
            .slice()
            .sort((a, b) => {
              if (a.estado === 'entregado' && b.estado !== 'entregado') return 1;
              if (a.estado !== 'entregado' && b.estado === 'entregado') return -1;
              if (a.estado === 'cancelado' && b.estado !== 'cancelado') return 1;
              if (a.estado !== 'cancelado' && b.estado === 'cancelado') return -1;
              return 0;
            })
            .map(pedido => (
              pedido.estado === 'entregado' ? (
                <div key={pedido.id} style={entregadoCardStyle}>
                  <div style={colStyle}>
                    <h2>Pedido #{pedido.id} - {pedido.tipo.toUpperCase()}</h2>
                    {pedido.tipo === 'delivery' ? (
                      <p><b>Dirección:</b> {pedido.direccion} {pedido.pisoDepto && `- ${pedido.pisoDepto}`}</p>
                    ) : (
                      <p><b>Sucursal:</b> {pedido.sucursal}</p>
                    )}
                  </div>
                  <div style={{ ...colStyle, borderLeft: '1px solid #38a169', paddingLeft: 24 }}>
                    <p><b>Hora:</b> {new Date(pedido.createdAt).toLocaleTimeString()}</p>
                    <h3>Empanadas:</h3>
                    <ul>
                      {pedido.Empanadas.map(emp => (
                        <li key={emp.PedidoEmpanada.id}>
                          {emp.gusto} x{emp.PedidoEmpanada.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div key={pedido.id} style={pedidoCardStyle}>
                  {/* Botón cancelar arriba a la derecha */}
                  {pedido.estado !== 'cancelado' && pedido.estado !== 'entregado' && (
                    <button
                      style={cancelBtnStyle}
                      onClick={() => handleCancelarPedido(pedido)}
                    >
                      Cancelar pedido
                    </button>
                  )}
                  {/* Columna izquierda: datos del cliente y estado */}
                  <div style={colStyle}>
                    <h2>Pedido #{pedido.id} - {pedido.tipo.toUpperCase()}</h2>
                    <p><b>Estado:</b> {pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1)}</p>
                    <p><b>Cliente:</b> {pedido.nombre} <br />
                      <b>Tel:</b> {pedido.telefono} <br />
                      <b>Email:</b> {pedido.email}
                    </p>
                    {pedido.tipo === 'delivery' ? (
                      <p><b>Dirección:</b> {pedido.direccion} {pedido.pisoDepto && `- ${pedido.pisoDepto}`}</p>
                    ) : (
                      <p><b>Sucursal:</b> {pedido.sucursal}</p>
                    )}
                    {pedido.notas && <p><b>Notas:</b> {pedido.notas}</p>}
                    <p><b>Método de pago:</b> {pedido.metodoPago}</p>
                    <p><b>Fecha:</b> {new Date(pedido.createdAt).toLocaleString()}</p>
                  </div>
                  {/* Columna derecha: comanda y botones */}
                  <div style={{ ...colStyle, borderLeft: '1px solid #eee', paddingLeft: 24, position: 'relative' }}>
                    <p><b>Hora:</b> {new Date(pedido.createdAt).toLocaleTimeString()}</p>
                    <h3>Empanadas:</h3>
                    <ul>
                      {pedido.Empanadas.map(emp => (
                        <li key={emp.PedidoEmpanada.id}>
                          {emp.gusto} x{emp.PedidoEmpanada.cantidad} (${emp.PedidoEmpanada.precio} c/u)
                        </li>
                      ))}
                    </ul>
                    {pedido.estado === 'pendiente' && (
                      <button onClick={() => handleImprimirComanda(pedido)} style={comandaBtnStyle}>
                        Imprimir Comanda
                      </button>
                    )}
                    {renderNextButton(pedido)}
                    <button
                      style={modifyBtnStyle}
                      onClick={() => handleModificarPedido(pedido)}
                    >
                      Modificar pedido
                    </button>
                  </div>
                </div>
              )
            ))}
        </div>
      )}
      {/* Modal de edición */}
      {editPedido && editForm && (
        <div style={modalOverlayStyle} onClick={handleCerrarModal}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h2>Modificar Pedido #{editPedido.id}</h2>
            <label>Nombre:<br />
              <input type="text" name="nombre" value={editForm.nombre} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Teléfono:<br />
              <input type="text" name="telefono" value={editForm.telefono} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Email:<br />
              <input type="email" name="email" value={editForm.email} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Dirección:<br />
              <input type="text" name="direccion" value={editForm.direccion} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Piso/Depto:<br />
              <input type="text" name="pisoDepto" value={editForm.pisoDepto} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Notas:<br />
              <input type="text" name="notas" value={editForm.notas} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <label>Método de pago:<br />
              <input type="text" name="metodoPago" value={editForm.metodoPago} onChange={handleEditFormChange} style={{ width: '100%', marginBottom: 8 }} />
            </label>
            <h3>Empanadas:</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <select value={nuevaEmpanadaId} onChange={e => setNuevaEmpanadaId(e.target.value)} style={{ flex: 1, color: '#2d3748' }}>
                <option value="">Agregar empanada...</option>
                {empanadasDisponibles.filter(emp => !editForm.empanadas.some(e => e.id === emp.id)).map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.gusto} (${emp.precio})</option>
                ))}
              </select>
              <button type="button" onClick={handleAgregarEmpanada} style={{ ...comandaBtnStyle, padding: '0.5rem 1rem', margin: 0 }}>Agregar</button>
            </div>
            {editForm.empanadas.map((emp, i) => (
              <div key={emp.id} style={{ marginBottom: 8, color: '#2d3748' }}>
                <span>{emp.gusto}:</span>
                <input
                  type="number"
                  min={0}
                  value={emp.cantidad}
                  onChange={e => handleEmpanadaCantidadChange(i, e.target.value)}
                  style={{ width: 60, marginLeft: 8 }}
                />
              </div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={handleCerrarModal} style={{ ...cancelBtnStyle, position: 'static', background: '#eee', color: '#333' }}>Cancelar</button>
              <button onClick={handleGuardarEdicion} style={comandaBtnStyle}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
      {/* Botón fijo para cerrar turno y hacer caja */}
      <button style={fixedBtnStyle} onClick={() => setMostrarResumen(true)}>
        Cerrar turno y hacer caja
      </button>
      {/* Modal de resumen de caja */}
      {mostrarResumen && (
        <div style={modalOverlayStyle} onClick={() => setMostrarResumen(false)}>
          <div style={resumenModalStyle} onClick={e => e.stopPropagation()}>
            <h2>Resumen de Caja del Día</h2>
            <p><b>Pedidos del día:</b> {pedidosHoy.length}</p>
            <p><b>Total vendido:</b> ${resumenCaja().total.toFixed(2)}</p>
            <h3>Empanadas vendidas:</h3>
            <ul>
              {Object.entries(resumenCaja().empanadasPorTipo).map(([gusto, cant]) => (
                <li key={gusto}>{gusto}: {cant}</li>
              ))}
            </ul>
            <h3>Métodos de pago:</h3>
            <ul>
              {Object.entries(resumenCaja().pagos).map(([metodo, cant]) => (
                <li key={metodo}>{metodo}: {cant}</li>
              ))}
            </ul>
            <h3>Pedidos del día:</h3>
            <ul>
              {pedidosHoy.map(p => (
                <li key={p.id}>#{p.id} - {p.nombre} - {p.tipo} - ${p.Empanadas.reduce((acc, emp) => acc + emp.PedidoEmpanada.cantidad * parseFloat(emp.PedidoEmpanada.precio), 0).toFixed(2)}</li>
              ))}
            </ul>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setMostrarResumen(false)} style={{ ...cancelBtnStyle, position: 'static', background: '#eee', color: '#333' }}>Cerrar</button>
              <button onClick={handleGuardarPDF} style={comandaBtnStyle}>Guardar como PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPedidos; 