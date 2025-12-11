import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function EditarUsuario() {
  const { id } = useParams(); // ID do usuário a ser editado
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Verifica se é admin
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (!user || user.tipo !== 'admin') {
      navigate('/login');
    }
  }, [navigate, user]);

  // Buscar dados do usuário ao carregar a página
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/usuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const u = response.data;
        setNome(u.nome);
        setEmail(u.email);
        setTipo(u.tipo);
      } catch (err) {
        setError('Erro ao carregar dados do usuário.');
        console.error(err);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nome) {
      setError('O nome é obrigatório.');
      return;
    }
    if (!email) {
      setError('O email é obrigatório.');
      return;
    }
    if (senha && senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (!tipo) {
      setError('Selecione o tipo de usuário.');
      return;
    }

    const dadosAtualizados = { nome, email, tipo };
    if (senha) {
      dadosAtualizados.senha = senha; // atualiza a senha somente se informada
    }

    try {
      const token = localStorage.getItem('token');
      await api.put(`/usuario/${id}`, dadosAtualizados, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Usuário atualizado com sucesso!');
      setTimeout(() => navigate('/usuarios'), 1500);
    } catch (err) {
      setError('Erro ao atualizar usuário.');
      console.error(err);
    }
  };

  return (
    <div className="container login-container">
      <h2>Editar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova senha (opcional)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>
        <div className="button-group">
          <button type="submit" className="btn-cadastro">Salvar</button>
          <button type="button" onClick={() => navigate('/usuarios')} className="btn-back-login">
            Voltar
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default EditarUsuario;
