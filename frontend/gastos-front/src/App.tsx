import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ListaPessoas } from './pages/Pessoas/ListaPessoas';
import { ListaCategorias } from './pages/Categorias/ListaCategorias';
import { ListaTransacoes } from './pages/Transacoes/ListaTransacoes';
import { FormTransacao } from './pages/Transacoes/FormTransacao';
import { LoginPage } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { RegisterPage } from './pages/Register/RegisterPage';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify'; 

const LayoutPrivado = () => (
    <>
        <Navbar />
        <PrivateRoute />
    </>
);

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<LayoutPrivado />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pessoas" element={<ListaPessoas />} />
                <Route path="/categorias" element={<ListaCategorias />} />
                <Route path="/transacoes" element={<ListaTransacoes />} />
                <Route path="/transacoes/nova" element={<FormTransacao />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer autoClose={3000} position="top-right" />
        
    </AuthProvider>
  );
}

export default App;