import '../styles/Chatbot.css';
import { VscChromeClose } from "react-icons/vsc";
import { IoRefresh } from "react-icons/io5";
import dogchat from "../assets/dogchat.png";
import { ChatbotBase } from "./chatbot/ChatbotBase";
import { useState } from 'react';

function Chatbot({abrirChatbot}) {
    const [restartChat,setRestartChat] = useState(false);

    return (
        <div className='telaBasePai'>
            <div className='telaBase'>
                <div className='icons'>
                    <IoRefresh size={30} color="black" onClick={()=> setRestartChat(!restartChat)} />
                    <a href="" onClick={() => abrirChatbot(false)}><VscChromeClose size={30} color="black"  /></a>
                </div>
                <div className='imgCao'>
                    <img className='ftCao' src={dogchat} alt="cão tela chat" />
                </div>

                <div className='mensagensRecebidas'>
                    <ChatbotBase reset={restartChat}/>
                </div>
            </div>
        </div>
        
    )
}

export default Chatbot;