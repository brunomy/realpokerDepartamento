import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Pedidos from './pages/Pedidos';
import Pedido from './pages/Pedido';

function App() {

  return (
    <section className="container">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedidos/:id" element={<Pedido />} />
          
        </Routes>
      </Router>
    </section>
  )
}

export default App
