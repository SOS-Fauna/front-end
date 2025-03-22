import React, { useState } from "react";
import "../styles/Ong.css";
import Paginacao from "../components/Paginacao";
import Card from "../components/Card";
import Filtro from "../components/Filtro";
import ong2 from '../assets/ong2.jpeg'

const ONG = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  const ongs = [
    { id: 1, imgSrc: ong2, nome: "Amigos dos Animais", localizacao: "Recife", contato: "(81) 99999-9999" },
    { id: 2, imgSrc: ong2, nome: "Coração Peludo", localizacao: "Olinda", contato: " (81) 98888-8888" },
    { id: 3, imgSrc: ong2, nome: "Patinhas Felizes", localizacao: "Paulista", contato: " (81) 97777-7777" },
    
  ];

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const filtrarOngs = (ong) => {
    return !filtros.cidade || filtros.cidade === "" || filtros.cidade === ong.localizacao;
  };

  const ongsFiltradas = ongs.filter(filtrarOngs);
  const cardsPorPagina = 6;
  const totalPaginas = Math.ceil(ongsFiltradas.length / cardsPorPagina);
  const ongsPagina = ongsFiltradas.slice(
    (paginaAtual - 1) * cardsPorPagina,
    paginaAtual * cardsPorPagina
  );

  return (
    <>
      <div className="page-ong">
        <div className="descricao-container">
          <h1>Ongs Disponíveis</h1>
          <p>Aqui está um lista de ONGs parceiras de acordo com sua região</p>
        </div>
        <div className="conteudo-principal">
          <Filtro
            filtrosConfig={[
              { nome: "Bairro", label: "Bairro", opcoes: ["Recife", "Olinda", "Paulista"] },
              { nome: "Apenas Cães", label: "Apenas Cães", opcoes: ['Sim', 'Não'] },
              { nome: "Apenas Gatos", label: "Apenas Gatos", opcoes: ['Sim', 'Não'] },


            ]}
            onFiltroChange={handleFiltroChange}
          />
          <div className="container-ongs">
            {ongsPagina.map((ong) => (
              <Card key={ong.id} item={ong} botaoTexto="Localizar" />
            ))}
          </div>
        </div>
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onMudarPagina={setPaginaAtual}
        />
      </div>
    </>
  );
};

export default ONG;
