import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom";
// import bootstrap from "bootstrap"; 

export default function ComprarProducto () {
    let {state : datosCompra} = useLocation();

    let [cantidad, setCantidad] = useState(datosCompra.cantidad_producto)

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
                        <Card>         
                            <Card.Body>
                            {/* <!-- Single item --> */}
                                <Row>
                                    <Col lg="3" md="12" className="mb-4 mb-lg-0">
                                        {/* <!-- Image --> */}
                                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                            <img src={datosCompra.producto.direccion_imagen} className="w-100" alt={datosCompra.producto.nombre} />
                                        </div>
                                        {/* <!-- Image --> */}
                                    </Col>

                                    <Col lg="5" md="6" className="mb-4 mb-lg-0">
                                        {/* <!-- Data --> */}
                                        <p className="display-6"><strong>{datosCompra.producto.nombre}</strong></p>
                                        <h5>{datosCompra.producto.descripcion}</h5>
                                        <Button href="/" variant="danger" className="mt-1 mb-2" data-mdb-toggle="tooltip" title="Remover item">
                                            <Row>
                                                <Col>                    
                                                    Cancelar  
                                                </Col>
                                                <Col>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                                                    </svg>
                                                </Col>
                                            </Row>
                                        </Button>
                                        {/* <!-- Data --> */}
                                    </Col>

                                    <Col lg="4" md="6" className="mb-4 mb-lg-0">
                                        {/* <!-- Quantity --> */}
                                        <div className="d-flex mb-4" style={{"max-width": "300px"}}>
                                            <Button id="minus" className="px-3 me-2" onClick={handleClick}>
                                                <i className="fa fa-minus"></i>
                                            </Button>

                                            <Form className="form-outline">
                                                <Form.Label for="cantidad">Cantidad</Form.Label>
                                                <Form.Control id="cantidad" min="1" name="cantidad" readOnly value={cantidad} type="number" />
                                            </Form>

                                            <Button id="plus" className="px-3 ms-2" onClick={handleClick}>
                                                <i className="fa fa-plus"></i>
                                            </Button>
                                        </div>
                                        {/* <!-- Quantity --> */}

                                        {/* <!-- Price --> */}
                                        <p className="text-start text-md-center">
                                            Precio por unidad: <strong>$1.5</strong>
                                        </p>
                                        {/* <!-- Price --> */}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <hr className="my-4" />
                    </Col>
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-header py-3">
                                <h5 class="mb-0">Resumen</h5>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Productos
                                    <span>${datosCompra.producto.precio * cantidad}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Envío
                                    <span>Gratis</span>
                                </li>
                                <li
                                    class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                    <strong>Precio total</strong>
                                    <strong>
                                        <p class="mb-0">(no incluye IVA)</p>
                                    </strong>
                                    </div>
                                    <span><strong>${datosCompra.producto.precio * cantidad}</strong></span>
                                </li>
                                </ul>

                                <button type="button" class="btn btn-success btn-lg btn-block">
                                    Confirmar compra
                                </button>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>    
        </Container>
    )
}