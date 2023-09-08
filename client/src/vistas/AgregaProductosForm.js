import { Form, Button, Container, Row } from "react-bootstrap";
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
    const [projectObj, setProject] = useState({
      nombre: "",
      descripcion: "",
      precio: "",
      categoria: "",
    });
  
    const handleChange = (event) => {
      const inputName = event.target.name
      const inputValue = event.target.value;
  
      setProject({
        ...projectObj,
        [inputName]: inputValue
      });
    }
  
    const [validated, setValidated] = useState(false);

    const handleSubmit =  (event) => {
        event.preventDefault();
  
        const form = event.currentTarget;
  
        if (form.checkValidity() === false || !projectObj.categoria) {
          event.preventDefault();
          event.stopPropagation();
          return
        }
        
        setValidated(true)

        console.log(projectObj)

        
        // fetch(process.env.REACT_APP_API_LINK, {
        //   method: "POST", // or 'PUT'
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(state),
        // })
        // .then((res) => res.json())
        // .then(result => {
        //   return nav("/see-issues", {replace : true, state: {project : state.issue_project}})
        // })
        // .catch(error => {
        //   console.log(error)
        // })
    }

  
    return (
        <Container className="mt-2">
            <Form as={Container} className="border" validated={validated}>
                <Form.Label as={Container} className="p-3 mt-2 border bg-light">
                <p className="display-6">
                    Agrega un producto nuevo
                </p>
                </Form.Label>
                <Container className="mb-2">
                <Form.Control value={projectObj.nombre} onChange={handleChange} type="text" placeholder="Nombre" name='nombre' required />
                <Form.Control value={projectObj.descripcion} onChange={handleChange} as="textarea" name="descripcion" placeholder="Descripción" required/>
                <Form.Control  step="0.01" type="number" value={projectObj.precio} onChange={handleChange} name="precio" placeholder="Precio" required/>


                <Form.Select value={projectObj.categoria} onChange={handleChange} name="categoria" required>
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
        </Container>
    );
}
  