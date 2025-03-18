function Integrante({ foto, nome, descricao }) {
    return (
        <div className="membros">
            <img src={foto} alt="foto do integrante" />
            <h4>{nome}</h4>
            <p>{descricao}</p>
        </div>
    )
}

export default Integrante