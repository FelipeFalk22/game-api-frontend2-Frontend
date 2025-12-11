import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/chamados";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/usuario/login', { email, senha });

      // 1. Salva o token
      localStorage.setItem('token', response.data.token);

      // 2. Decodifica o token
      const userData = jwtDecode(response.data.token);

      // 3. Salva os dados do usuário
      localStorage.setItem("user", JSON.stringify(userData));

      // 4. Redireciona para a rota de origem (ex: /categorias)
      navigate(from, { replace: true });

    } catch (err) {
      setError('Email ou senha inválidos.');
      console.error("Erro no login:", err);
    }
  };

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="container login-container">
      <h2>API de Chamados - Login</h2>
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

      {/* Botão de cadastro */}
      <button onClick={handleCadastro} className="btn-cadastro">
        Cadastrar
      </button>
    </div>
  );
}

export default Login;
