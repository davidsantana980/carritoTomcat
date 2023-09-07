import { Component, useState } from "react";
import { Container, Card, CardGroup, Button, Row, Col, Badge, ButtonGroup, Modal, CardImg } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Lista from "./Lista";
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

    uniqueProjectsByProp(prop){
        let uniqueByPropArray = [...new Set(this.state.allProductos.map(obj => obj[prop]))];
        let searchResults = [];

        const singleResult = {
            name: "",
            totalCount: 0
        };          

        for(let propName of uniqueByPropArray){
            let nameAndCounts = Object.create(singleResult, {
                name: {value : propName},
                //if the searched prop is a producto or assignment list of issues, the count will be 1) the "open" amount of issues and 2) the total amount of issues for said prop. 
                totalCount: {value :  this.state.allProductos.filter(issue => issue[prop] === propName).length },
            });

            searchResults.push(nameAndCounts);
        }

        return searchResults;
    }

    render() {

        let CategoriaCards = () => {
            let parCategoriaCantidad = this.uniqueProjectsByProp("categoria_string");

            return parCategoriaCantidad.map((producto, index) => {
                return(
                    <>  
                        <Row >
                            <Col md="12" className="mt-2">
                                <Container key={producto.name}>
                                    <Card key={index}>
                                        <Card.Body>
                                            <Card.Title>{producto.name}</Card.Title>
                                            <ButtonGroup>
                                                <LinkContainer to={`/ver-productos`} state={{producto : producto.name}}>
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
                return (
                    <Col lg="3" md="6" sm="6"> 
                        <Card className="w-100 my-2 shadow-2-strong">
                            <CardImg src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp" style={{"aspect-ratio": "1 / 1"}}/>                   
                            <Card.Body className="d-flex flex-column">
                                <Card.Title><h5>{producto.nombre}</h5></Card.Title>
                                <Card.Text>{`${producto.precio}$`}</Card.Text>
                                <Card.Footer className="d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                                    <Button href="" className="shadow-0 me-1">Añade al carrito</Button>
                                </Card.Footer>
                            </Card.Body>
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
                    <h1>Please wait...</h1>
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
                                <text className="display-5">Nuestros productos</text> 
                                <hr/>
                            </Container>
                            <ProductoCards/>
                        </Col>
                        <Col lg={4} className="mt-1">
                            <Container>
                                <text className="display-6">Categorias</text> 
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