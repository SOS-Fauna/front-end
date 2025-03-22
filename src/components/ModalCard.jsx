import '../styles/ModalCard.css';

const ModalCard = ({ item, fecharModal, botaoTexto }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={fecharModal}>
      <div className="modal-container-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={fecharModal}>✖</button>

        <img src={item.imgSrc || "https://via.placeholder.com/150"} alt={item.nome} className="modal-img" />
        <h2>{item.nome}</h2>
        <p className='localizacao-card'> {item.localizacao}</p>

        {item.icones ? (
          <div className="modal-icones">
            {item.icones.map((icone, index) => (
              <div className="icone-info" key={index}>
                <img src={icone.src} alt={icone.alt} />
                <span>{icone.texto}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="modal-ong-info">
            <p><strong>Endereço:</strong> {item.localizacao}</p>
            <p><strong>Contato:</strong> {item.contato}</p>
          </div>
        )}

        <button className="btn-adotar">{botaoTexto}</button>
      </div>
    </div>
  );
};

export default ModalCard;
