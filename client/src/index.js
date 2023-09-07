import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Container,  Nav, NavDropdown, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import Rutas from './Rutas';
import BuscarProducto from './vistas/BuscarProducto';

function CustomNavbar() {
  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-2'>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className='lead'>E-Store</Navbar.Brand>
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
            {/* <LinkContainer to="/busca">
              <Nav.Link>Buscar producto</Nav.Link>
            </LinkContainer> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomNavbar />
      <Rutas />
      <footer id="footer" className="fixed-bottom mt-3 py-2 bg-dark text-white-50">
          <Container className="text-start">
              Salvador Ochoa, 2023
          </Container>
      </footer>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
