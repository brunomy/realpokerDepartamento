import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Pedidos from './pages/Pedidos';
import Pedido from './pages/Pedido';
import Atividades from './pages/Atividades';
import Atividade from './pages/Atividade';
import Checklists from './pages/Checklists';
import Equipes from './pages/Equipes';
import Equipe from './pages/Equipe';

function App() {

  return (
    <section className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/:id" element={<Pedido />} />

          <Route path="/atividades" element={<Atividades />} />
          <Route path="/atividades/:id" element={<Atividade />} />

          <Route path="/checklists" element={<Checklists />} />

          <Route path="/equipes" element={<Equipes />} />
          <Route path="/equipes/:id" element={<Equipe />} />
        </Routes>
      </Router>
    </section>
  )
}

export default App
