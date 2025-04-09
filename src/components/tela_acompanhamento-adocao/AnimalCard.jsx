import { useState } from "react";
import {FaTimes,FaMars,FaVenus,FaBirthdayCake,FaEdit,FaSyringe,} from "react-icons/fa";
import ModalCard from '../ModalCard.jsx'
import "../../styles/AnimalCard.css";

const AnimalCard = ({
  id,imgSrc, nome,localizacao,sexo,vacinacao,idade,categoria,
  atualizarAnimal = () => { },
  onDelete = () => { },
  onChange = () => { },
  modoVisualizacao = false,
}) => {
  const [dados, setDados] = useState({
    nome,localizacao,sexo, idade,imgSrc,
    vacinacao: vacinacao || "",
    categoria: categoria || "",
    status: "Em Adoção",
    tempoSistema: "0 dias",
  });

  const [editando, setEditando] = useState(false);
  const [imagem, setImagem] = useState(imgSrc);
  const [alterado, setAlterado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const novosDados = { ...dados, [name]: value };
    setDados(novosDados);
    setAlterado(true);
    onChange(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagem(imageUrl);
      setDados({ ...dados, imgSrc: imageUrl });
      setAlterado(true);
      onChange("imgSrc", imageUrl);
    }
  };

  const handleSave = () => {
    atualizarAnimal(id, dados);
    setEditando(false);
    setAlterado(false);
  };

  const toggleSexo = () => {
    const novoSexo = dados.sexo === "Macho" ? "Fêmea" : "Macho";
    setDados({ ...dados, sexo: novoSexo });
    setAlterado(true);
    onChange("sexo", novoSexo);
  };

  return (
    <div className="animal-card">
      {!modoVisualizacao && (
        <button className="delete-button" onClick={onDelete}>
          <FaTimes />
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id={`file-input-${id}`}
        onChange={handleImageChange}
      />
      <img
        src={imagem}
        alt={dados.nome}
        className="animal-img"
        onClick={
          !modoVisualizacao && editando
            ? () => document.getElementById(`file-input-${id}`).click()
            : undefined
        }
        title={modoVisualizacao || !editando ? "" : "Clique para trocar a foto"}
      />

      {/* nome */}
      <div className="card-info">
        {editando && !modoVisualizacao ? (
          <input
            name="nome"
            value={dados.nome}
            onChange={handleChange}
            placeholder="Nome"
          />
        ) : (
          <span className="animal-nome">{dados.nome}</span>
        )}
      </div>

      {/* categoria + localização */}
      <div className="localizacao-info">
        {editando ? (
          <input
            name="categoria"
            value={dados.categoria || ""}
            onChange={handleChange}
            placeholder="Categoria ex: Gato"
          />
        ) : (
          <p className="animal-categoria">{dados.categoria || "Categoria?"}</p>
        )}

        {editando ? (
          <input
            name="localizacao"
            value={dados.localizacao}
            onChange={handleChange}
            placeholder="Localização ex: Recife"
          />
        ) : (
          <p className="animal-localizacao">{dados.localizacao || ""}</p>
        )}
      </div>

      <div className="icones-container">
        {/* sexo */}
        <div
          className="icone-info"
          onClick={editando && !modoVisualizacao ? toggleSexo : undefined}
          title={editando ? "Clique para alternar entre Macho e Fêmea" : ""}
        >
          {dados.sexo === "Macho" ? (
            <FaMars color="blue" />
          ) : (
            <FaVenus color="pink" />
          )}
          <span>{dados.sexo || "Sexo?"}</span>
        </div>

        {/* idade */}
        <div className="icone-info" title="Idade aproximada do animal">
          <FaBirthdayCake color="brown" />
          {editando ? (
            <input
              name="idade"
              value={dados.idade}
              placeholder="Idade aproximada"
              onChange={handleChange}
            />
          ) : (
            <span>{dados.idade || "Idade?"}</span>
          )}
        </div>
        {/* vacinacao */}
        <div className="icone-info">
          <FaSyringe
            color="orange"
            title="Vacinação: Informe quais vacinas o animal recebeu."
          />
          {editando ? (
            <input
              name="vacinacao"
              value={dados.vacinacao}
              placeholder="Ex: V10, antirrábica..."
              onChange={handleChange}
            />
          ) : (
            <span title="Vacinas recebidas">
              {dados.vacinacao && dados.vacinacao.trim() !== ""
                ? "✅ Sim"
                : "Vacinas?"}
            </span>
          )}
        </div>
      </div>

      {/* botões editar/salvar */}
      {!modoVisualizacao &&
        (!editando ? (
          <button className="edit-button" onClick={() => setEditando(true)}>
            <FaEdit /> Editar
          </button>
        ) : (
          alterado && (
            <button className="save-button" onClick={handleSave}>
              Salvar
            </button>
          )
        ))}



      {modoVisualizacao && (
        <button
          className="btn-adotar"
          onClick={() => setMostrarModal(true)}
        >
          Quero Adotar
        </button>
      )}

      {/* modalCard de adoção */}
      {mostrarModal && (
        <ModalCard
          item={{
            nome: dados.nome,
            imgSrc: dados.imgSrc,
            localizacao: dados.localizacao,
            contato: "contato@exemplo.com",
          }}
          botaoTexto="Confirmar Adoção"
          fecharModal={() => setMostrarModal(false)}
        />
      )}


    </div>
  );
};

export default AnimalCard;
