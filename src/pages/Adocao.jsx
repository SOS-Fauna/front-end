import React, { useState, useEffect } from "react";
import "../styles/Adocao.css";
import Paginacao from "../components/Paginacao";
import AnimalCard from "../components/tela_acompanhamento-adocao/AnimalCard";
import Filtro from "../components/Filtro";

const Adocao = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [animaisPublicados, setAnimaisPublicados] = useState([]);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("animais")) || [];
    const publicados = dadosSalvos.filter((animal) => animal.publicado === true);
    setAnimaisPublicados(publicados);
  }, []);

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const filtrarAnimais = (animal) => {
    return (
      (!filtros.localizacao || filtros.localizacao.trim().toLowerCase() === (animal.localizacao ?? "").trim().toLowerCase()) &&
      (!filtros.sexo || filtros.sexo === animal.sexo) &&
      (!filtros.idade || filtros.idade.trim().toLowerCase() === (animal.idade ?? "").trim().toLowerCase()) &&
      (!filtros.categoria || filtros.categoria.trim().toLowerCase() === (animal.categoria ?? "").trim().toLowerCase())
    );
  };
  
  const animaisFiltrados = animaisPublicados.filter(filtrarAnimais);
  const cardsPorPagina = 6;
  const totalPaginas = Math.ceil(animaisFiltrados.length / cardsPorPagina);
  const animaisPagina = animaisFiltrados.slice(
    (paginaAtual - 1) * cardsPorPagina,
    paginaAtual * cardsPorPagina
  );

  return (
    <div className="page-adocao">
      <div className="descricao-container">
        <h1>Campanha de Adoção</h1>
        <p>
          Uma seleção especial de peludinhos que buscam um lar para chamar de seu. 
          Não encontrou seu pet aqui ainda? Preencha o formulário  
          de intenção que uma ONG parceira entrará em contato com você.
        </p>
      </div>

      <div className="conteudo-principal">
        <Filtro
          filtrosConfig={[
            { nome: "localizacao", label: "Bairro", opcoes: ["Recife", "Olinda", "Paulista"] },
            { nome: "sexo", label: "Sexo", opcoes: ["Macho", "Fêmea"] },
            { nome: "idade", label: "Idade", opcoes: ["1 ano", "2 anos"] },
            { nome: "categoria", label: "Categoria", opcoes: ["Cachorro", "Gato", "Outro"] },
          ]}
          onFiltroChange={handleFiltroChange}
        />

        <div className="container-adocao">
          {animaisPagina.map((animal) => (
         <AnimalCard
         key={animal.id}
         id={animal.id}
         imgSrc={animal.imgSrc}
         nome={animal.nome}
         localizacao={animal.localizacao}
         sexo={animal.sexo}
         vacinacao={animal.vacinacao}
         idade={animal.idade}
         categoria={animal.categoria} 
         modoVisualizacao={true}
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
  );
};

export default Adocao;
