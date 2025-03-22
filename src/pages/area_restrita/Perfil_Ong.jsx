import { useState } from "react";
import "../../styles/Perfil_Ong.css";
import localizacao from '../../assets/localizacao.svg';
import contato from '../../assets/contato.svg';
import redessociais from '../../assets/redessociais.svg';
import Filtro from "../../components/Filtro";
import { FaPlus } from "react-icons/fa";
import AnimalCard from "../../components/card_perfil_ong/AnimalCard";

const PerfilOng = () => {
  const [nome, setNome] = useState("Nome da ONG");
  const [descricao, setDescricao] = useState("Descrição da ONG");
  const [imagem, setImagem] = useState(null);
  const [fotos, setFotos] = useState([null, null, null]);
  const [dados, setDados] = useState(["", "", ""]);
  const [animais, setAnimais] = useState([
    { id: 1, imgSrc: "", nome: "Bob", localizacao: "SP", sexo: "Macho", vermifugado: "Sim", idade: "2 anos" },
    { id: 2, imgSrc: "", nome: "Luna", localizacao: "RJ", sexo: "Fêmea", vermifugado: "Sim", idade: "1 ano" },
  ]);
  const [filtrosSelecionados, setFiltrosSelecionados] = useState({});
  const [arquivos, setArquivos] = useState(Array(6).fill(null));

  const handleFiltroChange = (nomeFiltro) => {
    setFiltrosSelecionados((prevState) => ({
      ...prevState,
      [nomeFiltro]: !prevState[nomeFiltro],
    }));
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const novosArquivos = [...arquivos];
      novosArquivos[index] = file;
      setArquivos(novosArquivos);
    }
  };

  const handleSalvar = () => {
    alert("Dados salvos com sucesso!");
  };


  return (
    <>

      <div className="perfil-container">
        <section className="sobre">
          <div className="sobre-text">
            <h1 contentEditable suppressContentEditableWarning onBlur={(e) => setNome(e.target.innerText)}>
              {nome}
            </h1>
            <p contentEditable suppressContentEditableWarning onBlur={(e) => setDescricao(e.target.innerText)}>
              {descricao}
            </p>
          </div>
          <div className="sobre-imagem">
            <label className="imagem-label">
              {imagem ? (
                <img src={imagem} alt="Foto da ONG" />
              ) : (
                <div className="foto-placeholder">📷</div>
              )}
              <input type="file" accept="image/*" onChange={(e) => setImagem(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>
        </section>

        <section className="dados">
          <h1>Atualize seus dados:</h1>
          <p>(Clique no ícone para editar os dados)</p>
          <div className="dados-container">
            {[
              { src: localizacao, alt: "Localização" },
              { src: contato, alt: "Contato" },
              { src: redessociais, alt: "Rede Social" },
            ].map((item, index) => (
              <div className="dados-item" key={index} onClick={() => {
                const novoTexto = window.prompt("Digite o novo dado:");
                if (novoTexto !== null) {
                  setDados((prevDados) => {
                    const novoArray = [...prevDados];
                    novoArray[index] = novoTexto;
                    return novoArray;
                  });
                }
              }}>
                <img src={item.src} alt={item.alt} />
                <p>{dados[index] || "Clique para adicionar"}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fotos-perfil">
          <div>
            <h1>Fotos de perfil</h1>
            <p>Adicione fotos da sua instituição para os usuários avaliarem</p>
          </div>
          <div className="fotos-container">
            {fotos.map((foto, index) => (
              <div key={index} className="foto-box">
                {foto ? (
                  <img src={foto} alt={`Foto ${index + 1}`} />
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

        <div className="filtro-atualizar-container">
          <Filtro 
            filtrosConfig={[
              { nome: "nChamado", label: "N. Chamado", opcoes: ["Número 1", "Número 2", "Número 3"] },
              { nome: "cidade", label: "Cidade", opcoes: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"] },
              { nome: "categoria", label: "Categoria", opcoes: ["Resgate", "Adoção", "Denúncia"] }
            ]} 
            onFiltroChange={handleFiltroChange} 
          />

<div className="atualizar-denuncias">
  <h2>Atualizar as Denúncias</h2>
  <p>(Carregue aqui suas atualizações de denúncia, arquivos, Word, JPEG, PNG ou MP4)</p>

  <div className="atualizar-itens">
    {arquivos.map((arquivo, index) => (
      <div
        className="atualizar-item"
        key={index}
        onClick={() => document.getElementById(`fileInput-${index}`).click()}
      >
        <input
          id={`fileInput-${index}`}
          type="file"
          style={{ display: "none" }}
          accept="image/*,video/*,.doc,.docx,.pdf"
          onChange={(e) => handleFileChange(index, e)}
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
</div>
</div>

        <section className="animais-adocao">
          <h1>Animais para adoção</h1>
          <p>Adicione animais para adoção ou acompanhe o status dos seus animais.</p>
          <div className="disponiveis-info">
        <span>Disponíveis:</span>
        <span className="alterar-info">Clique nos ícones ou nas fotos para alterar.</span>
      </div>
          <div className="container-animais">
            {animais.map((animal) => (
              <AnimalCard key={animal.id} {...animal} />
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
      

    </>
  );
};

export default PerfilOng;
