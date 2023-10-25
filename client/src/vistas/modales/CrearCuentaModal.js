import { useState } from "react";
import {  Alert, Button, Form, Modal } from "react-bootstrap"

export default function CrearCuentaModal (props={administrador : false}) {
    const [datosUsuario, setDatos] = useState({
        nombre: "",
        email: "",
        password: "",
        direccion: "",
        tipo: 2
    });

    const [estatus, setEstatus] = useState({
        error: false,
        exito: false
    });
          
    const handleChange = (event) => {
        const inputName = event.target.name
        let inputValue = event.target.value;
    
        if(inputName === "tipo"){
            inputValue = datosUsuario.tipo === 1 ? 2 : 1;
        }

        setDatos({
          ...datosUsuario,
          [inputName]: inputValue
        });

        console.log(datosUsuario)
    }

    let handleSubmit = () => {

        // console.log(JSON.stringify(datosUsuario))
            try{        
                fetch('http://localhost:8080/api/usuarios', {
                    method: "POST",
                    credentials:"include",
                    body: new URLSearchParams(datosUsuario)
                })
                .then(async res => {
                    let mensaje = await res.json()

                    return {
                        ok : res.ok,
                        ...mensaje
                    }
                    
                })
                .then(res => {
                    if(!res.ok){
                        setEstatus({error : !res.ok})
                    }else{
                        setEstatus({exito : true})
                    }
                    console.log(res)
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
                    <p className="text-center modal-title w-100 font-weight-bold">Introduce tus datos:</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form validated>
                    <Form.Floating className="mb-5">
                        <Form.Control required type="text" value={datosUsuario.nombre} onChange={handleChange}  id="nombre" name="nombre" className=""/>
                        <Form.Label data-error="wrong" data-success="right">
                            Tu nombre
                        </Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-5">
                        <Form.Control required type="email" value={datosUsuario.email} onChange={handleChange}  id="email" name="email" className=""/>
                        <Form.Label data-error="wrong" data-success="right" htmlFor="defaultForm-email">
                            <i className="fa fa-envelope prefix grey-text"></i> Tu email
                        </Form.Label>
                    </Form.Floating>

                    <Form.Floating className="md-form mb-4">
                        <Form.Control required type="password" value={datosUsuario.password} onChange={handleChange} id="password" name="password" className=""/>
                        <Form.Label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">
                            <i className="fa fa-lock prefix grey-text"></i> Tu contraseña
                        </Form.Label>
                    </Form.Floating>

                    <Form.Floating className="md-form mb-4">
                        <Form.Control type="text" value={datosUsuario.direccion} onChange={handleChange} id="direccion" name="direccion" className=""/>
                        <Form.Label data-error="wrong" data-success="right" htmlFor="defaultForm-address">
                            Tu direccion (opcional)
                        </Form.Label>
                    </Form.Floating>

                    {props.administrador && <Form.Check name="tipo" value={datosUsuario.tipo} onClick={handleChange} type="switch" className="md-form mb-4" label="Tipo administrador"/>}

                    <Alert variant="danger" hidden={!estatus.error} >
                        Llena todos los campos marcados
                    </Alert>
                    <Alert variant="success" hidden={!estatus.exito}>
                        Usuario creado correctamente! Ahora puedes iniciar sesión con tu nueva cuenta.
                    </Alert>                                   
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button type="submit" onClick={handleSubmit}>Confirmar datos</Button>
            </Modal.Footer>
        </Modal>
    )
}

