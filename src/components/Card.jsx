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
    <div className="card-geral">
    <img
      src={item.imgSrc || "https://via.placeholder.com/150"}
      alt={item.nome}
      className="card-img"
    />
  
    <div className="card-info">
      <span className="card-nome">{item.nome}</span>
      <span
        className="favorito"
        onClick={toggleFavorito}
        style={{ cursor: "pointer" }}
      >
        {favorito ? "⭐" : "☆"}
      </span>
    </div>
  
    {/* Se for card de ONG */}
    {item.contato && item.localizacao ? (
      <div className="ong-info">
        <p><strong>Localização:</strong> {item.localizacao}</p>
        <p><strong>Contato:</strong> {item.contato}</p>
      </div>
    ) : (
      // Se for card de animal
      item.icones && (
        <div className="icones-container">
          {item.icones.map((icone, index) => (
            <div className="icone-info" key={index}>
              <img src={icone.src} alt={icone.alt} />
              <span>{icone.texto}</span>
            </div>
          ))}
        </div>
      )
    )}
  
    <button className="btn" onClick={abrirModal}>{botaoTexto || "Ver mais"}</button>
  
    {modalAberto && (
      <ModalCard 
      item={item} 
      fecharModal={fecharModal} 
      botaoTexto={botaoTexto} />
    )}
  </div>
  )
}  

export default Card;
