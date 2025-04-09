import React, { useState } from "react";
import "../styles/Ong.css";
import Paginacao from "../components/Paginacao";
import Card from "../components/Card";
import Filtro from "../components/Filtro";
import ModalCard from "../components/ModalCard"; // <-- importar

const ONG = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ongSelecionada, setOngSelecionada] = useState(null); // <-- controla o modal
  const dadosOngSalvos = JSON.parse(localStorage.getItem("perfilOng"));

  const ongs = dadosOngSalvos
  ? [
      {
        id: 1,
        nome: dadosOngSalvos.nome,
        localizacao: dadosOngSalvos.localizacao,
        contato: dadosOngSalvos.telefone,
        descricao: dadosOngSalvos.descricao,
        imgSrc: dadosOngSalvos.imagem,
        fotos: dadosOngSalvos.fotos,
        temCaes: true,
        temGatos: true,
        tipo: "ong", // ESSENCIAL!
      },

      
    ]
  : [];

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
              <Card
                key={ong.id}
                item={ong}
                botaoTexto="Localizar"
                onClick={() => setOngSelecionada(ong)} // <-- abre modal
              />
            ))}
          </div>
        </div>

        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          onMudarPagina={setPaginaAtual}
        />
      </div>

      {ongSelecionada && (
        <ModalCard
          item={ongSelecionada}
          fecharModal={() => setOngSelecionada(null)}
          botaoTexto="Ver Mais"
        />
      )}
    </>
  );
};

export default ONG;
