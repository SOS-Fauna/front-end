import React from "react";
import { FaHome, FaAt, FaEdit } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
// import "../../styles/Dados.css"; // caminho do seu CSS

const DadosOng = ({ dados, setDados, editando, setEditando }) => {
  const icones = [
    { icon: <FaHome />, alt: "Localização" },
    { icon: <IoCall />, alt: "Contato" },
    { icon: <FaAt />, alt: "Rede Social" },
  ];

  return (
    <section className="dados">
      <h1>Atualize seus dados:</h1>
      <p>(Clique no ícone para editar os dados)</p>
      <div className="dados-container">
        {icones.map((item, index) => (
          <div className="dados-item" key={index}>
            <span className="dados-icone">{item.icon}</span>
            {editando === index ? (
              <input
                type="text"
                value={dados[index] || ""}
                onChange={(e) => {
                  const novoArray = [...dados];
                  novoArray[index] = e.target.value;
                  setDados(novoArray);
                }}
                onBlur={() => setEditando(null)}
                autoFocus
              />
            ) : (
              <p onClick={() => setEditando(index)}>
                {dados[index] || "Clique para adicionar"}{" "}
                <FaEdit className="edit-icon" />
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DadosOng;
