import { useState } from "react";
import "../../styles/Perfil_Ong.css";
import localizacao from "../../assets/localizacao.svg";
import contato from "../../assets/contato.svg";
import redessociais from "../../assets/redessociais.svg";
import Filtro from "../../components/Filtro";
import { FaPlus, FaEdit, FaCheck } from "react-icons/fa";
import AnimalCard from "../../components/card_perfil_ong/AnimalCard";

const PerfilOng = () => {
  const [nome, setNome] = useState("Nome da ONG");
  const [descricao, setDescricao] = useState("Descrição da ONG");
  const [imagem, setImagem] = useState(null);
  const [fotos, setFotos] = useState([null, null, null]);
  const [dados, setDados] = useState(["", "", ""]);
  const [animais, setAnimais] = useState([
  ]);
  const [arquivos, setArquivos] = useState(Array(6).fill(null));
  const [editando, setEditando] = useState(null);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const novosArquivos = [...arquivos];
      novosArquivos[index] = file;
      setArquivos(novosArquivos);
    }
  };

  const handleSalvar = () => {
    alert("Dados salvos e publicados no ambiente público!");
  };
  const handleDeleteAnimal = (id) => {
    setAnimais(animais.filter(animal => animal.id !== id));
  };
  return (
    <div className="perfil-container">
      {/* Seção Sobre */}
      <section className="sobre">
        <div className="sobre-text">
          {editando === "nome" ? (
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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

      {/* Seção Dados */}
      <section className="dados">
        <h1>Atualize seus dados:</h1>
        <p>(Clique no ícone para editar os dados)</p>
        <div className="dados-container">
          {[
            { src: localizacao, alt: "Localização" },
            { src: contato, alt: "Contato" },
            { src: redessociais, alt: "Rede Social" },
          ].map((item, index) => (
            <div className="dados-item" key={index}>
              <img src={item.src} alt={item.alt} />
              {editando === index ? (
                <input
                  type="text"
                  value={dados[index]}
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
                  {dados[index] || "Clique para adicionar"} <FaEdit className="edit-icon" />
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Seção Fotos */}
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


      <section className="atualizar-denuncias">
        <h2>Atualizar as Denúncias</h2>
        <p>(Carregue aqui suas atualizações de denúncia, arquivos, Word, JPEG, PNG ou MP4)</p>
        <div className="atualizar-itens">
          {arquivos.map((arquivo, index) => (
            <div className="atualizar-item" key={index} onClick={() => document.getElementById(`fileInput-${index}`).click()}>
              <input
                id={`fileInput-${index}`}
                type="file"
                accept="image/*,video/*,.doc,.docx,.pdf"
                onChange={(e) => handleFileChange(index, e)}
                style={{ display: "none" }}
              />
              {arquivo ? (
                <div className="conteudo-adicionado">
                  {arquivo.type.startsWith("image/") ? (
                    <img src={URL.createObjectURL(arquivo)} alt="Imagem" style={{ width: "100px" }} />
                  ) : arquivo.type.startsWith("video/") ? (
                    <video src={URL.createObjectURL(arquivo)} controls style={{ width: "200px" }} />
                  ) : (
                    <a href={URL.createObjectURL(arquivo)} download={arquivo.name}>
                      {arquivo.name}
                    </a>
                  )}
                </div>
              ) : (
                <>
                  <span>+</span>
                  <p>Atualizar</p>
                </>
              )}
            </div>
          ))}
        </div>
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
                    animal.id === id ? {...animal, ...novosDados} : animal
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
