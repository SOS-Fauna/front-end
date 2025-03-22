import React, { useState } from "react";
import Paginacao from "../components/Paginacao";
import Card from "../components/Card";
import Filtro from "../components/Filtro";
import vetImg from '../assets/vet-img.svg'; 
import '../styles/ServicosVeterinarios.css'

const ServicosVeterinarios = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(1);

  const vets = [
    { id: 1, imgSrc: vetImg, nome: "Clínica Animal Feliz", localizacao: "Recife", contato: "(81) 99999-9999" },
    { id: 2, imgSrc: vetImg, nome: "PetCare Olinda", localizacao: "Olinda", contato: "(81) 98888-8888" },
    { id: 3, imgSrc: vetImg, nome: "Vet Saúde Paulista", localizacao: "Paulista", contato: "(81) 97777-7777" },
  ];

  const handleFiltroChange = (novosFiltros) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const filtrarVets = (vet) => {
    return !filtros.cidade || filtros.cidade === "" || filtros.cidade === vet.localizacao;
  };

  const vetsFiltradas = vets.filter(filtrarVets);
  const cardsPorPagina = 6;
  const totalPaginas = Math.ceil(vetsFiltradas.length / cardsPorPagina);
  const vetsPagina = vetsFiltradas.slice(
    (paginaAtual - 1) * cardsPorPagina,
    paginaAtual * cardsPorPagina
  );

  return (
    <>
      <div className="page-vet">
        <div className="descricao-container">
          <h1>Serviços Veterinários</h1>
          <p>Encontre aqui clínicas veterinárias e pet shops próximas ou na sua região.</p>
        </div>
        <div className="conteudo-principal">
          <Filtro
            filtrosConfig={[
              { nome: "Bairro", label: "Bairro", opcoes: ["Recife", "Olinda", "Paulista"] },
              { nome: "Preço", label: "Preço", opcoes: ['$0 - 200', '$200 - 800', '$800 - 1000 +'] },
              { nome: "Atendimento", label: "Atendimento", opcoes: ['Presencial', 'Residencial'] },
              { nome: "Categoria", label: "Categoria", opcoes: ['Cães', 'Gatos', 'Outros'] },
            ]}
            onFiltroChange={handleFiltroChange}
          />
          <div className="container-vet">
            {vetsPagina.map((vet) => (
              <Card key={vet.id} item={vet} botaoTexto="Localizar" />
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

export default ServicosVeterinarios;
