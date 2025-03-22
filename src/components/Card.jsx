import React, { useState } from "react";
import ModalCard from "./ModalCard";
import '../styles/Card.css';

const Card = ({ item, botaoTexto }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [favorito, setFavorito] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);
  const toggleFavorito = () => setFavorito(!favorito);

  return (
    <div className="animal-card">
      <img src={item.imgSrc || "https://via.placeholder.com/150"} alt={item.nome} className="animal-img" />

      <div className="card-info">
        <span className="animal-nome">{item.nome}</span>
        <span className="favorito" onClick={toggleFavorito} style={{ cursor: "pointer" }}>
          {favorito ? "⭐" : "☆"}
        </span>
      </div>

      <p className="animal-localizacao">{item.localizacao}</p>

      {item.icones ? (
        <div className="icones-container">
          {item.icones.map((icone, index) => (
            <div className="icone-info" key={index}>
              <img src={icone.src} alt={icone.alt} />
              <span>{icone.texto}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="ong-info">
          <p><strong>Endereço:</strong> {item.localizacao}</p>
          <p><strong>Contato:</strong> {item.contato}</p>
        </div>
      )}

      <button className="btn-adotar" onClick={abrirModal}>{botaoTexto}</button>

      {modalAberto && (
        <ModalCard item={item} fecharModal={fecharModal} botaoTexto={botaoTexto} />
      )}
    </div>
  );
};

export default Card;
