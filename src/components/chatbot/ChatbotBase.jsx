import React, { useState } from 'react';
import '../../styles/Chatbot.css'
import ChatbotInput from '../ChatbotInput';
import { LuSend } from 'react-icons/lu';

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
    "Bot: Olá, seja bem-vindo(a)!", "Bot: Vamos iniciar seu atendimento de forma rápida. Clique para iniciar."
  ]);

  const avancarEtapa = () => {
    switch (etapa) {
      case 0:
        setMensagens([...mensagens, "Bot: Muito bem! Agora me diga seu nome:"]);
        setEtapa(1);
        break;

      case 1:
        setMensagens([...mensagens, `Você: ${nome}`, "Bot: Muito bem! Agora me diga seu email:"]);
        setEtapa(2);
        break;

      case 2:
        setMensagens([...mensagens, `Você: ${email}`, "Bot: Muito bem! Agora crie uma senha:"]);
        setEtapa(3);
        break;

      case 3:
        setMensagens([...mensagens, `Senha: ${"*".repeat(senha.length)}`, "Bot: Agora, diga que tipo de animal está em condições de maus tratos?"]);
        setEtapa(4);
        break;

      case 4:
        setMensagens([...mensagens, `Você: ${animal}`, "Bot: Agora, me fale do agressor (se houver)."]);
        setEtapa(5);
        break;

      case 5:
        setMensagens([...mensagens, `Você: ${agressor ? agressor : "Não informado"}`, "Bot: Agora, descreva o ocorrido (máximo de 255 caracteres)."]);
        setEtapa(6);
        break;

      case 6:
        setMensagens([...mensagens, `Você: ${descricao}`, "Bot: Agora, me diga o bairro onde ocorreu o incidente."]);
        setEtapa(7);
        break;

      case 7:
        setMensagens([...mensagens, `Você: ${bairro}`, "Bot: Agora, me diga a rua onde ocorreu o incidente."]);
        setEtapa(8);
        break;

      case 8:
        setMensagens([...mensagens, `Você: ${rua}`, "Bot: Muito bem, processo finalizado."]);
        setFinalizado(true);
        break;

      default:
        setMensagens([...mensagens, "Bot: Erro! Por favor tente novamente mais tarde."]);
        break;

      // aguardando API para gerar o número de protocolo
    }
  };

  return (
    <div className="chat-container">

      <div className="mensagem-container">
        {mensagens.map((mensagem, indice) => (
          <div className='txtChat'>
            <div key={indice} className={mensagem.includes("Bot:") ? "mensagemBot" : "mensagemUser"}>
              <p className='msg'>{mensagem}</p>
            </div>
          </div>
        ))}
      </div>

      {!finalizado && (
        <>
          {etapa === 0 &&
            <div className='botaoIniciarPai'>
              <button
                className="botaoIniciar" onClick={avancarEtapa}>Iniciar</button>
            </div>}

          {etapa === 1 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe seu nome"}
                setValor={setNome}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 2 && (
            <>
              <ChatbotInput type={"email"}
                placeholder={"Informe seu email"}
                setValor={setEmail}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 3 && (
            <>
              <ChatbotInput type={"password"}
                placeholder={"Informe uma senha"}
                setValor={setSenha}
                avancarEtapa={avancarEtapa}
                tamanhoMin={6}
              />
            </>
          )}

          {etapa === 4 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe o animal envolvido"}
                setValor={setAnimal}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 5 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe o nome do agressor (se houver)"}
                setValor={setAgressor}
                avancarEtapa={avancarEtapa}
                campoObrigatorio={false}
              />
            </>
          )}

          {etapa === 6 && (
            <form action="#" onSubmit={avancarEtapa}>
              <div className="input-container">
                <textarea
                  rows={4} cols={50}
                  className="input-field"
                  minLength={20}
                  maxLength={255}
                  placeholder="Descreva o ocorrido"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
                <div className="button-container">
                  <button className="action-button" type='submit'><LuSend size={20} color='white' /></button>
                </div>
              </div>
            </form>
          )}

          {etapa === 7 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe o bairro"}
                setValor={setBairro}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 8 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe o nome da rua"}
                setValor={setRua}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
