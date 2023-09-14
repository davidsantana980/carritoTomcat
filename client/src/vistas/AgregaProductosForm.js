import { Form, Button, Container, Row, Badge } from "react-bootstrap";
import {useEffect, useState} from "react";
import { LinkContainer } from "react-router-bootstrap";

let CategoriasDropdown = () => {
    // try{
        const [state, setState] = useState({
            categoriasArr : []
        });
        
        const fetchData = () => {
            fetch("http://localhost:8080" + "/ControladorCategoria")
            .then(res => res.json())
            .then((json) => { //take the json array from the previous step...
                setState({
                    categoriasArr: json, //...and make our this.state.items<Array> == the JSON<Array> response
                })
            })
            .catch((error) => {
                throw new Error("Network response was not OK");
            })
        }

        useEffect(() => {
            fetchData()
        }, [])



        const Options = () => state.categoriasArr.map(categoria => {
            return (
                <option value={categoria.id}>{categoria.nombre}</option>
            )
        })
        
        return (
            <>
                <Options/>
            </>
        );
    // }catch(e){
    //     console.log(e);
    // }
}

export default function AgregaProductosForm() {
    const [productoObj, setProject] = useState({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
    });
  
    const handleChange = (event) => {
      const inputName = event.target.name
      const inputValue = event.target.value;
  
      setProject({
        ...productoObj,
        [inputName]: inputValue
      });
    }
  
    const [validated, setValidated] = useState(false);

    const handleSubmit =  (event) => {
        setValidated(false);
        event.preventDefault();
  
        const form = event.currentTarget;
  
        if (form.checkValidity() === false || !productoObj.categoria) {
          event.preventDefault();
          event.stopPropagation();
          return
        }
        
        setValidated(true)
        
        fetch("http://localhost:8080" + "/api/productos", {
          method: "POST",
          body: new URLSearchParams(productoObj),
        })
        .then((res) => res.json())
        .then(result => {
          return;
        })
        .catch(error => {
          console.log(error)
        })
    }

    // console.log(JSON.parse(window.localStorage.getItem("x")))
  
    return (
        <Container className="mt-2">
            <Form as={Container} className="border" validated={validated}>
                <Form.Label as={Container} className="p-3 mt-2 border bg-light">
                <p className="display-6">
                    Agrega un producto nuevo
                </p>
                </Form.Label>
                <Container className="mb-2">
                    <Form.Control value={productoObj.nombre} onChange={handleChange} type="text" placeholder="Nombre" name='nombre' required />
                    <Form.Control value={productoObj.descripcion} onChange={handleChange} as="textarea" name="descripcion" placeholder="Descripción" required/>
                    <Form.Control onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} step="0.1" type="number" value={productoObj.precio} onChange={handleChange} name="precio" placeholder="Precio" required/>


                    <Form.Select value={productoObj.categoria} onChange={handleChange} name="categoria" required>
                        <option value="">Categoría</option>
                        <CategoriasDropdown/>
                    </Form.Select>
                    <Container fluid className="d-grid mt-1">
                        {/* <LinkContainer to="/see-issues" state={projectObj}>   */}
                        <Button variant="primary" onClick={handleSubmit} className="mt-2" type="submit">Search</Button>
                        {/* </LinkContainer> */}
                    </Container> 
                </Container>
            </Form>
            <p className="display-3 text-center"><Badge bg="success">{validated ? `Producto agregado!` : ""}</Badge></p>
        </Container>
    );
}
  