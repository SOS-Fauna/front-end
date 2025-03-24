import React, { useState } from 'react';
import '../styles/Chatbot.css';
import { VscChromeClose } from "react-icons/vsc";
import { IoRefresh } from "react-icons/io5";
import dogchat from "../assets/dogchat.png"
import { ChatbotBase } from "./chatbot/ChatbotBase"

const chats = {
    base: ChatbotBase
};

function Chatbot() {
    const Chat = chats ["base"];

    return (
        <div className='telaBasePai'>
            <div className='telaBase'>
                <div className='icons'>
                    <IoRefresh size={30} color="black" />
                    <VscChromeClose size={30} color="black" onClick={() => (setShow(false))} />
                </div>
                <div className='imgCao'>
                    <img className='ftCao' src={dogchat} alt="cão tela chat" />
                </div>

                <div className='mensagensRecebidas'>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default Chatbot;