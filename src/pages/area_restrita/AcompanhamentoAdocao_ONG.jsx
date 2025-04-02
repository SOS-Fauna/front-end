import React, { useState } from "react";
import Filtro from "../../components/Filtro";
import "../../styles/AcompanhamentoAdocao_ONG.css";
import { FaPlus, FaInfoCircle, FaEdit,FaPaw, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AnimalCard from "../../components/card_perfil_ong/AnimalCard";

export default function AcompanhamentoAdocao_ONG() {
  const [abaAtiva, setAbaAtiva] = useState("acompanhamento");
  const [animais, setAnimais] = useState([
    {
      id: 1,
      nome: "Rex",
      status: "Em Adoção",
      tempoSistema: "3 meses",
      imgSrc: "https://placekitten.com/300/200",
      descricao: "Cachorro brincalhão e cheio de energia",
      idade: "2 anos",
      sexo: "Femea",
      vacinação: "Vacinado e castrado",
    },
  ]);
  const [animaisParaAdicionar, setAnimaisParaAdicionar] = useState([]);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [editando, setEditando] = useState(false);

  const adicionarAnimal = () => {
    const novoAnimal = {
      id: Date.now(),
      nome: "Novo Animal",
      status: "Em Adoção",
      imgSrc: "https://placekitten.com/300/200",
      descricao: "",
      idade: "",
      sexo: "",
      vacina: "",
    };
    setAnimaisParaAdicionar([...animaisParaAdicionar, novoAnimal]);
  };

  const publicarAnimal = (id) => {
    const animalPublicado = animaisParaAdicionar.find((animal) => animal.id === id);
    if (!animalPublicado) return;

    setAnimais([...animais, animalPublicado]);
    setAnimaisParaAdicionar(animaisParaAdicionar.filter((animal) => animal.id !== id));
  };

  const abrirModalDetalhes = (animal) => {
    setAnimalSelecionado(animal);
    setEditando(false);
  };

  const fecharModal = () => {
    setAnimalSelecionado(null);
  };

  const salvarAlteracoes = () => {
    setAnimais(animais.map((a) => (a.id === animalSelecionado.id ? animalSelecionado : a)));
    setEditando(false);
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "Em Adoção":
        return <FaPaw color="orange" />;
      case "Adotado":
        return <FaCheckCircle color="green" />;
      case "Finalizado":
        return <FaTimesCircle color="red" />;
      default:
        return <FaPaw color="gray" />;
    }
  };
  
  return (
    <div className="acompanhamento-container">
      {/* Filtro */}
      <div className="filtro-abas-container">
   <Filtro
     filtrosConfig={[
       { nome: "status", label: "Status", opcoes: ["Em Adoção", "Adotado", "Finalizado"] },
     ]}
     onFiltroChange={(filtros) => console.log("Filtros aplicados:", filtros)}
   />
   <div className="abas">
     <button
       className={abaAtiva === "acompanhamento" ? "ativa" : ""}
       onClick={() => setAbaAtiva("acompanhamento")}
     >
       Acompanhamento de Adoção
     </button>
     <button
       className={abaAtiva === "adicionar" ? "ativa" : ""}
       onClick={() => setAbaAtiva("adicionar")}
     >
       Adicionar Animal
     </button>
   </div>


        {abaAtiva === "acompanhamento" ? (
  <section className="animais-adocao-acom">
    <h1>Animais Cadastrados</h1>
    <div className="container-animais-acom">
      {animais.map((animal) => (
        <div key={animal.id} className="animal-card-acom">
          <div className="animal-img-container-acom">
            <img src={animal.imgSrc} alt={animal.nome} />
          </div>
          <div className="animal-info-acom">
            <h3>{animal.nome}</h3>
            <p className="animal-status-acom">
              {getStatusIcon(animal.status)}
              <span>{animal.status}</span>
            </p>
            <p><strong>Tempo no Sistema:</strong> {animal.tempoSistema}</p>
            <button 
              className="detalhes-btn-acom"
              onClick={() => abrirModalDetalhes(animal)}
            >
              <FaInfoCircle /> Mais Detalhes
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
) : (
          <section className="adicionar-animal">
            <h1>Adicionar Novo Animal</h1>
            <div className="adicionar-card" onClick={adicionarAnimal}>
              <FaPlus className="icone-adicionar" />
            </div>
            <div className="container-animais">
              {animaisParaAdicionar.map((animal) => (
                <div key={animal.id} className="novo-animal-card">
                  <AnimalCard {...animal} />
                  <button className="publicar-btn" onClick={() => publicarAnimal(animal.id)}>
                    Publicar
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Modal de Detalhes */}
      {animalSelecionado && (
        <div className="modal-overlay-acom">
          <div className="modal-content-acom">
            <button className="close-modal-acom" onClick={fecharModal}>×</button>
            
            <div className="modal-header-acom">
              <h2>
                {editando ? (
                  <input
                    type="text"
                    value={animalSelecionado.nome}
                    onChange={(e) =>
                      setAnimalSelecionado({ ...animalSelecionado, nome: e.target.value })
                    }
                  />
                ) : (
                  animalSelecionado.nome
                )}
              </h2>
              <FaEdit
                className="icone-editar-acom"
                onClick={() => setEditando(!editando)}
              />
            </div>

            <div className="modal-body-acom">
              <div className="modal-img-container-acom">
                <img src={animalSelecionado.imgSrc} alt={animalSelecionado.nome} />
              </div>
              <div className="modal-info-acom">
                {editando ? (
                  <>
                    <label>Status:</label>
                    <select
                      value={animalSelecionado.status}
                      onChange={(e) =>
                        setAnimalSelecionado({ ...animalSelecionado, status: e.target.value })
                      }
                    >
                      <option value="Em Adoção">Em Adoção</option>
                      <option value="Adotado">Adotado</option>
                      <option value="Finalizado">Finalizado</option>
                    </select>
                    <label>Descrição:</label>
                    <textarea
                      value={animalSelecionado.descricao}
                      onChange={(e) =>
                        setAnimalSelecionado({ ...animalSelecionado, descricao: e.target.value })
                      }
                    />
                    <label>Idade:</label>
                    <input
                      type="text"
                      value={animalSelecionado.idade}
                      onChange={(e) =>
                        setAnimalSelecionado({ ...animalSelecionado, idade: e.target.value })
                      }
                    />
                    <label>Sexo:</label>
                    <input
                      type="text"
                      value={animalSelecionado.sexo}
                      onChange={(e) =>
                        setAnimalSelecionado({ ...animalSelecionado, porte: e.target.value })
                      }
                    />
                    <label>Vacina:</label>
                    <input
                      type="text"
                      value={animalSelecionado.vacinação}
                      onChange={(e) =>
                        setAnimalSelecionado({ ...animalSelecionado, saude: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <p><strong>Status:</strong> {animalSelecionado.status}</p>
                    <p><strong>Tempo no Sistema:</strong> {animalSelecionado.tempoSistema}</p>
                    <p><strong>Descrição:</strong> {animalSelecionado.descricao}</p>
                    <p><strong>Idade:</strong> {animalSelecionado.idade}</p>
                    <p><strong>Sexo:</strong> {animalSelecionado.sexo}</p>
                    <p><strong>Vacina:</strong> {animalSelecionado.vacinação}</p>
                  </>
                )}
              </div>
            </div>

            {editando && (
              <div className="modal-actions-acom">
                <button className="cancelar-btn-acom" onClick={() => setEditando(false)}>Cancelar</button>
                <button className="salvar-btn-acom" onClick={salvarAlteracoes}>Salvar Alterações</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
