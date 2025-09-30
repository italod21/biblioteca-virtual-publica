import { useState } from "react";
import axios from "axios";
import "../App.css"; // garante que os estilos sejam aplicados

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        senha,
      });

      localStorage.setItem("token", response.data.token);
      setMensagem("✅ Login realizado com sucesso!");
    } catch (error) {
      setMensagem(error.response?.data?.mensagem || "Erro ao fazer login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>📚 Biblioteca Virtual Pública</h2>

        <form onSubmit={handleSubmit}>
          <input
            class="input"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            class="input"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>
    </div>
  );
}

export default Login;
