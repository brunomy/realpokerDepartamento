import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import Login from './pages/Login'
import Pedidos from './pages/Pedidos';
import Pedido from './pages/Pedido';
import Ordens from './pages/Ordens';
import Ordem from './pages/Ordem';
import Atividades from './pages/Atividades';
import Atividade from './pages/Atividade';
import Checklists from './pages/Checklists';
import Checklist from './pages/Checklist';
import Equipes from './pages/Equipes';
import Equipe from './pages/Equipe';
import Remessas from './pages/Remessas';
import Remessa from './pages/Remessa';
import Configuracoes from './pages/Configuracoes';
import ConficuracaoEtapas from './pages/ConficuracaoEtapas';
import ConfiguracaoAtividades from './pages/ConfiguracaoAtividades';
import ConfiguracaoCheckVol from './pages/ConfiguracaoCheckVol';
import ChecklistOrder from './pages/Checklist';

function App() {

  return (
    <UserProvider>
    <section className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/:id" element={<Pedido />} />

          <Route path="/ordens" element={<Ordens />} />
          <Route path="/ordens/:id" element={<Ordem />} />

          <Route path="/atividades" element={<Atividades />} />
          <Route path="/atividades/:id" element={<Atividade />} />

          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/configuracoes/:id" element={<ConficuracaoEtapas />} />
          <Route path="/configuracoes/:id/etapa/:id_etapa" element={<ConfiguracaoAtividades />} />
          <Route path="/configuracoes/:id/etapa/:id_etapa/atividade/:id_atividade" element={<ConfiguracaoCheckVol />} />

          <Route path="/checklists" element={<Checklists />} />
          <Route path="/checklists/:id" element={<ChecklistOrder />} />

          <Route path="/equipes" element={<Equipes />} />
          <Route path="/equipes/:id" element={<Equipe />} />

          <Route path="/remessas" element={<Remessas />} />
          <Route path="/remessas/:id" element={<Remessa />} />
        </Routes>
      </Router>
    </section>
    </UserProvider>
  )
}

export default App
