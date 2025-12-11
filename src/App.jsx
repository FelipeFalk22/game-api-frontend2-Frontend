import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chamados from './pages/Chamados';
import CadastroUsuario from './pages/CadastroUsuario';
import Categorias from './pages/Categorias';
import './App.css';
import Usuarios from './pages/Usuarios.jsx';
import EditarUsuario from './pages/EditarUsuario.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="/chamados" element={<Chamados />} />
          <Route path="/categorias" element={<Categorias />} />

          {/* OUTRAS ROTAS VÃO PARA LOGIN */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
