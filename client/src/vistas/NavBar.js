import React, { useState } from 'react';
// import '../index.css';
// import reportWebVitals from './reportWebVitals';

import { Container,  Nav, NavDropdown, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"

import BuscarProducto from './formularios/BuscarProducto';
import SesionModal from './modales/SesionModal';
import CrearCuentaModal from './modales/CrearCuentaModal';

export default function NavBar(props = {verificado : false, administrador : false}) {
  const [sesionModal, mostrarSesionModal] = useState(false);
  const [crearCuentaModal, mostrarCrearCuentaModal] = useState(false);


  let handleCierre = () => {
    fetch('http://localhost:8080/api/login', {
      method: "DELETE",
      credentials:"include",
    })
    .then(res => res.ok)
    .then(res => window.location.reload())
  }
  
  let OpcionesVerificado = () => (
    <>
      <LinkContainer to="/agrega-producto">
        <Nav.Link>Agregar producto</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/pedidos">
        <Nav.Link>Mis pedidos</Nav.Link>
      </LinkContainer>
      <Nav.Link onClick={handleCierre}>Cerrar sesion</Nav.Link>
    </>
  )

  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-2'>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className='lead'>{!props.administrador ? "E-Store" : "E-Store: Modo administrador"}</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id= "basic-navbar-nav">
          <Nav>
              <NavDropdown
                title="Buscar producto"
                menuVariant="dark"
              >
                <BuscarProducto/>
              </NavDropdown>
              
            {
              !props.verificado ? 
                <>
                  <Nav.Link onClick={() => mostrarSesionModal(true)}>Iniciar sesion</Nav.Link>
                  <SesionModal 
                    show={sesionModal}
                    onHide={() => mostrarSesionModal(false)}
                  /> 
                </>
              :
              <OpcionesVerificado/>
            }
            <Nav.Link onClick={() => mostrarCrearCuentaModal(true)}>Crear cuenta</Nav.Link>
            <CrearCuentaModal 
              administrador={props.administrador}
              show={crearCuentaModal}
              onHide={() => mostrarCrearCuentaModal(false)}
            /> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}