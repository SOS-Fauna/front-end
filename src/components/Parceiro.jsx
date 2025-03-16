function Parceiro({ nome, endereco, telefone }) {
    return (
        <div className="parceiro">
            <img src={foto} alt="foto do parceiro" />
            <h3>{nome}</h3>
            <p>{endereco}</p>
            <p>{telefone}</p>
        </div>
    )
}

export default Parceiro