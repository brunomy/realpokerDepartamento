import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import Login from './pages/Login'
import Pedidos from './pages/Pedidos';
import Ordens from './pages/Ordens';
import Ordem from './pages/Ordem';
import Atividades from './pages/Atividades';
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
import Usuarios from './pages/Usuarios';

import { useUser } from "~/context/UserContext";


function App() {
  return (
    <UserProvider>
    <section className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/pedidos" element={<PrivateRoute><Pedidos /></PrivateRoute>} />

          <Route path="/ordens" element={<PrivateRoute><Ordens /></PrivateRoute>} />
          <Route path="/ordem/:id" element={<PrivateRoute><Ordem /></PrivateRoute>} />

          <Route path="/atividades" element={<PrivateRoute><Atividades /></PrivateRoute>} />

          <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
          <Route path="/configuracoes/:id" element={<PrivateRoute><ConficuracaoEtapas /></PrivateRoute>} />
          <Route path="/configuracoes/etapa/:id" element={<PrivateRoute><ConfiguracaoAtividades /></PrivateRoute>} />
          <Route path="/configuracoes/atividade/:id" element={<PrivateRoute><ConfiguracaoCheckVol /></PrivateRoute>} />

          <Route path="/checklists" element={<PrivateRoute><Checklists /></PrivateRoute>} />
          <Route path="/checklists-finalizados" element={<PrivateRoute><Checklists finalizados /></PrivateRoute>} />
          <Route path="/checklist/:id" element={<PrivateRoute><ChecklistOrder /></PrivateRoute>} />

          <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
          <Route path="/usuario/:id" element={<PrivateRoute><Equipes /></PrivateRoute>} />
          <Route path="/equipe/:id" element={<PrivateRoute><Equipe /></PrivateRoute>} />

          <Route path="/remessas" element={<PrivateRoute><Remessas /></PrivateRoute>} />
          <Route path="/remessa/:id" element={<PrivateRoute><Remessa /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </section>
    </UserProvider>
  )
}

export function PrivateRoute({ children }) {
  const { usuarioLogado } = useUser();

  const token = localStorage.getItem('authToken');
  const equipe = localStorage.getItem('equipe');
  const location = useLocation();

  if (!token) return <Navigate to="/" replace />;

  if (equipe && location.pathname !== '/atividades') {
    return <Navigate to="/atividades" replace />;
  }

  return children;
}

export default App
