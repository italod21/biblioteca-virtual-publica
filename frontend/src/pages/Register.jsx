import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/auth/register", {
        nome,
        email,
        senha,
      });

      setMensagem("✅ Usuário registrado com sucesso! Vá para o login.");
    } catch (error) {
      setMensagem(error.response?.data?.mensagem || "Erro ao registrar usuário.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>📚 Biblioteca Virtual Pública</h2>
        <h3>Cadastro</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Registrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
