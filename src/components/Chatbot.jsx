import '../styles/Chatbot.css';
import { GoArrowLeft } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";
import { LuSend } from "react-icons/lu";
import dogchat from "../assets/dogchat.png"

function Chatbot() {
    return (
        <div>
            <div className='telaBase'>
                <div className='icons'>
                    <GoArrowLeft size={32} color="black" />
                    <VscChromeClose size={30} color="black" />
                </div>
                <div className='imgcao'>
                    <img src={dogchat} alt="cão tela chat" />
                </div>

                <div className='mensagensRecebidas'>

                </div>

                <div className='caixaTexto'>
                    <input className='input' type="text" placeholder='Digite aqui...' />
                    <div className='iconSend'>
                        <LuSend size={20} color="white" />
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Chatbot;