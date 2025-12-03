import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Jogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState('');
  const [ataque, setAtaque] = useState('');
  const [defesa, setDefesa] = useState('');
  const [pontosVida, setPontosVida] = useState('');
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchJogadores();
    }
  }, [navigate]);

  const fetchJogadores = async () => {
    try {
      const response = await api.get('/jogador');
      setJogadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
      if (error.response && error.response.status === 401) {
        handleLogout(); // Desloga se o token for inválido
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jogadorData = {
      nome,
      ataque: parseInt(ataque),
      defesa: parseInt(defesa),
      pontos_vida: pontosVida ? parseInt(pontosVida) : 100,
    };

    try {
      if (editando) {
        await api.put(`/jogador/${editando.id}`, jogadorData);
      } else {
        await api.post('/jogador', jogadorData);
      }
      fetchJogadores();
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
    }
  };

  const handleEdit = (jogador) => {
    setEditando(jogador);
    setNome(jogador.nome);
    setAtaque(jogador.ataque);
    setDefesa(jogador.defesa);
    setPontosVida(jogador.pontos_vida);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este jogador?')) {
        try {
          await api.delete(`/jogador/${id}`);
          fetchJogadores();
        } catch (error) {
          console.error("Erro ao deletar jogador:", error);
        }
    }
  };

  const resetForm = () => {
    setEditando(null);
    setNome('');
    setAtaque('');
    setDefesa('');
    setPontosVida('');
  };

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-button">Deslogar</button>
      <h2>Gerenciar Jogadores</h2>
      
      <form onSubmit={handleSubmit}>
        <h3>{editando ? 'Editar Jogador' : 'Novo Jogador'}</h3>
        <div className="form-grid">
            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input type="number" placeholder="Ataque" value={ataque} onChange={(e) => setAtaque(e.target.value)} required />
            <input type="number" placeholder="Defesa" value={defesa} onChange={(e) => setDefesa(e.target.value)} required />
            <input type="number" placeholder="Pontos de Vida (padrão 100)" value={pontosVida} onChange={(e) => setPontosVida(e.target.value)} />
        </div>
        <div className="form-actions">
            <button type="submit">{editando ? 'Atualizar' : 'Criar'}</button>
            {editando && <button type="button" className="btn-cancel" onClick={resetForm}>Cancelar</button>}
        </div>
      </form>

      <h3>Lista de Jogadores</h3>
      <ul className="players-list">
        {jogadores.map((jogador) => (
          <li key={jogador.id} className="player-item">
            <span className="player-info">
              {jogador.nome} (Ataque: {jogador.ataque}, Defesa: {jogador.defesa}, HP: {jogador.pontos_vida})
            </span>
            <div className="player-actions">
                <button className="btn-edit" onClick={() => handleEdit(jogador)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(jogador.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jogadores;