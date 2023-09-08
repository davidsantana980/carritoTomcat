import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Modal} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LinkContainer } from "react-router-bootstrap";

let DetallesProducto = (props) => {
    let info = {...props.props}
   
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-deleteModal-title-vcenter"
          centered
        >
            <Modal.Body>
                <Container >
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">{info.nombre}</Card.Title>
                            <hr/>
                            <Card.Subtitle className="mb-3 text-muted mt-2">
                                <Card.Text as="div">
                                    Categoria: <b>{info.categoria_string}</b> 
                                </Card.Text>
                            </Card.Subtitle>
                            <hr/>
                            <Card.Text>
                                {info.descripcion}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{info.disponible ? "Disponible" : "Agotado"}</ListGroup.Item>
                        </ListGroup>
                        <Card.Footer>Precio: {info.precio}</Card.Footer>
                    </Card>
                </Container>
            </Modal.Body>
        </Modal>
    )
} 


export default function Producto (props) {
    let info = {...props.props};
    const [detailsModal, setDetailsModal] = useState({show: false, props : {}});

    if(!info){
        return (
            <Container>
                <h1>Error inesperado, no se consiguió el producto</h1>
            </Container>
        )
    }

    return (
        <a className="stretched-link btn shadow-none"  style={{"textDecoration" : "none"}} onClick={() => setDetailsModal({show: true, props: info})}>
            <span>{info.nombre}</span>
            <DetallesProducto 
                show={detailsModal.show}
                onHide={() => setDetailsModal({show :false})}
                props={detailsModal.props}
            />
        </a>        
    )
}