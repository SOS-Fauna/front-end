import React, { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importando o ícone FaTimes

 function ModalRedefinirSenha({ fecharModal, tipoUsuario }) {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [passo, setPasso] = useState(1); 
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // URL Base dependendo do tipo de usuário
  const urlBase = tipoUsuario === "ONG" ? "/reset" : "/reset";

  // Solicitar o token de redefinição
  const solicitarCodigo = async () => {
    if (!email) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }
    setErro("");
    try {
      const endpoint = `${urlBase}/solicitar/${tipoUsuario.toLowerCase()}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Erro ao solicitar código.");
      setPasso(2);
      setSucesso("Código enviado para o seu e-mail!");
    } catch (err) {
      setErro("Não foi possível solicitar o código. Tente novamente.");
    }
  };

  const redefinirSenha = async () => {
    if (!codigo || !novaSenha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setErro("");
    try {
      const endpoint = `${urlBase}/executar/${tipoUsuario.toLowerCase()}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, novaSenha }),
      });
      if (!response.ok) throw new Error("Erro ao redefinir a senha.");
      setSucesso("Senha redefinida com sucesso!");
      fecharModal();
    } catch (err) {
      setErro("Não foi possível redefinir a senha. Tente novamente.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={fecharModal} aria-label="Fechar modal">
          <FaTimes size={24} />
        </button>
        <h2>Redefinir Senha</h2>
        {erro && <p className="mensagem-erro">{erro}</p>}
        {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

        {passo === 1 ? (
          <>
            <p>Digite o e-mail cadastrado para receber um código:</p>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={solicitarCodigo} className="btn-enviar">
              Enviar Código
            </button>
          </>
        ) : (
          <>
            <p>Insira o código recebido e redefina sua senha:</p>
            <input
              type="text"
              placeholder="Código de 6 dígitos"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirmar Nova Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <button onClick={redefinirSenha} className="btn-enviar">
              Redefinir Senha
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalRedefinirSenha;