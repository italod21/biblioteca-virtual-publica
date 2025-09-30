import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas do Dashboard com Outlet */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="meus-dados" element={<h3>📌 Aqui vão os dados do usuário</h3>} />
          <Route path="meus-livros" element={<h3>📚 Aqui vão os livros do usuário</h3>} />
          <Route path="lista-livros" element={<h3>📖 Aqui vai a lista de todos os livros</h3>} />
          <Route path="ranking" element={<h3>🏆 Aqui vai o ranking de livros</h3>} />
        </Route>

        {/* Redireciona "/" para "/login" */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
