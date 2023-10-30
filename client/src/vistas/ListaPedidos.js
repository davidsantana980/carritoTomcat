import { Component } from "react"
import {  Alert, Button, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import Pedido from "./modales/PedidoModal";

class ListaPedidos extends Component{

    constructor(props = {admin: false, usuario_id : 0}) {
        super(props);

        this.props= props;
        this.state = {
            listaDePedidos : [],
            dataIsLoaded : false,
            message : ""
        };
    }

    async componentDidMount(){
        try{
            let usuario_id = this.props.usuario_id;

            let url = this.props.admin ? `http://localhost:8080/api/pedidos` : `http://localhost:8080/api/pedidos?usuario_id=${usuario_id}` 
            await fetch(url, {
                credentials : "include"
            })
            .then((res) => res.json()) //take the response string and turn it into a json array
            .then((json) => { //take the json array from the previous step...
                if(typeof json === "object" && json.length >= 1){
                    console.log(json)
                    return this.setState({
                        listaDePedidos: json, //...and make our this.state.items<Array> == the JSON<Array> response
                        dataIsLoaded:true //changed status
                    })
                }
                return this.setState({
                    dataIsLoaded : false,
                    message : this.props.admin ? "No hay pedidos en la base de datos" : "Parece que aún no has hecho ningún pedido"
                })
            })
            .catch((error) => {
                throw new Error("Network response was not OK");
            })

    
        }catch(error){
            console.log(error)
            this.setState({
                dataIsLoaded:true //changed status
            })
        }
    }

    render(){
        if(this.state.dataIsLoaded){
            let PedidoCards = () => this.state.listaDePedidos.map((pedido, index) => {
                return (
                        <Container fluid key={index} className="mb-2">
                            <Card key={index} className="text-center">
                                {this.props.admin ? <Card.Header>Compra del usuario {pedido.usuario_id}</Card.Header> : ""}
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col>
                                            <Container fluid>
                                                <Card.Title as={Button}  className="btn-light">
                                                    <Pedido props={pedido}/>
                                                </Card.Title>
                                                <Card.Text>
                                                    <span><b>{pedido.fecha_pedido}</b></span>
                                                </Card.Text>
                                                <Alert variant="danger" hidden={pedido.pagado}>¡Este pedido está pendiente!</Alert>
                                                <Alert variant="success" hidden={!pedido.pagado}>¡Este pedido ha sido pagado!</Alert>
                                            </Container>    
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                )
            })

            return (
                <>
                    <Container fluid className="mt-1 p-3 col-lg-8 border bg-light">
                        <span className="display-6">{!this.props.admin ? "Tus pedidos" : "Todos los pedidos hechos"}:</span>
                    </Container>
                    <Container className="border col-md-12 col-lg-8 mb-5" >
                        <CardGroup className="mt-3">
                            <PedidoCards />
                        </CardGroup>
                    </Container>
                </>
            ) 


        }

        let message = "Espere..."

        if(this.state.message){
            message = this.state.message
        }

        return (
            <Container fluid className="mt-2 p-4 col-lg-8 border bg-light">
                <h1>{message}</h1>
            </Container>
        )
    }
}

export default ListaPedidos