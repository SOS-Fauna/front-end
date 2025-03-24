import React, { useReducer, useState } from "react";
import ModalCadastroONG from "../components/tela_de_cadastro/ModalCadastroONG";
import ModalCadastroDenunciante from "../components/tela_de_cadastro/ModalCadastroDenunciante";
import ModalConfirmacao from "../components/tela_de_cadastro/ModalConfirmacao";
import googleimg from '../assets/google-img.png'
import "../styles/AcessoPerfil.css";

const initialState = { modalAberto: "acesso", tipoUsuario: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TIPO_USUARIO":
      return { ...state, tipoUsuario: action.payload };
    case "ABRIR_CADASTRO":
      return { ...state, modalAberto: state.tipoUsuario === "ONG" ? "cadastroONG" : "cadastroDenunciante" };
    case "ABRIR_CONFIRMACAO":
      return { ...state, modalAberto: "confirmacao" };
    case "VOLTAR":
      return { ...state, modalAberto: "acesso", tipoUsuario: null };
    default:
      return state;
  }
};

const BotaoUsuario = ({ selecionarTipo }) => (
  <div className="botoes-acesso">
    <button onClick={() => selecionarTipo("ONG")} aria-label="Selecionar ONG">ONG</button>
    <button onClick={() => selecionarTipo("Denunciante")} aria-label="Selecionar Denunciante">Denunciante</button>
  </div>
);

const FormLogin = ({ setErro, fecharModal, setUsuarioLogado, tipoUsuarioSelecionado }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setErro("Preenchimento errado.");
      return;
    }

    // Usa o tipo de usuário selecionado, se disponível, senão tenta inferir pelo e-mail
    const tipoUsuario = tipoUsuarioSelecionado || (email.includes("ong") ? "ONG" : "Denunciante");

    localStorage.setItem("usuarioTipo", tipoUsuario);
    setUsuarioLogado(tipoUsuario);
    fecharModal();
  };

  return (
    <>
      <div className="inputs-container">
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="E-mail" />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} aria-label="Senha" />
      </div>
      <button className="btn-entrar" onClick={handleLogin}>Entrar</button>
    </>
  );
};

const AcessoPerfil = ({ fecharModal, setUsuarioLogado }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [erro, setErro] = useState("");

  const handleCadastroFinalizado = (tipoUsuario) => {
    localStorage.setItem("usuarioTipo", tipoUsuario);
    setUsuarioLogado(tipoUsuario);
    dispatch({ type: "ABRIR_CONFIRMACAO" }); // Garante que a confirmação será aberta antes de fechar o modal
  };
  
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={fecharModal} aria-label="Fechar modal">✖</button>

        {state.modalAberto === "acesso" && (
          <>
            <h2>Acessar Perfil</h2>
            {erro && <p className="mensagem-erro">{erro}</p>}

            {state.tipoUsuario ? <p><strong>{state.tipoUsuario}</strong></p> : <BotaoUsuario selecionarTipo={(tipo) => dispatch({ type: "SET_TIPO_USUARIO", payload: tipo })} />}

            <button className="btn-google">
  <img src={googleimg} alt="Google" className="google-icon" />
  Continuar com Google
</button>
            <p className="ou-texto">ou</p>
            <p className="acesso-email-texto">Acesse seu perfil com email e senha</p>

            <FormLogin 
              setErro={setErro} 
              fecharModal={fecharModal} 
              setUsuarioLogado={setUsuarioLogado} 
              tipoUsuarioSelecionado={state.tipoUsuario} // Passa a seleção correta para o login
            />

            <div className="links-acesso">
              <a href="#">Redefinir Senha</a>
              <a href="#" onClick={() => state.tipoUsuario ? dispatch({ type: "ABRIR_CADASTRO" }) : setErro("Selecione ONG ou Denunciante!")}>Criar Conta</a>
            </div>
          </>
        )}

        {state.modalAberto === "cadastroONG" && (
          <ModalCadastroONG 
            abrirConfirmacao={() => dispatch({ type: "ABRIR_CONFIRMACAO" })} 
            fecharModal={fecharModal} 
            onCadastroFinalizado={() => handleCadastroFinalizado("ONG")} 
          />
        )}

        {state.modalAberto === "cadastroDenunciante" && (
          <ModalCadastroDenunciante 
            abrirConfirmacao={() => dispatch({ type: "ABRIR_CONFIRMACAO" })} 
            fecharModal={fecharModal} 
            onCadastroFinalizado={() => handleCadastroFinalizado("Denunciante")} 
          />
        )}

        {state.modalAberto === "confirmacao" && <ModalConfirmacao fecharModal={fecharModal} tipoUsuario={state.tipoUsuario} />}
      </div>
    </div>
  );
};

export default AcessoPerfil;
