import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Verifica se o usuário é admin
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user || user.tipo !== 'admin') {
      navigate('/login'); // não admin volta pro login
    }
  }, [navigate, user]);

  // Buscar todos os usuários
  const fetchUsuarios = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      const response = await api.get('/usuario', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsuarios(response.data);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Excluir usuário
  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const token = localStorage.getItem('token');
      await api.delete(`/usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Usuário excluído com sucesso!');
      setError('');
      fetchUsuarios(); // Atualiza lista
    } catch (err) {
      setError('Erro ao excluir usuário.');
      setSuccess('');
      console.error(err);
    }
  };

  // Editar usuário (pode redirecionar para página de edição)
  const handleEdit = (id) => {
    navigate(`/usuarios/editar/${id}`);
  };

  return (
    <div className="container">
      <h2>Lista de Usuários</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <ul className="ticket-list">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="ticket-item">
            <div className="ticket-info">
              <strong>Nome:</strong> {usuario.nome} <br />
              <strong>Email:</strong> {usuario.email} <br />
              <strong>Tipo:</strong> {usuario.tipo}
            </div>
            <div className="ticket-actions">
              <button className="btn-edit" onClick={() => handleEdit(usuario.id)}>Editar</button>
              <button className="btn-delete" onClick={() => handleDelete(usuario.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
