import React from "react";
import { FaEdit } from "react-icons/fa";
// import "../../styles/Sobre.css";

const SobreOng= ({
  nome,
  setNome,
  descricao,
  setDescricao,
  imagem,
  setImagem,
  editando,
  setEditando
}) => {
  return (
    <section className="sobre">
      <div className="sobre-text">
        {editando === "nome" ? (
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onBlur={() => setEditando(null)}
            autoFocus
          />
        ) : (
          <h1 onClick={() => setEditando("nome")}>
            {nome} <FaEdit className="edit-icon" />
          </h1>
        )}

        {editando === "descricao" ? (
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            onBlur={() => setEditando(null)}
            autoFocus
          />
        ) : (
          <p onClick={() => setEditando("descricao")}>
            {descricao} <FaEdit className="edit-icon" />
          </p>
        )}

        <div className="sobre-imagem">
          <label className="imagem-label">
            {imagem ? (
              <div className="imagem-wrapper">
                <img src={imagem} alt="Foto da ONG" />
                <button
                  className="remover-imagem"
                  onClick={() => setImagem(null)}
                >
                  ✖
                </button>
              </div>
            ) : (
              <div className="foto-placeholder">📷</div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImagem(URL.createObjectURL(e.target.files[0]))
              }
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default SobreOng;
