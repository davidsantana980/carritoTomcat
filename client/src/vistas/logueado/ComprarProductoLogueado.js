import { useState } from "react";
import {  Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap"
import { Navigate, useLocation } from "react-router-dom";
// import SesionModal from "./modales/SesionModal";
// import bootstrap from "bootstrap"; 

export default function ComprarProductoLogueado () {
    // let {state : datosCompra} = useLocation();
    let datosCompra = {
        cantidad_producto : 1,
        producto : {
            "id": 21,
            "nombre": "Coca-Cola",
            "descripcion": "¡Experimenta la chispa de la felicidad con Coca-Cola! Nuestra bebida refrescante y burbujeante es perfecta para satisfacer tu sed y alegrar cualquier ocasión. Disfruta de su sabor único y refrescante en cada sorbo.",
            "direccion_imagen": "imagenes/cocacola.jpeg",
            "disponible": true,
            "precio": 0.5,
            "categoria_id": 2,
            "categoria_string": "Comidas"
        }
    }


    let [cantidad, setCantidad] = useState(1)
    const [modal, setModal] = useState({show: false, _id: "", project: ""});

    if(!datosCompra || !Object.keys(datosCompra).length){
        return <Navigate to={"/"} />
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
                        <Button href="/" variant="danger" className="w-100 mb-3" data-mdb-toggle="tooltip" title="Cancelar">           
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
                                            <Button id="minus" className="px-3 me-2" onClick={handleClick}>
                                                <i className="fa fa-minus"></i>
                                            </Button>

                                            <Form.Floating>
                                                <Form.Control id="cantidad" min="1" name="cantidad" readOnly disabled value={cantidad} type="number" />
                                                <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                                            </Form.Floating>

                                            <Button id="plus" className="px-3 ms-2" onClick={handleClick}>
                                                <i className="fa fa-plus"></i>
                                            </Button>
                                        </Form>

                                        <p className="text-start text-md-center">
                                            Precio por unidad: <strong>${datosCompra.producto.precio}</strong>
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
                                <Button 
                                    onClick={() => { 
                                        datosCompra.cantidad_producto = cantidad;
                                        return setModal({show:true})
                                    }}
                                    className="btn-success btn-lg w-100"
                                >
                                    Confirmar compra
                                </Button>
                            </Card.Footer>
                        </Card>
                        {/* <SesionModal 
                            show={modal.show}
                            onHide={() => setModal({show :false})}
                            infoCompra={datosCompra}
                            protocolo={"compra"}
                        /> */}
                    </Col>
                    {/* FACTURA */}
                </Row>
                <hr/>
            </Container>    
        </Container>
    )
}