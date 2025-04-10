import { LuSend } from "react-icons/lu";

function ChatbotInput({ type, placeholder, setValor, avancarEtapa, campoObrigatorio=true, tamanhoMin=2, dataMax }) {
    return (
        <form className="form-pai" onSubmit={avancarEtapa}>
            <div className="input-container">
                <div className="button-container">
                    <input
                        className="input-field"
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => setValor(e.target.value)}
                        required={campoObrigatorio}
                        minLength={tamanhoMin}
                        max={dataMax}
                        autoFocus

                    />

                    <button className="action-button" type="submit"><LuSend size={20} /></button>
                </div>
            </div>
        </form>
    )
}
export default ChatbotInput