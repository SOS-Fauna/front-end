import { useState } from "react";
import "../../styles/Perfil_Ong.css";
import { FaPlus, FaHome, FaAt, FaEdit } from "react-icons/fa"; 
import { IoCall } from "react-icons/io5";
import AnimalCard from "../../components/card_perfil_ong/AnimalCard";
import ModalAtualizacaoDenuncia from "../../components/card_perfil_ong/ModalAtualizaçãoDenuncia";

const PerfilOng = () => {
  const [nome, setNome] = useState("Nome da ONG");
  const [descricao, setDescricao] = useState("Descrição da ONG");
  const [imagem, setImagem] = useState(null);
  const [fotos, setFotos] = useState([null, null, null]);
  const [dados, setDados] = useState(["", "", ""]);
  const [animais, setAnimais] = useState([
  ]);
  const [editando, setEditando] = useState(null);
  const [denuncias, setDenuncias] = useState([
    {
      id: 1,
      data: "15/05/2023", assunto: "Animal abandonado", protocolo: "PROT-2023-001",
      descricao: "Cachorro abandonado na rua assis", status: "Pendente", arquivos: []
    },
    {
      id: 2,
      data: "10/05/2023", assunto: "Maus tratos", protocolo: "PROT-2023-002", descricao: "Cavalo sendo maltratado na fazenda111",
      status: "Em andamento", arquivos: []
    }


  ]);

  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSaveDenuncia = (denunciaAtualizada) => {
    setDenuncias((prevDenuncias) =>
      prevDenuncias.map((d) => (d.id === denunciaAtualizada.id ? denunciaAtualizada : d))
    );
  };


  const handleSalvar = () => {
    alert("Dados salvos e publicados no ambiente público!");
  };
  const handleDeleteAnimal = (id) => {
    setAnimais(animais.filter(animal => animal.id !== id));
  };
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const denunciasPaginadas = [...denuncias].slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(denuncias.length / itensPorPagina);


  return (
    <div className="perfil-container">
      <section className="sobre">
        <div className="sobre-text">
          {editando === "nome" ? (
            <input
              type="text" value={nome} onChange={(e) => setNome(e.target.value)}
              onBlur={() => setEditando(null)}
              autoFocus
            />
          ) : (
            <h1 onClick={() => setEditando("nome")}>
              {nome} <FaEdit className="edit-icon" />
            </h1>
          )}

          {editando === "descricao" ? (
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              onBlur={() => setEditando(null)}
              autoFocus
            />
          ) : (
            <p onClick={() => setEditando("descricao")}>
              {descricao} <FaEdit className="edit-icon" />
            </p>
          )}
          <div className="sobre-imagem">
            <label className="imagem-label">
              {imagem ? (
                <div className="imagem-wrapper">
                  <img src={imagem} alt="Foto da ONG" />
                  <button className="remover-imagem" onClick={() => setImagem(null)}>
                    ✖
                  </button>
                </div>
              ) : (
                <div className="foto-placeholder">📷</div>
              )}
              <input type="file" accept="image/*" onChange={(e) => setImagem(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>
        </div>
      </section>

<section className="dados">
  <h1>Atualize seus dados:</h1>
  <p>(Clique no ícone para editar os dados)</p>
  <div className="dados-container">
    {[
      { icon: <FaHome />, alt: "Localização" },
      { icon: <IoCall />, alt: "Contato" },
      { icon: <FaAt />, alt: "Rede Social" },
    ].map((item, index) => (
      <div className="dados-item" key={index}>
        <span className="dados-icone">{item.icon}</span> 
        {editando === index ? (
          <input
            type="text"
            value={dados[index] || ""}
            onChange={(e) => {
              const novoArray = [...dados];
              novoArray[index] = e.target.value;
              setDados(novoArray); 
            }}
            onBlur={() => setEditando(null)} 
            autoFocus
          />
        ) : (
          <p onClick={() => setEditando(index)}> 
            {dados[index] || "Clique para adicionar"}{" "}
            <FaEdit className="edit-icon" /> 
          </p>
        )}
      </div>
    ))}
  </div>
</section>


      <section className="fotos-perfil">
        <h1>Fotos de perfil</h1>
        <p>Adicione fotos da sua instituição para os usuários avaliarem</p>
        <div className="fotos-container">
          {fotos.map((foto, index) => (
            <div key={index} className="foto-box">
              {foto ? (
                <div className="imagem-wrapper">
                  <img src={foto} alt={`Foto ${index + 1}`} />
                  <button
                    className="remover-imagem"
                    onClick={() => {
                      const novasFotos = [...fotos];
                      novasFotos[index] = null;
                      setFotos(novasFotos);
                    }}
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const novasFotos = [...fotos];
                        novasFotos[index] = reader.result;
                        setFotos(novasFotos);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="input-file"
                />
              )}
            </div>
          ))}
        </div>
      </section>


      <section className="denuncias-container">
        <h2>Atualizações de Denuncias</h2>

        <div className="table-container">
          <table className="denuncias-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Assunto</th>
                <th>Protocolo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {denunciasPaginadas.map((denuncia) => (
                <tr key={denuncia.id}>
                  <td data-label="Data">{denuncia.data}</td>
                  <td data-label="Assunto">{denuncia.assunto}</td>
                  <td data-label="Protocolo">{denuncia.protocolo}</td>
                  <td data-label="Status">
                    <span className={`status-badge ${denuncia.status.toLowerCase().replace(' ', '-')}`}>
                      {denuncia.status}
                    </span>
                  </td>
                  <td data-label="Ações">
                    <button
                      className="btn-atualizar"
                      onClick={() => {
                        setDenunciaSelecionada(denuncia);
                        setMostrarModal(true);
                      }}
                    >
                      Atualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>

        {mostrarModal && denunciaSelecionada && (
          <ModalAtualizacaoDenuncia
            denuncia={denunciaSelecionada}
            onClose={() => setMostrarModal(false)}
            onSave={handleSaveDenuncia}
          />
        )}
      </section>

      <section className="animais-adocao">
        <h1>Animais para adoção</h1>
        <p>Adicione animais para adoção </p>
        <div className="disponiveis-info">
          <span>Disponíveis:</span>
          <span className="alterar-info">Clique nos ícones ou nas fotos para alterar.</span>
        </div>
        <div className="container-animais">
          {animais.map((animal) => (
            <AnimalCard
              key={animal.id}
              {...animal}
              onDelete={handleDeleteAnimal}
              atualizarAnimal={(id, novosDados) => {
                setAnimais(animais.map(animal =>
                  animal.id === id ? { ...animal, ...novosDados } : animal
                ));
              }}
            />
          ))}
          <div className="adicionar-card" onClick={() => {
            setAnimais([...animais, {
              id: Date.now(),
              imgSrc: "",
              nome: "Novo Animal",
              localizacao: "Localização",
              sexo: "Sexo",
              vermifugado: "Vermifugado",
              idade: "Idade",
            }]);
          }}>
            <FaPlus className="icone-adicionar" />
          </div>
        </div>
      </section>

      <div className="perfil-salvar">
        <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
      </div>
    </div>

  );
};

export default PerfilOng;
