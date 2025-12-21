import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ListaPessoas } from './pages/Pessoas/ListaPessoas';
import { ListaTransacoes } from './pages/Transacoes/ListaTransacoes';
import { FormTransacao } from './pages/Transacoes/FormTransacao';
import { ListaCategorias } from './pages/Categorias/ListaCategorias'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pessoas" element={<ListaPessoas />} />
        
        {/* Agora ele usa o componente real que você criou */}
        <Route path="/categorias" element={<ListaCategorias />} />
        
        <Route path="/transacoes" element={<ListaTransacoes />} />
        <Route path="/transacoes/nova" element={<FormTransacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;