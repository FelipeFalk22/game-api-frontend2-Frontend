import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // usa a api com token

function Categorias() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);
    setUsuario(user);

    if (user.tipo !== "admin") {
      alert("Apenas administradores podem acessar categorias.");
      navigate("/chamados");
      return;
    }

    listar();
  }, []);

  function listar() {
    api.get("/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.log(err));
  }

  function salvarCategoria(e) {
    e.preventDefault();

    if (editandoId) {
      api.put(`/categorias/${editandoId}`, { nome, descricao })
        .then(() => {
          setNome("");
          setDescricao("");
          setEditandoId(null);
          listar();
        });
    } else {
      api.post("/categorias", { nome, descricao })
        .then(() => {
          setNome("");
          setDescricao("");
          listar();
        });
    }
  }

  function editar(cat) {
    setEditandoId(cat.id);
    setNome(cat.nome);
    setDescricao(cat.descricao || "");
  }

  function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    api.delete(`/categorias/${id}`)
      .then(() => listar());
  }

  return (
    <div className="container">

      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Deslogar
      </button>

      <button className="category-button" onClick={() => navigate('/chamados')}>
        Voltar
      </button>

      <h2>Categorias</h2>

      <form onSubmit={salvarCategoria}>
        <input
          type="text"
          placeholder="Nome da categoria"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
        />

        <button type="submit">
          {editandoId ? "Salvar alteração" : "Adicionar categoria"}
        </button>
      </form>

      <ul className="players-list">
        {categorias.map(cat => (
          <li key={cat.id} className="player-item">
            <span className="player-info">{cat.nome}</span>

            <div className="player-actions">
              <button className="btn-edit" onClick={() => editar(cat)}>
                Editar
              </button>

              <button className="btn-delete" onClick={() => excluir(cat.id)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Categorias;
