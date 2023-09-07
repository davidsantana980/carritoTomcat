import { useState, useEffect, useCallback, useMemo } from "react"
import { Badge, Button, ButtonGroup, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import Producto from "./ProductoModal";

export default function ListaProductos(){
    //get query params from location reference
    let nav = useNavigate();
    let {state : params} = useLocation();
    //copy params
    let queryParams = useMemo(() => {
        return {...params}
    }, [params])

    if(!!params){ 
        //delete undefined body parameters EXCEPT FOR "open", which is a boolean and can be falsy
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

        console.log(url)
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
                message : "Oops! Not found"
            })
        })  
    }, [queryParams])

    useEffect(() => {
        if(!params) return nav("/", {replace : true});
        return loadItems
    }, [state.dataIsLoaded, loadItems, nav, params])

    function ReturnButton  (props) {
        return (
            <Container className="d-grid mt-3">
                <LinkContainer to={`/`} >
                    <Button variant="primary" size="lg">
                        Go back to main menu
                    </Button>
                </LinkContainer> 
            </Container>
        )
    }

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
                                                    <span><b>{producto.descripcion}</b></span>
                                                ) : (
                                                    "Mira mas detalles"
                                                )}
                                            </Card.Text>
                                        </Container>    
                                    </Col>
                                </Row>
                                <Row >
                                    <Container>
                                        {/* <ButtonGroup className="flex-wrap">
                                            <Card.Link as={Button} className="btn btn-dark">
                                                <Issue props={producto}/>
                                            </Card.Link>
                                            <Card.Link as={Button} className={`btn ${producto.open ? "btn-success" : "btn-primary"}`}>
                                                <span onClick={() => closeIssue({_id: producto._id , open: !producto.open})} >{producto.open ? "Close this producto" : "Re-open producto"}</span>
                                            </Card.Link>                     
                                            <Card.Link as={Button} className="btn btn-secondary">
                                                <UpdateIssueForm  props = {producto}>Update producto</UpdateIssueForm>
                                            </Card.Link>
                                        </ButtonGroup> */}
                                    </Container>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
            )
        })

        return (
            <>
                <Container fluid className="mt-1 p-3  col-lg-8 border bg-light">
                    <text className="display-6">Resultados:</text>
                </Container>
                <Container className="border col-md-12 col-lg-8 mb-5" >
                    <CardGroup className="mt-3">
                        {productoCards}
                    </CardGroup>
                </Container>
            </>
        ) 


    }

    let message = "Please wait..."

    if(state.message){
        message = state.message
    }

    return (
        <Container fluid className="mt-2 p-4  col-lg-8 border bg-light">
            <h1>{message}</h1>
        </Container>
    )
}