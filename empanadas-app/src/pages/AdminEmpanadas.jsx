import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { endpoints } from '../config/api';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--color-background);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  color: var(--color-text);
  font-family: var(--font-main);
  margin: 0;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-main);

  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: var(--color-text-light);
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  overflow: hidden;
`;
const Th = styled.th`
  background: rgba(255,255,255,0.08);
  color: var(--color-text);
  font-family: var(--font-main);
  padding: 0.75rem;
  text-align: left;
`;
const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  vertical-align: middle;
`;
const ImgPreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  background: #eee;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--color-text);
  font-family: var(--font-main);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--color-text);
  min-height: 100px;
  resize: vertical;
  font-family: var(--font-main);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled(Button)`
  flex: 1;
  padding: 0.75rem;
  font-size: 0.9rem;

  &:last-child {
    background-color: var(--color-error);
    
    &:hover {
      background-color: var(--color-error-dark);
    }
  }
`;

const MAX_IMAGE_SIZE_MB = 5;
const BACKEND_URL = 'http://localhost:5000';

const AdminEmpanadas = () => {
  const navigate = useNavigate();
  const [empanadas, setEmpanadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [newEmpanada, setNewEmpanada] = useState({
    gusto: '', descripcion: '', cantidadEnStock: '', esEspecial: false, imagen: '', precio: ''
  });
  const [newImageFile, setNewImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState({});
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('adminToken');
    if (!isAdmin) { navigate('/admin/login'); return; }
    fetchEmpanadas();
  }, [navigate]);

  const fetchEmpanadas = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoints.empanadas);
      if (!response.ok) throw new Error('Error al cargar las empanadas');
      const data = await response.json();
      setEmpanadas(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 30 * 1024 * 1024) {
      setFormError('La imagen no puede superar los 30MB.');
      return;
    }
    setFormError('');
    setNewImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setNewEmpanada(prev => ({ ...prev, imagen: ev.target.result }));
    reader.readAsDataURL(file);
  };
  const handleCreate = async () => {
    if (!newEmpanada.gusto.trim() || !newEmpanada.descripcion.trim() || newEmpanada.cantidadEnStock === '' || isNaN(newEmpanada.cantidadEnStock) || newEmpanada.precio === '' || isNaN(newEmpanada.precio)) {
      setFormError('Gusto, descripción, cantidad en stock y precio son obligatorios.');
      return;
    }
    setFormError('');
    try {
      const response = await fetch(endpoints.empanadas, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gusto: newEmpanada.gusto,
          descripcion: newEmpanada.descripcion,
          cantidadEnStock: parseInt(newEmpanada.cantidadEnStock),
          esEspecial: newEmpanada.esEspecial,
          precio: parseFloat(newEmpanada.precio)
        })
      });
      if (!response.ok) throw new Error('Error al crear la empanada');
      const data = await response.json();
      if (newImageFile) {
        const formData = new FormData();
        formData.append('imagen', newImageFile);
        const imgRes = await fetch(`${endpoints.empanadas}/${data.id}/imagen`, { method: 'POST', body: formData });
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          data.imagen = imgData.imagen;
        }
      }
      setEmpanadas(prev => [{ ...data }, ...prev]);
      setNewEmpanada({ gusto: '', descripcion: '', cantidadEnStock: '', esEspecial: false, imagen: '', precio: '' });
      setNewImageFile(null);
    } catch (err) { setError(err.message); }
  };

  const startEdit = (emp) => {
    setEditingId(emp.id);
    setEditRow({ ...emp });
    setEditImageFile({});
  };
  const handleEditImageChange = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditImageFile(prev => ({ ...prev, [id]: file }));
    const reader = new FileReader();
    reader.onload = (ev) => setEditRow(prev => ({ ...prev, imagen: ev.target.result }));
    reader.readAsDataURL(file);
  };
  const handleSave = async (id) => {
    if (!editRow.gusto.trim() || !editRow.descripcion.trim() || editRow.cantidadEnStock === '' || isNaN(editRow.cantidadEnStock) || editRow.precio === '' || isNaN(editRow.precio)) {
      setFormError('Gusto, descripción, cantidad en stock y precio son obligatorios.');
      return;
    }
    setFormError('');
    try {
      const response = await fetch(`${endpoints.empanadas}/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gusto: editRow.gusto,
          descripcion: editRow.descripcion,
          cantidadEnStock: parseInt(editRow.cantidadEnStock),
          esEspecial: editRow.esEspecial,
          precio: parseFloat(editRow.precio)
        })
      });
      if (!response.ok) throw new Error('Error al actualizar la empanada');
      let data = await response.json();
      if (editImageFile[id]) {
        const formData = new FormData();
        formData.append('imagen', editImageFile[id]);
        const imgRes = await fetch(`${endpoints.empanadas}/${id}/imagen`, { method: 'POST', body: formData });
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          data.imagen = imgData.imagen;
        }
      }
      setEmpanadas(empanadas.map(emp => emp.id === id ? { ...data } : emp));
      setEditingId(null);
      setEditRow({});
      setEditImageFile({});
    } catch (err) { setError(err.message); }
  };
  const handleCancel = () => { setEditingId(null); setEditRow({}); setEditImageFile({}); };
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta empanada?')) return;
    try {
      const response = await fetch(`${endpoints.empanadas}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar la empanada');
      setEmpanadas(empanadas.filter(emp => emp.id !== id));
    } catch (err) { setError(err.message); }
  };
  const handleLogout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <AdminContainer>
      <Header>
        <Title>Administrar Empanadas</Title>
        <div>
          <Button onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
      </Header>
      {formError && (
        <div style={{ color: 'var(--color-error)', marginBottom: '1rem', fontWeight: 'bold' }}>{formError}</div>
      )}
      <Table>
        <thead>
          <tr>
            <Th>Imagen</Th>
            <Th>Gusto</Th>
            <Th>Descripción</Th>
            <Th>Cantidad en Stock</Th>
            <Th>¿Especial?</Th>
            <Th>Precio</Th>
            <Th>Acciones</Th>
          </tr>
        </thead>
        <tbody>
          {/* Fila para nueva empanada */}
          <tr>
            <Td>
              <label>
                <ImgPreview src={
                  newEmpanada.imagen && newEmpanada.imagen.startsWith('/uploads/')
                    ? `${BACKEND_URL}${newEmpanada.imagen}`
                    : '/placeholder.jpg'
                } alt="Nueva" />
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleNewImageChange} />
              </label>
            </Td>
            <Td><Input value={newEmpanada.gusto} onChange={e => setNewEmpanada({ ...newEmpanada, gusto: e.target.value })} placeholder="Gusto" /></Td>
            <Td><TextArea value={newEmpanada.descripcion} onChange={e => setNewEmpanada({ ...newEmpanada, descripcion: e.target.value })} placeholder="Descripción" /></Td>
            <Td><Input type="number" value={newEmpanada.cantidadEnStock} onChange={e => setNewEmpanada({ ...newEmpanada, cantidadEnStock: e.target.value })} placeholder="Cantidad en Stock" /></Td>
            <Td><input type="checkbox" checked={newEmpanada.esEspecial} onChange={e => setNewEmpanada({ ...newEmpanada, esEspecial: e.target.checked })} /></Td>
            <Td><Input type="number" value={newEmpanada.precio} onChange={e => setNewEmpanada({ ...newEmpanada, precio: e.target.value })} placeholder="Precio" /></Td>
            <Td>
              <Button onClick={handleCreate}>Agregar</Button>
            </Td>
          </tr>
          {/* Filas de empanadas existentes */}
          {empanadas.map(empanada => (
            <tr key={empanada.id}>
              <Td>
                <label>
                  <ImgPreview src={
                    editingId === empanada.id
                      ? (editRow.imagen && editRow.imagen.startsWith('/uploads/')
                          ? `${BACKEND_URL}${editRow.imagen}`
                          : (editRow.imagen || '/placeholder.jpg'))
                      : (empanada.imagen && empanada.imagen.startsWith('/uploads/')
                          ? `${BACKEND_URL}${empanada.imagen}`
                          : (empanada.imagen || '/placeholder.jpg'))
                  } alt={empanada.gusto} />
                  {editingId === empanada.id && (
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleEditImageChange(e, empanada.id)} />
                  )}
                </label>
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <Input value={editRow.gusto} onChange={e => setEditRow({ ...editRow, gusto: e.target.value })} />
                ) : empanada.gusto}
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <TextArea value={editRow.descripcion} onChange={e => setEditRow({ ...editRow, descripcion: e.target.value })} />
                ) : empanada.descripcion}
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <Input type="number" value={editRow.cantidadEnStock} onChange={e => setEditRow({ ...editRow, cantidadEnStock: e.target.value })} />
                ) : empanada.cantidadEnStock}
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <input type="checkbox" checked={editRow.esEspecial} onChange={e => setEditRow({ ...editRow, esEspecial: e.target.checked })} />
                ) : (empanada.esEspecial ? 'Sí' : 'No')}
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <Input type="number" value={editRow.precio} onChange={e => setEditRow({ ...editRow, precio: e.target.value })} />
                ) : empanada.precio}
              </Td>
              <Td>
                {editingId === empanada.id ? (
                  <ButtonGroup>
                    <ActionButton onClick={() => handleSave(empanada.id)}>Guardar</ActionButton>
                    <ActionButton onClick={handleCancel}>Cancelar</ActionButton>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup>
                    <ActionButton onClick={() => startEdit(empanada)}>Editar</ActionButton>
                    <ActionButton onClick={() => handleDelete(empanada.id)}>Eliminar</ActionButton>
                  </ButtonGroup>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminContainer>
  );
};

export default AdminEmpanadas; 