import React, { useState } from "react";
import ModalCard from "./ModalCard";
import '../styles/Card.css'

const Card = ({ item, botaoTexto }) => {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  return (
    <div className="animal-card">
      <img src={item.imgSrc || ""} alt={item.nome} className="animal-img" />

      <div className="card-info">
        <span className="animal-nome">{item.nome}</span>
        <span className="favorito">⭐</span>
      </div>

      <p className="animal-localizacao">{item.localizacao}</p>

      <div className="icones-container">
        {item.icones.map((icone, index) => (
          <div className="icone-info" key={index}>
            <img src={icone.src} alt={icone.alt} />
            <span>{icone.texto}</span>
          </div>
        ))}
      </div>

      <button className="btn-adotar" onClick={abrirModal}>{botaoTexto}</button>

      {modalAberto && (
        <ModalCard item={item} fecharModal={fecharModal}  botaoTexto="Quero Adotar"  />
      )}
    </div>
  );
};

export default Card;
