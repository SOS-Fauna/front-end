import React, { useState, useEffect } from "react";
import Filtro from "../../components/Filtro";
import "../../styles/AcompanhamentoAdocao_ONG.css";
import { FaPlus, FaInfoCircle, FaEdit, FaPaw, FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import AnimalCard from "../../components/tela_acompanhamento-adocao/AnimalCard";
import ModalAcompanhamento from "../../components/tela_acompanhamento-adocao/ModalAcompanhamento";
import animal2 from '../../assets/animal2.svg';

function AcompanhamentoAdocao_ONG() {

    useEffect(() => {
        const dadosSalvos = localStorage.getItem("animais");
        if (dadosSalvos) {
            setAnimais(JSON.parse(dadosSalvos));
        }
    }, []);

    const [abaAtiva, setAbaAtiva] = useState("acompanhamento");
    const [animais, setAnimais] = useState([
        {
            id: 1,
            nome: "Rex",
            status: "Em Adoção",
            tempoSistema: "3 meses",
            imgSrc: animal2,
            idade: "2 anos",
            sexo: "Fêmea",
            vacinacao: "Vacinado e castrado",
        },
    ]);
    const [animaisEmEdicao, setAnimaisEmEdicao] = useState([]);
    const [animalSelecionado, setAnimalSelecionado] = useState(null);
    const [editando, setEditando] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const adicionarAnimal = () => {
        setAnimaisEmEdicao(prev => [
            ...prev,
            {
                id: Date.now(),
                nome: "Novo Animal",
                status: "Em Adoção",
                imgSrc: "",
                idade: "",
                sexo: "",
                vacinacao: "",
                tempoSistema: "0 dias"
            }
        ]);
    };

    const atualizarAnimalEmEdicao = (id, campo, valor) => {
        setAnimaisEmEdicao(prev =>
            prev.map(animal =>
                animal.id === id ? { ...animal, [campo]: valor } : animal
            )
        );
    };

    const publicarAnimal = (id) => {
        const animalParaPublicar = animaisEmEdicao.find(a => a.id === id);

        if (!animalParaPublicar) {
            console.error("Animal não encontrado");
            return;
        }

        if (!animalParaPublicar.nome) {
            setMensagem("Preencha pelo menos o nome do animal!");
            setTimeout(() => setMensagem(""), 3000);
            return;
        }

        const animalAtualizado = { ...animalParaPublicar, publicado: true };

        const novaLista = animaisEmEdicao.map(a =>
            a.id === id ? animalAtualizado : a
        );
        setAnimaisEmEdicao(novaLista);

        setAnimais(prev => [...prev, animalAtualizado]);

        // retira da lista de edição
        setAnimaisEmEdicao(prev => prev.filter(a => a.id !== id));

        // salva no localStorage 
        localStorage.setItem("animais", JSON.stringify([...animais, animalAtualizado]));

        setMensagem(`${animalParaPublicar.nome} publicado com sucesso!`);
        setTimeout(() => setMensagem(""), 3000);
    };


    const removerAnimal = (id) => {
        setAnimaisEmEdicao(prev => prev.filter(a => a.id !== id));
    };

    const excluirAnimalPublicado = (id) => {
        const novaLista = animais.filter(animal => animal.id !== id);
        setAnimais(novaLista);
        localStorage.setItem("animais", JSON.stringify(novaLista));
        setMensagem("Animal removido com sucesso!");
        setTimeout(() => setMensagem(""), 3000);
      };
      

    const abrirModalDetalhes = (animal) => {
        setAnimalSelecionado({ ...animal });
        setEditando(false);
    };


    const fecharModal = () => {
        setAnimalSelecionado(null);
    };

    const salvarAlteracoes = () => {
        if (!animalSelecionado) return;

        setAnimais(prev =>
            prev.map(a => a.id === animalSelecionado.id ? animalSelecionado : a)
        );
        setEditando(false);
        fecharModal();
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Em Adoção": return <FaPaw color="orange" />;
            case "Adotado": return <FaCheckCircle color="green" />;
            case "Finalizado": return <FaTimesCircle color="red" />;
            default: return <FaPaw color="gray" />;
        }
    };

    return (
        <div className="acompanhamento-container">
            <div className="filtro-container">
                <Filtro
                    filtrosConfig={[
                        { nome: "status", label: "Status", opcoes: ["Em Adoção", "Adotado", "Finalizado"] },
                    ]}
                    onFiltroChange={(filtros) => console.log("Filtros aplicados:", filtros)}
                />
            </div>
            {/* abas fixas */}
            <div className="conteudo-container">
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
                {/* aba acompanhamento */}
                {abaAtiva === "acompanhamento" ? (
                    <section className="animais-adocao-acom">
                        <h1>Animais Cadastrados</h1>
                        <div className="container-animais-acom">
                            {animais.map(animal => (
                                <div key={animal.id} className="animal-card-acom">
                                    <div className="animal-img-container-acom">
                                        {animal.imgSrc && <img src={animal.imgSrc} alt={animal.nome} />}
                                    </div>
                                    <div className="animal-info-acom">
                                        <h3>{animal.nome}</h3>
                                        <p className="animal-status-acom">
                                            {getStatusIcon(animal.status)}
                                            <span>{animal.status}</span>
                                        </p>
                                        <p><strong>Tempo no Sistema:</strong> {animal.tempoSistema}</p>
                                        <div className="botoes-acom">
                                            <button
                                                className="detalhes-btn-acom"
                                                onClick={() => abrirModalDetalhes(animal)}
                                            >
                                                <FaInfoCircle /> Mais Detalhes
                                            </button>
                                            <button
                                                className="lixeira-btn-acom"
                                                onClick={() => excluirAnimalPublicado(animal.id)}
                                            >
                                                <FaTrash /> 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    // aba adicionar animal 
                    <section className="adicionar-animal">
                        <h1>Adicionar Novo Animal</h1>
                        <div className="adicionar-card" onClick={adicionarAnimal}>
                            <FaPlus className="icone-adicionar" />
                        </div>
                        <div className="container-animais">
                            {mensagem && <div className="mensagem-flutuante">{mensagem}</div>}
                            {animaisEmEdicao.map(animal => (
                                <div key={animal.id} className="novo-animal-card">
                                    <AnimalCard
                                        {...animal}
                                        onDelete={() => removerAnimal(animal.id)}
                                        onChange={(campo, valor) => atualizarAnimalEmEdicao(animal.id, campo, valor)}
                                    />
                                    <button
                                        className="publicar-btn"
                                        onClick={() => publicarAnimal(animal.id)
                                        }
                                        disabled={!animal.nome}
                                    >
                                        Publicar
                                    </button>

                                </div>
                            ))}
                        </div>
                    </section>
                )}
                {/* modal ==> mais detalhes */}
                <div className="modal-body-acom">
                    <div className="modal-img-container-acom">
                        <ModalAcompanhamento
                            animal={animalSelecionado}
                            setAnimal={setAnimalSelecionado}
                            onClose={fecharModal}
                            onSave={salvarAlteracoes}
                            editando={editando}
                            setEditando={setEditando}
                        />
                    </div>
                </div>
            </div>
        </div>





    );
}

export default AcompanhamentoAdocao_ONG;