import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Index from './vistas/Index.js';
import ListaProductos from './vistas/ListaProductos.js';
import AgregaProductosForm from './vistas/AgregaProductosForm.js';
import ComprarProducto from './vistas/ComprarProducto.js';
import ListaPedidos from './vistas/ListaPedidos.js';

class Rutas extends Component {
  render() {
    return (
      <Routes>
        <Route path='*' element={<Index />} />
        <Route path='/resultados' element={<ListaProductos/>}/>
        <Route path='/pedidos' element={<ListaPedidos/>}/>
        <Route path='/agrega-producto' element={<AgregaProductosForm/>}/>
        <Route path='/compra-producto' element={<ComprarProducto/>}/>
      </Routes>
    )
  }
}


export default Rutas;
