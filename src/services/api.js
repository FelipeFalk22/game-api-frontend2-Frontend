import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-api-players.onrender.com', // Certifique-se que a porta é a mesma do seu back-end
});

// Adiciona um interceptor para incluir o token de autenticação em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
