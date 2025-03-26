import React, { useState } from "react";
import "../../styles/Detalhes_MinhasDenuncias.css";
import animal2 from '../../assets/animal2.svg'
import { FaHome, FaSearch, FaHeartbeat, FaUsers, FaCheckCircle } from "react-icons/fa";

const DetalhesDenuncia = () => {
  const [statusAtual, setStatusAtual] = useState(2); 

  const etapas = [
    { id: 0, titulo: "Acolhimento", descricao: "O animal foi resgatado e está seguro.", icon: <FaHome /> },
    { id: 1, titulo: "Sondagem", descricao: "O animal está em fase de análise para definir o melhor tratamento.", icon: <FaSearch /> },
    { id: 2, titulo: "Tratamento", descricao: "O animal está recebendo os cuidados necessários.", icon: <FaHeartbeat /> },
    { id: 3, titulo: "Socialização", descricao: "O animal está em processo de ressocialização.", icon: <FaUsers /> },
    { id: 4, titulo: "Adoção", descricao: "O animal está disponível para adoção.", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="detalhes-container">
      <div className="detalhes-header">
        <h2>Detalhes da Denúncia</h2>
      </div>

      <div className="detalhes-info">
        <img src={animal2} alt="Animal" className="animal-foto" />
        <div className="info-text">
          <h3>Nome do Animal</h3>
          <p>Número do Caso: <strong>123456</strong></p>
        </div>
      </div>

      <div className="timeline">
        {etapas.map((etapa) => (
          <div key={etapa.id} className={`timeline-item ${etapa.id <= statusAtual ? "completed" : ""}`}>
            <div className="icon">{etapa.icon}</div>
            <div className="timeline-text">
              <h4>{etapa.titulo}</h4>
              <p>{etapa.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetalhesDenuncia;
