import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#f2f2f2",
    width: "500px",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
};

Modal.setAppElement("#root");

const BotonModal = () => {
  const [modalIsOpen, setAbierto] = useState(false);

  function abrirModal() {
    setAbierto(true);
  }

  function cerrarModal() {
    setAbierto(false);
  }

  return (
    <div>
      <button onClick={abrirModal}>Comprar</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={cerrarModal}
        style={customStyles}
      >
        <div>
          <h3>Datos del producto</h3>
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Categoría" />
          <input type="text" placeholder="Precio" />
        </div>
        <div>
          <button>Cantidad</button>
          <input type="number" placeholder="0" />
          <button>Confirmar</button>
          <button onClick={cerrarModal}>Cancelar</button>
        </div>
      </Modal>
    </div>
  );
};

export default BotonModal;
