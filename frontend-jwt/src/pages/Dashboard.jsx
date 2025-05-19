// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  getTreinos,
  createTreino,
  deleteTreino,
  updateTreino
} from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ajuste conforme seu estilo

const Dashboard = () => {
  const [treinos, setTreinos] = useState([]);
  const [novoTreino, setNovoTreino] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [novoNomeEditado, setNovoNomeEditado] = useState('');

  const navigate = useNavigate();

  const carregarTreinos = async () => {
    try {
      const dados = await getTreinos();
      setTreinos(dados);
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      alert('Erro ao carregar treinos. Faça login novamente.');
      sessionStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    carregarTreinos();
  }, []);

  const handleAdd = async () => {
    if (!novoTreino.trim()) return;
    try {
      await createTreino(novoTreino.trim());
      setNovoTreino('');
      carregarTreinos();
    } catch (error) {
      console.error('Erro ao adicionar treino:', error);
      alert('Erro ao adicionar treino.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este treino?')) return;
    try {
      await deleteTreino(id);
      carregarTreinos();
    } catch (error) {
      console.error('Erro ao deletar treino:', error);
      alert('Erro ao deletar treino.');
    }
  };

  const iniciarEdicao = (id, nomeAtual) => {
    setEditandoId(id);
    setNovoNomeEditado(nomeAtual);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNovoNomeEditado('');
  };

  const salvarEdicao = async (id) => {
    if (!novoNomeEditado.trim()) return;
    try {
      await updateTreino(id, novoNomeEditado.trim());
      cancelarEdicao();
      carregarTreinos();
    } catch (error) {
      console.error('Erro ao editar treino:', error);
      alert('Erro ao editar treino.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Meus Treinos</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Nome do novo treino"
          value={novoTreino}
          onChange={(e) => setNovoTreino(e.target.value)}
        />
        <button onClick={handleAdd}>Adicionar</button>
      </div>

      <ul className="treino-list">
        {treinos.map((treino) => (
          <li key={treino._id} className="treino-item">
            {editandoId === treino._id ? (
              <>
                <input
                  type="text"
                  value={novoNomeEditado}
                  onChange={(e) => setNovoNomeEditado(e.target.value)}
                />
                <button onClick={() => salvarEdicao(treino._id)}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                <span>{treino.nome}</span>
                <button onClick={() => iniciarEdicao(treino._id, treino.nome)}>Editar</button>
                <button onClick={() => handleDelete(treino._id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
