import { LuSend } from "react-icons/lu";

function BotoesChat({ type, placeholder, setValor, voltarEtapa, avancarEtapa }) {
    return (
        <div className="input-container">
            <div className="button-container">
                <input
                    className="input-field"
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => setValor(e.target.value)}
                />

                <button className="action-button" onClick={avancarEtapa}><LuSend size={20} color="white" /></button>
            </div>
        </div>
    )
}
export default BotoesChat