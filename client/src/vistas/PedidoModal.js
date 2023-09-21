import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Modal, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';

let DetallesPedido = (props) => {
    let info = {...props.props}

    let handlePago = (evt) => {
        evt.preventDefault();

    }

    let PedidosComprados = () => {
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


    // let handleCompra = (event) => {
    //     event.preventDefault();

    //     // const form = event.currentTarget;

    //     // if (form.checkValidity() === false) {
    //     //     event.preventDefault();
    //     //     event.stopPropagation();
    //     //     return
    //     // }
      
    //     // setValidated(true)

    //     let datosCompra = {
    //         cantidad_pedido : 1,
    //         pedido : info
    //     }

    //     return nav("/compra-pedido", {replace : true, state: datosCompra})
    // } 

    console.log(JSON.stringify(props.show))
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
                                    <b>{info.pagado ? "Pedido pagado" : "Pedido pendiente"}</b> 
                                </Card.Text>
                            </Card.Subtitle>
                            <hr/>
                            {
                                info.productos_comprados.length && 
                                <PedidosComprados/>
                            }
                        </Card.Body>
                        <Card.Footer>Precio total: {info.precio_total_pedido}</Card.Footer>
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

    console.log(detailsModal.show)


    return (
        <>
            <span className="stretched-link btn shadow-none"  style={{"textDecoration" : "none"}} onClick={() => setDetailsModal({show: true, props: info})}>
                {
                    (
                        info.productos_comprados.length && 
                        <span>{`${info.productos_comprados[0].nombre_producto}/$${info.precio_total_pedido}`}</span>
                    ) ||
                    (
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