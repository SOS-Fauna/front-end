import { useState } from "react";
import { FaTimes, FaMars, FaVenus, FaBirthdayCake, FaEdit, FaSyringe } from "react-icons/fa";
import "../../styles/AnimalCard.css";

const AnimalCard = ({
  id,
  imgSrc,
  nome,
  localizacao,
  sexo,
  vacinacao,
  idade,
  atualizarAnimal = () => {},
  onDelete = () => {},
  onChange = () => {}
}) => {
  const [dados, setDados] = useState({
    nome,
    localizacao,
    sexo,
    vacinacao: vacinacao || "",
    idade,
    imgSrc,
    status: "Em Adoção",
    tempoSistema: "0 dias",
  });

  const [editando, setEditando] = useState(false);
  const [imagem, setImagem] = useState(imgSrc);
  const [alterado, setAlterado] = useState(false);

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
      <button className="delete-button" onClick={onDelete}>
        <FaTimes />
      </button>

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
  onClick={() => document.getElementById(`file-input-${id}`).click()}
  title="Clique para trocar a foto"
/>


      <div className="card-info">
        {editando ? (
          <input name="nome" value={dados.nome} onChange={handleChange} autoFocus />
        ) : (
          <span className="animal-nome">{dados.nome}</span>
        )}
      </div>

      <div className="localizacao-info">
        {editando ? (
          <input name="localizacao" value={dados.localizacao } onChange={handleChange} />
        ) : (
          <p className="animal-localizacao">{dados.localizacao || "Localização?"}</p>
        )}
      </div>

      <div className="icones-container">
      <div
  className="icone-info"
  onClick={toggleSexo}
  title="Clique para alternar entre Macho e Fêmea"
>
  {dados.sexo === "Macho" ? <FaMars color="blue" /> : <FaVenus color="pink" />}
  <span>{dados.sexo || "Sexo?"}</span>
</div>


<div className="icone-info" title="Idade aproximada do animal">
  <FaBirthdayCake color="brown" />
  {editando ? (
    <input name="idade" value={dados.idade} placeholder="Idade aproximada"
    onChange={handleChange} />
  ) : (
    <span>{dados.idade || "Idade?"}</span>
  )}
</div>


        <div className="icone-info">
          <FaSyringe color="orange" title="Vacinação: Informe quais vacinas o animal recebeu." />
          {editando ? (
            <input
              name="vacinacao"
              value={dados.vacinacao}
              placeholder="Ex: V10, antirrábica..."
              onChange={handleChange}
            />
          ) : (
            <span title="Vacinas recebidas">{dados.vacinacao || "Vacinas?"}</span>
          )}
        </div>
      </div>

      {!editando ? (
        <button className="edit-button" onClick={() => setEditando(true)}>
          <FaEdit /> Editar
        </button>
      ) : (
        alterado && (
          <button className="save-button" onClick={handleSave}>
            Salvar
          </button>
        )
      )}
    </div>
  );
};

export default AnimalCard;
