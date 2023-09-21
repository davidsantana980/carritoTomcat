import { useState, useEffect, useCallback } from "react"
import {  Button, ButtonGroup, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
// import { useLocation, useNavigate } from "react-router-dom"
// import Producto from "./ProductoModal";
import Pedido from "./PedidoModal";

function ListaPedidos() {
    //get query params from location reference
    // let nav = useNavigate();
    // let {state : params} = useLocation();
    // //copy params
    // let queryParams = useMemo(() => {
    //     return {...params}
    // }, [params])

    // if(!!params){ 
    //     //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
    //     Object.keys(params).forEach(key => {
    //         return !queryParams[key] && typeof(queryParams[key]) !== "boolean" ? delete queryParams[key] : {}
    //     });
    // }

    const [state, changeState] = useState({
        listaDePedidos : [],
        dataIsLoaded : false,
        message : ""
    })
    
    let loadItems = useCallback(() => {
        let url = `http://localhost:8080/api/pedidos` 
    
        fetch(url)
        .then((res) => res.json()) //take the response string and turn it into a json array
        .then((json) => { //take the json array from the previous step...
            if(typeof json === "object" && json.length >= 1){
                // console.log(json)
                return changeState({
                    listaDePedidos: json, //...and make our this.state.items<Array> == the JSON<Array> response
                    dataIsLoaded:true //changed status
                })
            }

            return changeState({
                dataIsLoaded : false,
                message : "Parece que aún no has hecho ningún pedido"
            })
        })  
    }, [])

    useEffect(() => {
        // if(!params) return nav("/", {replace : true});
        return loadItems
    }, [loadItems])

    if(state.dataIsLoaded){
        let pedidoCards = state.listaDePedidos.map((pedido, index) => {
            return (
                    <Container fluid key={index} className="mb-2">
                        <Card key={index} className="text-center">
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
                    <span className="display-6">Tus pedidos pendientes:</span>
                </Container>
                <Container className="border col-md-12 col-lg-8 mb-5" >
                    <CardGroup className="mt-3">
                        {pedidoCards}
                    </CardGroup>
                </Container>
            </>
        ) 


    }

    let message = "Espere..."

    if(state.message){
        message = state.message
    }

    return (
        <Container fluid className="mt-2 p-4 col-lg-8 border bg-light">
            <h1>{message}</h1>
        </Container>
    )
}

export default ListaPedidos