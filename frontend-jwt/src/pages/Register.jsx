import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../services/api';
import '../App.css';
import Loader from '../components/Loader';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    try {
      await registerUser(formData);
      toast.success('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao registrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {loading && <Loader />}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Sua senha"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          Cadastrar
        </button>

        <p>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
