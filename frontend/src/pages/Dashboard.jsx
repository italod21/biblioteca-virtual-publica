import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    } else {
      navigate("/login"); // se não tiver token, volta pro login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <h2>👋 Olá, {user?.nome}</h2>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </header>

      {/* Navegação */}
      <nav className="dashboard-nav">
        <Link to="/dashboard/meus-dados">Meus Dados</Link>
        <Link to="/dashboard/meus-livros">Meus Livros</Link>
        <Link to="/dashboard/lista-livros">Lista de Livros</Link>
        <Link to="/dashboard/ranking">Ranking</Link>
      </nav>

      {/* Conteúdo dinâmico */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;

