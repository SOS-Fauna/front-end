import React, { useState } from 'react';
import '../styles/Chatbot.css';
import { VscChromeClose } from "react-icons/vsc";
import { IoRefresh } from "react-icons/io5";
import dogchat from "../assets/dogchat.png"
import {ChatbotBase} from "./chatbot/ChatbotBase"

function Chatbot() {
    const [show,setShow] = useState(true);
    return (
        <>
        {show &&
        <div className='pai'>
            <div className='telaBase'>
                <div className='icons'>
                    <IoRefresh size={30} color="black" />
                    <VscChromeClose size={30} color="black" onClick={() => (setShow(false))}/>
                </div>
                <div className='imgcao'>
                    <img src={dogchat} alt="cão tela chat" />
                </div>

                <div className='mensagensRecebidas'>
                    <ChatbotBase />
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default Chatbot;