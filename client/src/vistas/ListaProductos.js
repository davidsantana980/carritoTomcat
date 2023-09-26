import { useState, useEffect, useCallback, useMemo } from "react"
import { Button, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import Producto from "./modales/ProductoModal";

export default function ListaProductos(){
    //recibe los parametros
    let nav = useNavigate();
    let {state : params} = useLocation();
    //copia los parametros a una variable local
    let queryParams = useMemo(() => {
        return {...params}
    }, [params])

    if(!!params){ 
        //si hay parametros, borra los indefinidos
        Object.keys(params).forEach(key => {
            return !queryParams[key] && typeof(queryParams[key]) !== "boolean" ? delete queryParams[key] : {}
        });
    }

    const [state, changeState] = useState({
        listaDeProductos : [],
        dataIsLoaded : false,
        message : ""
    })
    
    let loadItems = useCallback(() => {
        let url = `http://localhost:8080/api/productos?${new URLSearchParams(queryParams).toString()}` 
        
        fetch(url)
        .then((res) => res.json()) //take the response string and turn it into a json array
        .then((json) => { //take the json array from the previous step...
            if(typeof json === "object" && json.length >= 1){
                return changeState({
                    listaDeProductos: json, //...and make our this.state.items<Array> == the JSON<Array> response
                    dataIsLoaded:true //changed status
                })
            }

            return changeState({
                dataIsLoaded : false,
                message : "Ups! No hay resultados"
            })
        })  
    }, [queryParams])

    useEffect(() => {
        if(!params) return nav("/", {replace : true});
        return loadItems
    }, [state.dataIsLoaded, loadItems, nav, params])

    if(state.dataIsLoaded){
        let productoCards = state.listaDeProductos.map((producto, index) => {
            return (
                    <Container fluid key={index} className="mb-2">
                        <Card key={index} className="text-center">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col>
                                        <Container fluid>
                                            <Card.Title as={Button} className="btn-light">
                                                <Producto props={producto}/>
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
            </>
        ) 


    }

    let message = "Espere..."

    if(state.message){
        message = state.message
    }

    return (
        <Container fluid className="mt-2 p-4  col-lg-8 border bg-light">
            <h1>{message}</h1>
        </Container>
    )
}