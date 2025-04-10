import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Importando o ícone FaTimes

const ModalConfirmacao = ({ fecharModal, tipoUsuario }) => {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setCodigo(e.target.value);
  };

  const registrar = () => {
    if (codigo.trim() === "") {
      alert("Digite o código enviado para o seu e-mail.");
      return;
    }

    // // 🚀 Simulação de validação do código
    // setTimeout(() => {
    //   const rotaDestino = tipoUsuario === "ONG" ? "/perfil-ong" : "/perfil-usuario";
    //   navigate(rotaDestino); // Redireciona para a rota correta
    //   fecharModal();
    // }, 1000); // Adicionado um tempo de espera simulado
  };

  return (
    <div className="modal-overlay" onClick={fecharModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={fecharModal} aria-label="Fechar modal">
          <FaTimes size={24} />
        </button>
        <h2 className="confirma">Confirmação de E-mail</h2>
        <p className="confirmar-email">Enviamos um código de validação para o e-mail cadastrado.</p>
        <div className="inputs-container">
          <input
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={handleChange}
          />
        </div>
        <button className="btn-registrar" onClick={registrar}>Registrar</button>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
