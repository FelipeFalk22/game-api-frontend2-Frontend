import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function Chamados() {
  const { id_categoria } = useParams();
  const [chamados, setChamados] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('aberto');
  const [editando, setEditando] = useState(null);
  const [idCategoria, setIdCategoria] = useState(id_categoria || '');
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCategorias();
  }, [navigate]);

  useEffect(() => {
    if (idCategoria) {
      fetchChamadosPorCategoria(idCategoria);
    }
  }, [idCategoria]);

  const fetchCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const fetchChamadosPorCategoria = async (categoriaId) => {
    try {
      const res = await api.get(`/${categoriaId}/chamados`);
      setChamados(res.data);
    } catch (err) {
      console.error("Erro ao buscar chamados por categoria:", err);
      setChamados([]);
      if (err.response && err.response.status === 401) handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCategoria) {
      alert('Selecione uma categoria válida!');
      return;
    }

    const chamadoData = { descricao, status, id_categoria: parseInt(idCategoria, 10) };

    try {
      if (editando) {
        await api.put(`/${idCategoria}/chamados/${editando.id}`, chamadoData);
      } else {
        await api.post(`/${idCategoria}/chamados`, chamadoData);
      }

      fetchChamadosPorCategoria(idCategoria);
      resetForm();
    } catch (err) {
      console.error("Erro ao salvar chamado:", err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (chamado) => {
    setEditando(chamado);
    setDescricao(chamado.descricao);
    setStatus(chamado.status);
    setIdCategoria(chamado.id_categoria);
  };

  const handleDelete = async (chamado) => {
    if (window.confirm('Deseja realmente excluir este chamado?')) {
      try {
        await api.delete(`/${chamado.id_categoria}/chamados/${chamado.id}`);
        fetchChamadosPorCategoria(chamado.id_categoria);
      } catch (err) {
        console.error("Erro ao deletar chamado:", err);
      }
    }
  };

  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    setIdCategoria(categoriaId);
    if (categoriaId) fetchChamadosPorCategoria(categoriaId);
    else setChamados([]);
  };

  const resetForm = () => {
    setEditando(null);
    setDescricao('');
    setStatus('aberto');
  };

  const chamadosAbertos = chamados.filter(c => c.status === 'aberto');
  const chamadosFechados = chamados.filter(c => c.status === 'fechado');

  const getCategoriaNome = (id) => {
    const cat = categorias.find(c => c.id === id);
    return cat ? cat.nome : id;
  };

  return (
    <div className="container">
      <div className="top-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button className="category-button" onClick={() => navigate('/categorias')}>
          Categorias
        </button>
        <button onClick={handleLogout} className="logout-button">Deslogar</button>
      </div>

      <h2>Gerenciar Chamados (Categoria: {getCategoriaNome(idCategoria)})</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editando ? 'Editar Chamado' : 'Novo Chamado'}</h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Descrição do chamado"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="aberto">Aberto</option>
            <option value="fechado">Fechado</option>
          </select>
          <select value={idCategoria} onChange={handleCategoriaChange} required>
            <option value="">Selecione a categoria</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>
        <div className="form-actions" style={{ marginTop: '1.5rem' }}>
          <button type="submit">{editando ? 'Atualizar' : 'Criar'}</button>
          {editando && <button type="button" onClick={resetForm} className="btn-cancel">Cancelar</button>}
        </div>
      </form>

      <div className="open-tickets-container">
        <h3 className="open-tickets-title">Chamados Abertos</h3>
        <ul className="ticket-list">
          {chamadosAbertos.map(c => (
            <li key={c.id} className="ticket-item">
              <div className="ticket-info">
                {c.protocolo} - {c.descricao}
              </div>
              <div className="ticket-actions">
                <button onClick={() => handleEdit(c)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(c)} className="btn-delete">Fechar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {chamadosFechados.length > 0 && (
        <div className="closed-tickets-container" style={{ marginTop: '3rem' }}>
          <h3 className="open-tickets-title">Chamados Fechados</h3>
          <ul className="ticket-list">
            {chamadosFechados.map(c => (
              <li key={c.id} className="ticket-item">
                <div className="ticket-info">
                  {c.protocolo} - {c.descricao}
                </div>
                <div className="ticket-actions">
                  <button onClick={() => handleEdit(c)} className="btn-edit">Editar</button>
                  <button onClick={() => handleDelete(c)} className="btn-delete">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Chamados;
