import React, { useState } from "react";
import { FaUndo } from "react-icons/fa"; 
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

  const limparFiltros = () => {
    const filtrosZerados = Object.fromEntries(
      filtrosConfig.map(({ nome }) => [nome, ""])
    );
    setFiltros(filtrosZerados);
    if (onFiltroChange) onFiltroChange(filtrosZerados);
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

<button className="limpar-btn" onClick={limparFiltros}>
  <FaUndo size={10} /> Limpar Filtros
</button>

    </div>
  );
};

export default Filtro;
