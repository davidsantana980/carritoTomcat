import { useState } from "react";
import {  Button, Card, Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
// import bootstrap from "bootstrap"; 

function EstatusModal(props = {mostrar : false, exitoso : false, mensaje : ""}) {
    const [show, setShow] = useState(props.mostrar);
  
    const handleClose = () => setShow(false);
  
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.exitoso ? "Pedido realizado correctamente!" : "Ups!"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.exitoso ? "Puedes mirar los detalles en el apartado de pedidos." : !props.mensaje ? "Tu pedido no se pudo efectuar correctamente, intenta más tarde" : props.mensaje}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
           {
                props.exitoso &&
                    <LinkContainer to="/pedidos" replace>
                        <Button variant="primary">
                            Ir a pedidos
                        </Button>
                    </LinkContainer>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  

export default function ComprarProductoLogueado (props = {usuario_id : 0}) {
    let {state : datosCompra} = useLocation();

    let [cantidad, setCantidad] = useState(1)
    let [estatusPedido, setEstatusPedido] = useState({realizado : false , exitoso : false, mensaje : ""})

    if(!datosCompra || !Object.keys(datosCompra).length){
        return <Navigate to={"/"} />
    }

    let handleSubmit = (event) => {
        event.preventDefault();

        let pedido = {
            usuario_id : props.usuario_id,
            productos_comprados : JSON.stringify([
                {
                    id_producto : datosCompra.producto.id ,
                    cantidad_producto : cantidad
                }
            ])
        }

        if(cantidad > datosCompra.producto.cantidad) return setEstatusPedido({realizado : true, exitoso : false, mensaje : "No se pudo efectuar el pedido: No hay suficientes unidades en el stock"})

        fetch("http://localhost:8080/api/pedidos", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(pedido)
        })
        .then(async res => {
            let json = res.ok && await res.json()

            return {
                ok: res.ok,
                ...json
            }
        })
        .then(result => {
            if(!result.ok) throw new Error("Network response was not OK");
            setEstatusPedido({exitoso: result.ok, realizado:true});
        })
        .catch(err => {
            setEstatusPedido({exitoso: false, realizado:true});
            console.log(err)
        })        
    }

    let handleClick = (event) => {
        if(event.currentTarget.id === "plus"){
            setCantidad(cantidad + 1)
        }else if(event.currentTarget.id === "minus"){
            setCantidad(cantidad === 1 ? cantidad : cantidad - 1)
        }
    }

    return (
        <Container>
            <Container>
                <Row>
                    <hr className="d-lg-none"/>
                        <p className="display-6">Confirma tu compra:</p> 
                    <hr/>   
                    <Col>
                        <Button href="/" variant="danger" className="w-100 mb-3" disabled={estatusPedido.realizado} data-mdb-toggle="tooltip" title="Cancelar">           
                            Cancelar compra
                        </Button>
                        {/* COMPRA */}
                        <Card className="mt-1">         
                            <Card.Body>
                                <Row>
                                    <Col lg="3" md="12" className="mb-4 mb-lg-0">
                                        <div className="bg-image ripple rounded" hidden={!datosCompra.producto.direccion_imagen} style={{"aspectRatio": "1 / 1"}} data-mdb-ripple-color="light">
                                            <img src={datosCompra.producto.direccion_imagen} className="w-100" alt={datosCompra.producto.nombre} />
                                        </div>
                                    </Col>

                                    <Col lg="5" md="6" className="mb-4 mb-lg-0">
                                        <p className="display-6"><strong>{datosCompra.producto.nombre}</strong></p>
                                        <h5>{datosCompra.producto.descripcion}</h5>
                                    </Col>

                                    <Col lg="4" md="6" className="mb-4 mb-lg-0">
                                        <Form className="d-flex mb-4" style={{"maxWidth": "300px"}}>
                                        <Button id="minus" className="px-3 me-2" disabled={estatusPedido.realizado} onClick={handleClick}>
                                                <i className="fa fa-minus"></i>
                                            </Button>

                                            <Form.Floating>
                                                <Form.Control id="cantidad" min="1" name="cantidad" readOnly disabled value={cantidad} type="number" />
                                                <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                                            </Form.Floating>

                                            <Button id="plus" className="px-3 ms-2" disabled={estatusPedido.realizado} onClick={handleClick}>
                                                <i className="fa fa-plus"></i>
                                            </Button>
                                        </Form>

                                        <p className="text-start text-md-center">
                                            Precio por unidad: <strong>${datosCompra.producto.precio}</strong>
                                        </p>
                                        
                                        <p className="text-start text-md-center">
                                            {
                                                datosCompra.producto.disponible ? 
                                                    `Este producto está disponible, ${!!datosCompra.producto.cantidad ? `hay ${datosCompra.producto.cantidad} unidades en el stock` : "pero está agotado actualmente."} ` 
                                                :
                                                    `Este producto no está disponible.`
                                            }
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <hr className="d-lg-none my-4 mb-3" />
                        {/* COMPRA */}
                    </Col>
                    {/* FACTURA */}
                    <Col md="4">
                        <Card className="mb-4">
                            <Card.Header className="py-3">
                                <h5 className="mb-0">Resumen</h5>
                            </Card.Header>
                            <Card.Body className="py-0">
                                <ListGroup className="list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Productos
                                        <span>${datosCompra.producto.precio * cantidad}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Envío
                                        <span>Gratis</span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Precio total</strong>
                                            <strong>
                                                <p className="mb-0">(no incluye IVA)</p>
                                            </strong>
                                        </div>

                                        <span><strong>${datosCompra.producto.precio * cantidad}</strong></span>
                                    </li>
                                </ListGroup>
                            </Card.Body>
                            <Card.Footer className="py-2 text-center">
                            <Button onClick={handleSubmit} disabled={estatusPedido.realizado} className="btn-success btn-lg w-100">
                                    Confirmar compra
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                    {/* FACTURA */}
                    <hr className="mt-3"/>
                    {/* MENSAJE DE EXITO */}
                    {
                        estatusPedido.realizado &&
                        <EstatusModal
                            mostrar={estatusPedido.realizado}
                            exitoso={estatusPedido.exitoso}
                            mensaje={estatusPedido.mensaje}
                        />
                    }
                    {/* MENSAJE DE EXITO */}
                </Row>
                <hr/>
            </Container>    
        </Container>
    )
}