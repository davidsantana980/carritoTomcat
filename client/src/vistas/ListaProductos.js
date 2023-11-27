import {  Component } from "react"
import { Button, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { Navigate, useLocation } from "react-router-dom"
import Producto from "./modales/ProductoModal";

class ClaseListaProductos extends Component{
    //copia los parametros a una variable local
    queryParams = {...this.props.params}

    constructor(props) {
        super(props);
        this.state = {
            listaDeProductos : [],
            dataIsLoaded : false,
            message : "",
            productoModal : {
                show : false,
                detallesProducto : {},
            }
        };

        if(!this.props.params) return <Navigate to={"/"}/>;

        if(!!this.props.params){ 
            //si hay parametros, borra los indefinidos
            Object.keys(this.props.params).forEach(key => {
                return !this.queryParams[key] && typeof(this.queryParams[key]) !== "boolean" ? delete this.queryParams[key] : {}
            });
        }
    
    }

    async componentDidMount(){
        try{
            let url = `http://localhost:8080/api/productos?${new URLSearchParams(this.queryParams).toString()}` 

            await fetch(url)
            .then((res) => res.json()) //take the response string and turn it into a json array
            .then((json) => { //take the json array from the previous step...
                if(typeof json === "object" && json.length >= 1){
                    return this.setState({
                        listaDeProductos: json, //...and make our this.state.items<Array> == the JSON<Array> response
                        dataIsLoaded:true //changed status
                    })
                }
    
                return this.setState({
                    dataIsLoaded : false,
                    message : "Ups! No hay resultados"
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
        // if(!this.props.params) return nav("/", {replace : true});
        
        if(this.state.dataIsLoaded){
            let productoCards = this.state.listaDeProductos.map((producto, index) => {
                return (
                        <Container fluid key={index} className="mb-2">
                            <Card key={index} className="text-center">
                                <Card.Body>
                                    <Row className="mb-3">
                                        <Col>
                                            <Container fluid>
                                                <Card.Title as={Button} className="btn-light">
                                                    <span className="stretched-link btn shadow-none"  style={{"textDecoration" : "none"}} onClick={() => {
                                                        this.setState({productoModal : {show : true, detallesProducto : producto}})
                                                    }}>
                                                        <span>{producto.nombre}</span>
                                                    </span>
                                                </Card.Title>
                                                <Card.Text>
                                                    {producto.descripcion ? (
                                                        <span className="text-muted" >${producto.precio}</span>
                                                    ) : (
                                                        "Mira mas detalles"
                                                    )}
                                                </Card.Text>
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
                    <Container fluid className="mt-1 mb-2 p-3  col-lg-8 border bg-light">
                        <span className="display-6">Resultados:</span>
                    </Container>
                    <Container className="border col-md-12 col-lg-8 mb-5" >
                        <CardGroup className="mt-3">
                            {productoCards}
                        </CardGroup>
                    </Container>
                    <Producto 
                        admin={false} 
                        detallesProducto={this.state.productoModal.detallesProducto}
                        show = {this.state.productoModal.show} 
                        onHide = {() => this.setState({productoModal : {...this.state.productoModal, show : false}})}
                    />
                </>
            ) 


        }

        let message = "Espere..."

        if(this.state.message){
            message = this.state.message
        }

        return (
            <Container fluid className="mt-2 p-4  col-lg-8 border bg-light">
                <h1>{message}</h1>
            </Container>
        )
    }
}

export default function ListaProductos(props){
    const {state} = useLocation();

    return <ClaseListaProductos {...props} params={state} />
}