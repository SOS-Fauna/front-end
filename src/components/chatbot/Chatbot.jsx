import '../../styles/Chatbot.css';
import { VscChromeClose } from "react-icons/vsc";
import { IoRefresh } from "react-icons/io5";
import dogchat from "../../assets/dogchat.png";
import { ChatbotBase } from "./ChatbotBase";
import { useState } from 'react';
import AcessoPerfil from '../../pages/AcessoPerfil';

function Chatbot({ abrirChatbot }) {
    const [restartChat, setRestartChat] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem("usuarioTipo"));
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <>
            {modalAberto && <AcessoPerfil fecharModal={() => setModalAberto(false)} setUsuarioLogado={setUsuarioLogado} />}
            <div className='telaBasePai'>
                <div className='telaBase'>
                    <div className='icons'>
                        <a onClick={() => setRestartChat(!restartChat)}> <IoRefresh size={30} color="black" /></a>
                        <a onClick={() => abrirChatbot(false)}> <VscChromeClose size={30} color="black" /></a>
                    </div>
                    <div className='imgCao'>
                        <img className='ftCao' src={dogchat} alt="cão tela chat" />
                    </div>

                    <div className='mensagensRecebidas'>
                        <ChatbotBase reset={restartChat} usuarioLogado={usuarioLogado} setModalAberto={setModalAberto}/>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Chatbot;