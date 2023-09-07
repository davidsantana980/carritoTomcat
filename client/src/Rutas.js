import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Index from './vistas/Index.js';
import ListaProductos from './vistas/Lista.js';

class Rutas extends Component {
  render() {
    return (
      <Routes>
        <Route path='*' element={<Index />} />
        <Route path='/resultados' element={<ListaProductos/>}/>
      </Routes>
    )
  }
}


export default Rutas;
