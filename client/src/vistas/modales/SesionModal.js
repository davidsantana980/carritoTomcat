import { useState } from "react";
import {  Alert, Button, Form, Modal } from "react-bootstrap"

export default function SesionModal (props) {
    const [datosUsuario, setDatos] = useState({
        email: "",
        password: "",
    });

    const [estatus, setEstatus] = useState({
        error: false,
        exito : false
    });
          
    const handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value;
    
        setDatos({
          ...datosUsuario,
          [inputName]: inputValue
        });
    }

    let handleCompra = (pedido) => {    
        try{
            fetch("http://localhost:8080/api/pedidos?", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(pedido)
            })
            .then(res => res.json())
            .then(result => {
                setEstatus({exito : true})
            })
        }catch(e){
            console.log(e)
        }
    }

    let handleSubmit = () => {
        try{
            let info = {
                datosUsuario: datosUsuario,
                infoCompra : props.infoCompra,
                protocolo : props.protocolo
            }
            
            fetch("http://localhost:8080/ControladorUsuario?" + new URLSearchParams(info.datosUsuario))
            .then(res => res.json())
            .then(resultado => {
                if(!!resultado.length){
                    setEstatus({error : false})
                    let usuario_id = resultado[0].id;
        
                    if(info.protocolo === "compra") {
                        let pedido = {
                            usuario_id,
                            productos_comprados : JSON.stringify([
                                {
                                    id_producto : info.infoCompra.producto.id ,
                                    cantidad_producto : info.infoCompra.cantidad_producto
                                }
                            ])
                        }
    
                        handleCompra(pedido);
                    }
                }else{
                    setEstatus({error : true})
                }    
            })
            .catch(error => {
                console.log(error)
            })

        }catch(e){
            console.log(e)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="">
                <Modal.Title className="" id="contained-modal-title-vcenter">
                    <p className="text-center modal-title w-100 font-weight-bold">Confirma tu identidad</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Floating className="mb-5">
                    <Form.Control required type="email" value={datosUsuario.email} onChange={handleChange}  id="email" name="email" className=""/>
                    <Form.Label data-error="wrong" data-success="right" htmlFor="defaultForm-email">
                        <i className="fa fa-envelope prefix grey-text"></i> Tu email
                    </Form.Label>
                </Form.Floating>

                <Form.Floating className="md-form mb-4">
                    <Form.Control required type="password" value={datosUsuario.password} onChange={handleChange} id="password" name="password" className=""/>
                    <Form.Label data-error="wrong" data-success="right" for="defaultForm-pass">
                        <i className="fa fa-lock prefix grey-text"></i> Tu password
                    </Form.Label>
                </Form.Floating>

                <Alert variant="danger" hidden={!estatus.error} >
                    Usuario o contraseña incorrectos
                </Alert>
                <Alert variant="success" hidden={!estatus.exito}>
                    Pedido realizado correctamente! Puedes mirar los detalles en el apartado de pedidos.
                </Alert>                                   
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button type="submit" onClick={handleSubmit}>Confirmar datos</Button>
            </Modal.Footer>
        </Modal>
    )
}       
