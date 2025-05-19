const API_BASE_URL = 'https://seu-backend-em-producao.vercel.app'; // seu backend real

const getToken = () => sessionStorage.getItem('token');

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const getTreinos = async () => {
  const response = await fetch(`${API_BASE_URL}/treinos`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao buscar treinos');
  return await response.json();
};

export const createTreino = async (nome) => {
  const response = await fetch(`${API_BASE_URL}/treinos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ nome }),
  });
  if (!response.ok) throw new Error('Erro ao criar treino');
  return await response.json();
};

export const deleteTreino = async (id) => {
  const response = await fetch(`${API_BASE_URL}/treinos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Erro ao excluir treino');
  return await response.json();
};

// src/services/api.js

export const updateTreino = async (id, nome) => {
  const token = sessionStorage.getItem('token');
  return axios.patch(`${API_URL}/treinos/${id}`, { nome }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

