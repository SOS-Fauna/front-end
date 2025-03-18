import React, { useState } from "react";
import '../styles/Filtro.css'


const Filtro = ({ filtrosConfig = [], onFiltroChange }) => {
  const [filtros, setFiltros] = useState(
    Object.fromEntries(filtrosConfig.map(({ nome }) => [nome, ""]))
  );

  const handleSelectChange = (filtro, valor) => {
    const novosFiltros = { ...filtros, [filtro]: valor };
    setFiltros(novosFiltros);
    if (onFiltroChange) onFiltroChange(novosFiltros);
  };

  return (
    <div className="filtro-vertical">
      <h3>Filtrar por:</h3>
      {filtrosConfig.length > 0 ? (
        filtrosConfig.map(({ nome, label, opcoes }) => (
          <div key={nome} className="filtro-categoria">
            <h4>{label}</h4>
            <select
              value={filtros[nome]}
              onChange={(e) => handleSelectChange(nome, e.target.value)}
            >
              <option value="">Todas</option>
              {opcoes.map((opcao) => (
                <option key={opcao} value={opcao}>
                  {opcao}
                </option>
              ))}
            </select>
          </div>
        ))
      ) : (
        <p>Nenhum filtro disponível</p>
      )}
    </div>
  );
};

export default Filtro;
