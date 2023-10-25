import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Index from './vistas/Index.js';
import ListaProductos from './vistas/ListaProductos.js';
import AgregaProductos from './vistas/AgregaProductosForm.js';
import ComprarProducto from './vistas/ComprarProducto.js';
import ListaPedidos from './vistas/ListaPedidos.js';
import ComprarProductoLogueado from './vistas/logueado/ComprarProductoLogueado.js';
import VerificaSesion from './VerificaSesion.js';
import NavBar from './vistas/NavBar.js';
import { constrainedMemory } from 'process';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        verificado : false,
        administrador : false,
        usuario_id : 0
    };
  }

  getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }

  async componentDidMount (){
    let sesion = await VerificaSesion();

    this.setState({
      verificado: sesion.ok,
      administrador: sesion.tipo === "administrador"
    });

    let usuario_id = this.getCookie("usuario_id");

    if(usuario_id !== null && usuario_id !== ""){
      this.setState({usuario_id : parseInt(usuario_id)});
    }
  }

  render() {
      return (
        <>
          <NavBar verificado={this.state.verificado} administrador={this.state.administrador} />
          <Routes>
              <Route path='*' element={<Index admin={this.state.administrador}/>} />
              <Route path='/resultados' element={<ListaProductos/>}/>
              <Route path='/compra-producto' element={this.state.verificado? <ComprarProductoLogueado usuario_id={this.state.usuario_id}/> : <ComprarProducto />} />
              {
                this.state.verificado &&
                <>
                  <Route path='/pedidos' element={<ListaPedidos admin={this.state.administrador} usuario_id={this.state.usuario_id}/>}/>
                  <Route path='/agrega-producto' element={<AgregaProductos/>}/>
                </>
              }
            </Routes>
        </>
      )
  }
}


export default App;
