import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Chatbot.css'
import ChatbotInput from './ChatbotInput';

export function ChatbotBase({ reset }) {
  const [etapa, setEtapa] = useState(0);
  const [animal, setAnimal] = useState("");
  const [agressor, setAgressor] = useState("");
  const [data, setData] = useState("");
  const dataDeHoje = new Date().toISOString().split('T')[0];
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [numDenuncia, setnumDenuncia] = useState("");
  const [mensagens, setMensagens] = useState([
    "Bot: Olá, seja bem-vindo(a)!", "Bot: Vamos iniciar seu atendimento de forma rápida. Escolha uma opção:"
  ]);

  //Configuração do scroll
  const elementoRef = useRef(null);
  useEffect(() => {
    const subElements = elementoRef.current.getElementsByClassName("msg");
    subElements[subElements.length - 1].scrollIntoView({ behavior: "smooth", block: "start" });
  }, [mensagens]);

  useEffect(() => {
    setEtapa(0);
    setMensagens([
      "Bot: Olá, seja bem-vindo(a)!", "Bot: Vamos iniciar seu atendimento de forma rápida. Escolha uma opção:"
    ]);
  }, [reset]);

  // Realização de denuncias
  const fazerDenuncia = () => {
    switch (etapa) {
      case 0:
        setMensagens([...mensagens, "Você: Fazer denúncia", "Bot: Informe qual animal está em condições de maus tratos:"]);
        setEtapa(1);
        break;

      case 1:
        setMensagens([...mensagens, `Você: ${animal}`, "Bot: Agora, me fale do agressor (se houver):"]);
        setEtapa(2);
        break;

      case 2:
        setMensagens([...mensagens, `Você: ${agressor ? agressor : "Não informado"}`, "Bot: Informe a data do ocorrido:"]);
        setEtapa(3);
        break;

      case 3:
        const dataformatada = data.split("-");
        setMensagens([...mensagens, `Você: ${dataformatada[2] + "/" + dataformatada[1] + "/" + dataformatada[0]}`, "Bot: Agora, descreva o ocorrido:"]);
        setEtapa(4);
        break;

      case 4:
        setMensagens([...mensagens, `Você: ${descricao}`, "Bot: Agora, anexe uma foto do ocorrido:"]);
        setEtapa(5);
        break;

      case 5:
        setMensagens([...mensagens, `Você: ${foto.split("fakepath\\")[1]}`, "Bot: Agora, me diga o bairro onde ocorreu o incidente:"]);
        setEtapa(6);
        break

      case 6:
        setMensagens([...mensagens, `Você: ${bairro}`, "Bot: Agora, me diga a rua onde ocorreu o incidente:"]);
        setEtapa(7);
        break;

      case 7:
        setMensagens([...mensagens, `Você: ${rua}`, "Bot: Processo finalizado! As informações serão analisadas e você poderá acompanhar pelo número de protocolo:"]);
        setFinalizado(true);
        break;

      default:
        setMensagens([...mensagens, "Bot: Erro! Por favor tente novamente mais tarde."]);
        break;

      // aguardando API para gerar o número de protocolo
    }
  };

  //Consulta de denúncias
  const consultarDenuncia = () => {
    switch (etapa) {
      case 0:
        setMensagens([...mensagens, "Você: Consultar denúncia", "Bot: Por favor informe o número de protocolo:"]);
        setEtapa(20);
        break;

      case 20:
        //chamada para o serviço de consulta denuncia 
        //StatusCode
        //Response
        let mensagemRetorno = null;

        if (numDenuncia === "123456") {
          mensagemRetorno = "Bot: Denuncia n°: 123456 \n  Status: Em andamento. \n Orgão: Teste \n Telefone: (81)99008-8008 \n Rede Social: @aquiPetSave";

        } else {
          mensagemRetorno = "Bot: Denúncia não encontrada, tente novamente.";
        }

        setMensagens([...mensagens, `Você: ${numDenuncia}`, mensagemRetorno]);
        setEtapa(0);
        break;

      default:
        setMensagens([...mensagens, "Bot: Erro! Por favor tente novamente mais tarde."]);
        break;

      // aguardando API para gerar o número de protocolo
    }
  };

  function quebrarLinha(msgLinha) {
    let mensagemArray = msgLinha.split("\n");
    return (mensagemArray.map((linha) => (
      <>
        <span >
          {linha}
          <br />
        </span>
      </>
    )));
  }

  return (

    <div className="chat-container" >
    
      <div className="mensagem-container" ref={elementoRef}  >
        {mensagens.map((mensagem) => (

          <div className='txtChat'>
            <div className={mensagem.includes("Bot:") ? "mensagemBot" : "mensagemUser"}>

              {/* verifica o texto para pular linha */}
              <p className='msg'>{mensagem.includes("\n") ? quebrarLinha(mensagem.replace("Bot: ", "")) : mensagem.replace("Bot: ", "").replace("Você: ", "")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!finalizado && (
        <>
          {etapa === 0 &&
            <div className='botaoIniciarPai'>
              <button
                className="botaoDenuncia" onClick={fazerDenuncia}>Fazer denúncia</button>
              <button
                className="botaoDenuncia" onClick={consultarDenuncia}>Consultar denúncia</button>
            </div>}

          {etapa === 1 && (
            <ChatbotInput type={"text"}
              placeholder={"Informe o animal envolvido"}
              setValor={setAnimal}
              avancarEtapa={fazerDenuncia}
            />
          )}

          {etapa === 2 && (
            <ChatbotInput type={"text"}
              placeholder={"Informe o nome do agressor (se houver)"}
              setValor={setAgressor}
              avancarEtapa={fazerDenuncia}
              campoObrigatorio={false}
            />
          )}

          {etapa === 3 && (
            <ChatbotInput type={"date"}
              placeholder={"Informe a data do ocorrido"}
              setValor={setData}
              avancarEtapa={fazerDenuncia}
              dataMax= {dataDeHoje}
            />
          )}

          {etapa === 4 && (
            <ChatbotInput type={"text"}
              placeholder={"Informe o ocorrido (máximo de 255 caracteres)"}
              setValor={setDescricao}
              avancarEtapa={fazerDenuncia}
              tamanhoMin={20}
            />
          )}

          {etapa === 5 && (
            <ChatbotInput type={"file"}
              placeholder={"Aenxe uma foto do ocorrido"}
              setValor={setFoto}
              avancarEtapa={fazerDenuncia}
            />
          )}

          {etapa === 6 && (
            <ChatbotInput type={"text"}
              placeholder={"Informe o bairro"}
              setValor={setBairro}
              avancarEtapa={fazerDenuncia}
            />
          )}

          {etapa === 7 && (
            <ChatbotInput type={"text"}
              placeholder={"Informe o nome da rua"}
              setValor={setRua}
              avancarEtapa={fazerDenuncia}
            />
          )}

          {/* Etapas de consulta de denúncia */}

          {etapa === 20 && (
            <>
              <ChatbotInput type={"text"}
                placeholder={"Informe o número de protocolo"}
                setValor={setnumDenuncia}
                avancarEtapa={consultarDenuncia}
              />
            </>
          )}

        </>
      )}
    </div>
  );
}