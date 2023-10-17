import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import Index from './vistas/Index.js';
import ListaProductos from './vistas/ListaProductos.js';
import AgregaProductos from './vistas/AgregaProductosForm.js';
import ComprarProducto from './vistas/ComprarProducto.js';
import ListaPedidos from './vistas/ListaPedidos.js';
import ComprarProductoLogueado from './vistas/logueado/ComprarProductoLogueado.js';

class Rutas extends Component {

  constructor(props) {
    super(props);
    this.state = {
        verificado : false
    };
  }

  async componentDidMount (){
    await fetch('http://localhost:8080/api/post', {
        method: 'GET',
        credentials:"include",
    })
    .then(response => {
        if(response.ok) this.setState({verificado: true});
        return response.json();
    })
    .then(data =>{
        console.log("RUTASSS "  + this.state.verificado);
    })    
  }

  render() {
    // if(!this.state.verificado){
      return (
        <Routes>
            {
              !this.state.verificado && 
              <>
                <Route path='*' element={<Index />} />
                <Route path='/resultados' element={<ListaProductos/>}/>
                <Route path='/pedidos' element={<ListaPedidos/>}/>
                <Route path='/agrega-producto' element={<AgregaProductos/>}/>
                <Route path='/compra-producto' element={<ComprarProducto/>}/>
              </>
            }
            {
              this.state.verificado && 
              <>
               <Route path='*' element={<ComprarProductoLogueado />} />
              </>
            }
          </Routes>

      )
    // }else if(this.state.verificado){
    //   return (
    //     <Routes>
    //       <Route path='*' element={<ListaPedidos />} />
    //     </Routes>
    //   )
    // }
  }
}


export default Rutas;
