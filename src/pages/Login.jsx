import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/cliente/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/jogadores');
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="container login-container">
      <h2>Game API - Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;