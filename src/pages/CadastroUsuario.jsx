import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (!nome) {
      setError('O nome é obrigatório.');
      return;
    }

    if (!email) {
      setError('O email é obrigatório.');
      return;
    }

    if (senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!tipo) {
      setError('Selecione o tipo de usuário.');
      return;
    }

    const dadosUsuario = { nome, email, senha, tipo };

    try {
      await api.post('/usuario', dadosUsuario);
      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      // Limpar formulário
      setNome('');
      setEmail('');
      setSenha('');
      setTipo('');
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao realizar o cadastro. Tente novamente.');
      }
      console.error("Erro no cadastro:", err);
    }
  };

  return (
    <div className="container login-container">
      <h2>Cadastro de Novo Usuário</h2>
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
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
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
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="button-group">
        <button type="button" onClick={() => navigate('/login')} className="btn-back-login">
          Voltar para Login
        </button>
      </div>

    </div>
  );
}

export default CadastroUsuario;
