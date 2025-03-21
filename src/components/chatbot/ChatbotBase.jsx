import React, { useState } from 'react';
import '../../styles/Chatbot.css'

export function ChatbotBase() {
  const [etapa, setEtapa] = useState(0);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [animal, setAnimal] = useState("");
  const [agressor, setAgressor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [mensagens, setMensagens] = useState([
    "Olá, seja bem-vindo! Vamos iniciar o seu processo de forma rápida. Clique para iniciar."
  ]);

  const [visivel, setVisivel] = useState(true);


  const avancarEtapa = () => {
    if (etapa === 0) {
      setMensagens([...mensagens, "Bot: Muito bem! Agora me diga seu nome."]);
      setEtapa(1);
    } else if (etapa === 1) {
      setMensagens([...mensagens, `Você: ${nome}`, "Bot: Muito bem! Agora me diga seu email."]);
      setEtapa(2);
    } else if (etapa === 2) {
      if (email.trim() === "") {
        setMensagens([...mensagens, "Bot: O email não pode estar vazio. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${email}`, "Bot: Muito bem! Agora crie uma senha."]);
      setEtapa(3);
    } else if (etapa === 3) {
      if (senha.trim() === "") {
        setMensagens([...mensagens, "Bot: A senha não pode estar vazia. Tente novamente."]);
        return;
      }
      if (senha.length < 6) {
        setMensagens([...mensagens, "Bot: A senha deve ter no mínimo 6 caracteres. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Senha: ${"*".repeat(senha.length)}`, "Bot: Agora, me diga o animal envolvido."]);
      setEtapa(4);
    } else if (etapa === 4) {
      if (animal.trim() === "") {
        setMensagens([...mensagens, "Bot: O campo 'animal' é obrigatório. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${animal}`, "Bot: Agora, me fale o agressor (se houver)."]);
      setEtapa(5);
    } else if (etapa === 5) {
      setMensagens([...mensagens, `Você: ${agressor ? agressor : "Não informado"}`, "Bot: Agora, descreva o ocorrido (máximo de 255 caracteres)."]);
      setEtapa(6);
    } else if (etapa === 6) {
      if (descricao.trim() === "") {
        setMensagens([...mensagens, "Bot: A descrição é obrigatória. Tente novamente."]);
        return;
      }
      if (descricao.length > 255) {
        setMensagens([...mensagens, "Bot: A descrição não pode ultrapassar 255 caracteres. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${descricao}`, "Bot: Agora, me diga o bairro onde ocorreu o incidente."]);
      setEtapa(7);
    } else if (etapa === 7) {
      if (bairro.trim() === "") {
        setMensagens([...mensagens, "Bot: O bairro é obrigatório. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${bairro}`, "Bot: Agora, me diga a rua onde ocorreu o incidente."]);
      setEtapa(8);
    } else if (etapa === 8) {
      if (rua.trim() === "") {
        setMensagens([...mensagens, "Bot: A rua é obrigatória. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${rua}`, "Bot: Muito bem, processo finalizado."]);
      setFinalizado(true);
    }
  };

  const voltarEtapa = () => {
    if (etapa > 0) {
      setEtapa(etapa - 1);
      setMensagens(mensagens.slice(0, -1));
    }
  };


  const fecharChat = () => {
    setVisivel(false);
  };

  //Atenção:Não renderiza o componente
  if (!visivel) {
    return null;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="close-button" onClick={fecharChat}>X</button>
      </div>

      <div className="mensagem-container">
        {mensagens.map((mensagem, indice) => (
          <div key={indice} className="mensagem">
            <p>{mensagem}</p>
          </div>
        ))}
      </div>

      {finalizado && <p className="finalizado-message">Processo finalizado</p>}

      {!finalizado && (
        <>
          {etapa === 0 && <button className="action-button" onClick={avancarEtapa}>Iniciar</button>}

          {etapa === 1 && (
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 2 && (
            <div className="input-container">
              <input
                className="input-field"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 3 && (
            <div className="input-container">
              <input
                className="input-field"
                type="password"
                placeholder="Digite uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 4 && (
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                placeholder="Animal envolvido"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 5 && (
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                placeholder="Agressor (opcional)"
                value={agressor}
                onChange={(e) => setAgressor(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 6 && (
            <div className="input-container">
              <textarea
                className="input-field"
                maxLength={255}
                placeholder="Descreva o ocorrido"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 7 && (
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}

          {etapa === 8 && (
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <div className="button-container">
                <button className="action-button" onClick={voltarEtapa}>Voltar</button>
                <button className="action-button" onClick={avancarEtapa}>Enviar</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
