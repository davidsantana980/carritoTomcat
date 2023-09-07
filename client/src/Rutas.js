import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Index from './vistas/Index.js';

class Rutas extends Component {
  render() {
    return (
      <Routes>
        <Route path='*' element={<Index />} />
      </Routes>
    )
  }
}


export default Rutas;
