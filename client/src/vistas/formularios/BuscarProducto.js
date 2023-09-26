import { Container, Form, Button, FormGroup } from "react-bootstrap";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function BuscarProducto(){
    let nav = useNavigate();

    const [state, setState] = useState({
      producto: ""
    });

    const [validated, setValidated] = useState(false);
  
    const handleChange = (event) => {
      const inputValue = event.target.value;
  
      setState({
        producto: inputValue
      });
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }
      
        setValidated(true)

        return nav("/resultados", {replace : true, state: {nombre : state.producto}})
    }
  
    return (
        <Container>
            <Form id="buscarProducto" validated={validated}>
                <FormGroup className="mb-2">
                  <Form.Control required value={state.producto} onChange={handleChange} type="text" name="nombre" placeholder="Nombre del producto" />
                </FormGroup>       
                <Container fluid className="d-grid mt-1">
                  <Button type="submit"  onClick={handleSubmit}>Buscar</Button>
                </Container>
            </Form>
        </Container>
    )
  }
  