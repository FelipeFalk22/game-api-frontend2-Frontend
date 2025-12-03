import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Jogadores from './pages/Jogadores';
import CadastroCliente from './pages/CadastroCliente'; // Adicione esta linha
import './App.css'; // Importe o CSS aqui

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroCliente />} /> {/* Adicione esta linha */}
          <Route path="/jogadores" element={<Jogadores />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;