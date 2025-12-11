import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CategoriaForm() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/categorias/${id}`)
        .then(res => setNome(res.data.nome))
        .catch(err => alert("Erro ao carregar dados"));
    }
  }, [id]);

  function salvar(e) {
    e.preventDefault();

    if (id) {
      api.put(`/categorias/${id}`, { nome })
        .then(() => navigate("/categorias"))
        .catch(() => alert("Erro ao salvar"));
    } else {
      api.post(`/categorias`, { nome })
        .then(() => navigate("/categorias"))
        .catch(() => alert("Erro ao salvar"));
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{id ? "Editar Categoria" : "Nova Categoria"}</h1>

      <form onSubmit={salvar}>
        <label>Nome da categoria:</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CategoriaForm;
