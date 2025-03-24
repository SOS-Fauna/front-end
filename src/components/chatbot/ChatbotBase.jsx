import React, { useState } from 'react';
import '../../styles/Chatbot.css'
import BotoesChat from '../BotoesChat';
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
    "Bot: Olá, seja bem-vindo(a)!", "Bot: Vamos iniciar sua denúncia de forma rápida. Clique para iniciar."
  ]);

  const [visivel, setVisivel] = useState(true);


  const avancarEtapa = () => {
    if (etapa === 0) {
      setMensagens([...mensagens, "Bot: Muito bem! Agora me diga seu nome:"]);
      setEtapa(1);
    } else if (etapa === 1) {
      setMensagens([...mensagens, `Você: ${nome}`, "Bot: Muito bem! Agora me diga seu email:"]);
      setEtapa(2);
    } else if (etapa === 2) {
      if (email.trim() === "") {
        setMensagens([...mensagens, "Bot: O email não pode estar vazio. Digite seu email:"]);
        return;
      }
      setMensagens([...mensagens, `Você: ${email}`, "Bot: Muito bem! Agora crie uma senha:"]);
      setEtapa(3);
    } else if (etapa === 3) {
      if (senha.trim() === "") {
        setMensagens([...mensagens, "Bot: A senha não pode estar vazia. Digite a senha:"]);
        return;
      }
      if (senha.length < 6) {
        setMensagens([...mensagens, "Bot: A senha deve ter no mínimo 6 caracteres. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Senha: ${"*".repeat(senha.length)}`, "Bot: Agora, diga que tipo de animal está em condições de maus tratos?"]);
      setEtapa(4);
    } else if (etapa === 4) {
      if (animal.trim() === "") {
        setMensagens([...mensagens, "Bot: O campo 'animal' é obrigatório. Tente novamente."]);
        return;
      }
      setMensagens([...mensagens, `Você: ${animal}`, "Bot: Agora, me fale do agressor (se houver)."]);
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
              <BotoesChat type={"text"}
                placeholder={"Informe seu nome"}
                setValor={setNome}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 2 && (
            <>
              <BotoesChat type={"email"}
                placeholder={"Informe seu email"}
                setValor={setEmail}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 3 && (
            <>
              <BotoesChat type={"password"}
                placeholder={"Informe uma senha"}
                setValor={setSenha}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 4 && (
            <>
              <BotoesChat type={"text"}
                placeholder={"Informe o animal envolvido"}
                setValor={setAnimal}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 5 && (
            <>
              <BotoesChat type={"text"}
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
                  rows={4} cols={58}
                  className="input-field"
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
              <BotoesChat type={"text"}
                placeholder={"Informe o bairro"}
                setValor={setBairro}
                avancarEtapa={avancarEtapa}
              />
            </>
          )}

          {etapa === 8 && (
            <>
              <BotoesChat type={"text"}
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
