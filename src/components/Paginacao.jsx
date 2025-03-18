import React from 'react';
import '../styles/Paginacao.css';

const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }) => {
  return (
    <div className="paginacao-container">
      {Array.from({ length: totalPaginas }, (_, index) => (
        <button
          key={index}
          className={`paginacao-botao ${paginaAtual === index + 1 ? 'ativo' : ''}`}
          onClick={() => onMudarPagina(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginacao;