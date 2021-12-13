import logo from './logo.svg';
import './App.css';
import { Productos } from './componentes/Productos';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductList } from './componentes/ProductList';
import { Comentarios } from './componentes/Comentarios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './componentes/Login';
import { Home } from './componentes/Home';
import { Ventas } from './componentes/Ventas';
import { VentasListar } from './componentes/VentasListar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/producto" element={<Productos />}/>
        <Route exact path="/ventas" element={<Ventas />}/>
        <Route exact path="/ventas/listar" element={<VentasListar />}/>
        <Route path="/producto/lista" element={<ProductList />}/>
        <Route path="/comentarios" element={<Comentarios />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
