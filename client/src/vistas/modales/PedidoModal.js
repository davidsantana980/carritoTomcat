import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
// import Cookies from 'js-cookie';

let DetallesPedido = (props) => {
    let info = {...props.props}

    const pedidoPagado = false || info.pagado;

    let handleEliminar = () => {
        let pedido_id = info.id_pedido

        try{
            fetch("http://localhost:8080/api/pedidos?pedido_id=" + pedido_id, {
                method: "DELETE",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                return window.location.reload(false);
            })
        }catch(e){
            console.log(e)
        }
                            
    }

    let handlePago = () => {
        let pago = {
            pedido_id : info.id_pedido,
            pedido_pagado : true
        }

        try{
            fetch("http://localhost:8080/api/pedidos?" + new URLSearchParams(pago), {
                method: "PUT",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(result => {
                window.location.reload()
            })
        }catch(e){
            console.log(e)
        }

    }

    let ProductosComprados = () => {
        if(!!info.productos_comprados.length){
            let Total = () => {
                return info.productos_comprados.map(pedido => {
                    return (
                        <ListGroup.Item className="border" >
                            <Card.Text className="mt-2">
                                <span className="fw-bolder">{pedido.nombre_producto}</span>
                            </Card.Text>
                            <hr/>
                            <Card.Text>
                                <span className="text-muted">Cantidad:</span> {pedido.cantidad_producto}
                            </Card.Text>
                            <Card.Text>
                                <span className="text-muted">Categoría:</span> {pedido.categoria_producto}
                            </Card.Text>
                            <Card.Text>
                                <span className="text-muted">Monto:</span> {pedido.precio_detalle}
                            </Card.Text>
                        </ListGroup.Item>
                    )
                })
            }

            return (
                <ListGroup className="list-group-flush">
                    <Total/>
                </ListGroup>
            )
        }else{
            return (
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                        <Card.Text>
                            No se compraron productos en este pedido
                        </Card.Text>
                    </ListGroup.Item>
                </ListGroup>
            )
        }
    }


    return (
        <Modal
          {...props}
          size="lg"
          centered

        >
            <Modal.Body>
                <Container>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">
                                <Row>
                                    <Col >
                                        <span>
                                            Tu pedido de {info.fecha_pedido}
                                        </span>
                                    </Col>
                                    <Col>
                                        <ButtonGroup className="flex-wrap float-end">
                                            <Card.Link>
                                                <Button size="sm" variant="danger" onClick={handleEliminar}>
                                                    Cancelar
                                                </Button>
                                            </Card.Link>
                                            <Card.Link>
                                                <Button size="sm" onClick={handlePago}>
                                                    Pagar
                                                </Button>
                                            </Card.Link>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Card.Title>
                            <hr/>
                            <Card.Subtitle className="mb-3 text-muted mt-2">
                                <Card.Text as="div">
                                    <b>{pedidoPagado ? "Pedido pagado" : "Pedido pendiente"}</b> 
                                </Card.Text>
                            </Card.Subtitle>
                            <hr/>
                            {
                                info.productos_comprados.length && 
                                <ProductosComprados/>

                                ||

                                "El producto comprado en este pedido fue borrado."
                            }
                        </Card.Body>
                        <Card.Footer>{info.precio_total_pedido && `Precio total: ${info.precio_total_pedido}`}</Card.Footer>
                    </Card>
                </Container>
            </Modal.Body>
        </Modal>
    )
} 


export default function Pedido (props) {
    let info = {...props.props};
    const [detailsModal, setDetailsModal] = useState({show: false, props : {}});
    
    if(!info){
        return (
            <Container>
                <h1>Error inesperado, no se consiguió el pedido</h1>
            </Container>
        )
    }

    return (
        <>
            <span className="stretched-link btn shadow-none"  style={{"textDecoration" : "none"}} onClick={() => setDetailsModal({show: true, props: info})}>
                {
                    (
                        info.productos_comprados.length && 
                        <span>{`${info.productos_comprados[0].nombre_producto}/$${info.precio_total_pedido}`}</span>
                    ) ||                   (
                        <span>Pulsa para ver los detalles</span>
                    )
                }
                {   
                    detailsModal.show && 
                    <DetallesPedido 
                        show={detailsModal.show}
                        onHide={() => {
                            setDetailsModal({show:false})
                        }}
                        props={detailsModal.props}
                    />
                }
            </span>     
        </>
    )
}