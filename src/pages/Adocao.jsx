import React, { useState } from "react";
import '../styles/Adocao.css'
import Paginacao from "../components/Paginacao";
import Card from "../components/Card";
import animal2 from "../assets/animal2.svg";
import animal1 from "../assets/animal1.svg";
import Filtro from "../components/Filtro";
import SexoIcon from "../assets/Sexo.svg";
import CheckIcon from "../assets/check.svg";
import IdadeIcon from "../assets/Idade.svg";

const Adocao = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  const animais = [
    { id: 2, imgSrc: animal2, nome: "Bob", localizacao: "Recife", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Macho" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 3, imgSrc: animal1, nome: "Yuri", localizacao: "Recife", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Macho" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 4, imgSrc: animal1, nome: "Luna", localizacao: "Paulista", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Fêmea" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 5, imgSrc: animal1, nome: "Mike", localizacao: "Olinda", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Macho" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 6, imgSrc: animal2, nome: "Melyna", localizacao: "Paulista", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Fêmea" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 7, imgSrc: animal2, nome: "Zeus", localizacao: "Recife", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Macho" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] },
    { id: 8, imgSrc: animal2, nome: "Pandora", localizacao: "Olinda", icones: [{ src: SexoIcon, alt: "Sexo", texto: "Fêmea" }, { src: CheckIcon, alt: "Vermifugado", texto: "Sim" }, { src: IdadeIcon, alt: "Idade", texto: "1 ano" }] }
  ];
  

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const filtrarAnimais = (animal) => {
    return (
      (!filtros.cidade || filtros.cidade === "" || filtros.cidade === animal.localizacao) &&
      (!filtros.sexo || filtros.sexo === "" || animal.icones.some((icone) => icone.texto === filtros.sexo)) &&
      (!filtros.idade || filtros.idade === "" || animal.icones.some((icone) => icone.texto === filtros.idade))
    );
  };

  const animaisFiltrados = animais.filter(filtrarAnimais);
  const cardsPorPagina = 6;
  const totalPaginas = Math.ceil(animaisFiltrados.length / cardsPorPagina);
  const animaisPagina = animaisFiltrados.slice(
    (paginaAtual - 1) * cardsPorPagina,
    paginaAtual * cardsPorPagina
  );

  return (
    <>
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
              { nome: "cidade", label: "Bairro", opcoes: ["Recife", "Olinda", "Paulista"] },
              { nome: "sexo", label: "Sexo", opcoes: ["Macho", "Fêmea"] },
              { nome: "idade", label: "Idade", opcoes: ["1 ano", "2 anos"] },
              { nome: "Categoria", label: "Categoria", opcoes: ["Cachorro", "Gato", "Outro"] },
            ]}
            onFiltroChange={handleFiltroChange}
          />
          <div className="container-animais">
            {animaisPagina.map((animal) => (
              <Card key={animal.id} item={animal} botaoTexto="Quero Adotar" />
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

export default Adocao;
