import { Component, useState } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge, ButtonGroup, Modal, CardImg } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ListaProductos from "./Lista";
import Producto from "./ProductoModal";
// import Cookies from "js-cookie";
// require('dotenv').config();


class Index extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            allProductos : [],
            dataIsLoaded : false
        };
    }

    async componentDidMount(){
        try{
            await fetch("http://localhost:8080" + "/api/productos?buscaTodos=true") //?open=true")
            .then((res) => res.json()) //take the response string and turn it into a json array
            .then((json) => { //take the json array from the previous step...
                this.setState({
                    allProductos: json, //...and make our this.state.items<Array> == the JSON<Array> response
                    dataIsLoaded:true //changed status
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

    categoriasUnicas(){
        let categoriasArr = [...new Set(this.state.allProductos.map(obj => obj["categoria_string"]))];
        let idsArr =  [...new Set(this.state.allProductos.map(obj => obj["categoria_id"]))];

        let searchResults = [];

        const singleResult = {
            name: "",
            id: 0
        };          

        for(let categoria of categoriasArr){
            let nameAndId;
            for(let id of idsArr){
                nameAndId = Object.create(singleResult, {
                    name: {value : categoria},
                    id: {value :  id},
                });

            }
            searchResults.push(nameAndId);
        }

        return searchResults;
    }

    render() {

        // console.log(Cookies.get("cacheDatos"))
        let CategoriaCards = () => {
            let parCategoriaCantidad = this.categoriasUnicas("categoria_string");

            return parCategoriaCantidad.map((categoria, index) => {
                return(
                    <>  
                        <Row >
                            <Col md="12" className="mt-2">
                                <Container key={categoria.name}>
                                    <Card key={index}>
                                        <Card.Body>
                                            <Card.Title>{categoria.name}</Card.Title>
                                            <ButtonGroup>
                                                <LinkContainer to={`/resultados`} replace state={{categoria_id : categoria.id}}>
                                                    <Card.Link><Button>Miralos</Button></Card.Link>
                                                </LinkContainer>
                                            </ButtonGroup>
                                        </Card.Body>
                                    </Card>
                                </Container>
                            </Col>
                        </Row>

                    </>
                )
            }) 
        }

        let ProductoCards = () => {
            let ProductosAr = this.state.allProductos.map((producto, index) => {
                // index === 0 && console.log(producto.direccion_imagen)
                return (
                    <Col lg="3" md="6" sm="6"> 
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Container as={"div"} className="text-center" style={{"transform": "rotate(0)"}}>
                                <CardImg src={producto.direccion_imagen} style={{"aspectRatio": "1 / 1"}}/>                   
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        <Producto props={producto}/>  
                                    </Card.Title>
                                    <Card.Text className="text-center">
                                        Precio: {`${producto.precio}$`}
                                    </Card.Text>
                                </Card.Body>
                            </Container>
                            <Card.Footer as="div" className="d-grid gap-2">
                                    <Button>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                        </svg>
                                    </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })

            return(
                <Row>
                    {ProductosAr}
                </Row>
            )

        }

        if(!this.state.dataIsLoaded){
            return (
                <Container fluid className="mt-2 p-4  col-lg-8 border bg-light">
                    <h1>Espere...</h1>
                </Container>
            )
        } 
  
        if(!this.state.allProductos.length){
            return(
                <Container className="mx-auto">
                    <Row>
                        <Col>
                            <Container className="mt-1 justify-content-center p-3 border bg-light">
                                <Container className="text-center">
                                    <h2>No hay productos!</h2>
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid className="mb-5">
                    <Row>
                        <Col lg={8}>
                            <Container>
                                <hr className="d-lg-none"/>
                                <p className="display-5">Nuestros productos</p> 
                                <hr/>
                            </Container>
                            <ProductoCards/>
                        </Col>
                        <Col lg={4} className="mt-1">
                            <Container>
                                <hr className="d-lg-none"/>
                                <p className="display-6">Categorias</p> 
                                <hr/>
                            </Container>
                            <CategoriaCards/>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default Index