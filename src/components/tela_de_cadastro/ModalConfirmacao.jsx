import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        // 🚀 Quando o back-end estiver pronto, essa parte será substituída pela requisição.
    // fetch("/api/validar-codigo", { method: "POST", body: JSON.stringify({ codigo }) })
    //   .then(res => res.json())
    //   .then(data => {
    //     if (data.sucesso) acessarAreaRestrita();
    //     else alert("Código inválido.");
    //   });



    // 🚀 Simulação de validação do código
    setTimeout(() => {
      const rotaDestino = tipoUsuario === "ONG" ? "/perfil-ong" : "/perfil-usuario";
      navigate(rotaDestino); // Redireciona para a rota correta
      fecharModal();
    }, );
  };

  return (
    <div className="modal-overlay" onClick={fecharModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={fecharModal}>✖</button>
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
