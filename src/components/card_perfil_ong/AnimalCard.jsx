import { useState } from "react";
import { FaTimes } from "react-icons/fa"; 
import "../../styles/AnimalCard.css"
import Sexo from "../../assets/Sexo.svg";
import check from "../../assets/check.svg";
import Idade from "../../assets/Idade.svg";

const AnimalCard = ({ id, imgSrc, nome, localizacao, sexo, vermifugado, idade, atualizarAnimal, abrirModal, onDelete }) => {
  const [dados, setDados] = useState({ nome, localizacao, sexo, vermifugado, idade });
  const [editandoCampo, setEditandoCampo] = useState(null);
  const [imagem, setImagem] = useState(imgSrc);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    atualizarAnimal(id, { [name]: value }); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagem(imageUrl);
      atualizarAnimal(id, { imgSrc: imageUrl });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="animal-card">
      <button className="delete-button" onClick={handleDelete}>
        <FaTimes />
      </button>
      
      <input type="file" accept="image/*" style={{ display: "none" }} id={`file-input-${id}`} onChange={handleImageChange} />
      <img src={imagem} alt={dados.nome} className="animal-img" onClick={() => document.getElementById(`file-input-${id}`).click()} />

      <div className="card-info">
        {editandoCampo === "nome" ? (
          <input name="nome" value={dados.nome} onChange={handleChange} onBlur={() => setEditandoCampo(null)} autoFocus />
        ) : (
          <span className="animal-nome" onClick={() => setEditandoCampo("nome")}>{dados.nome}</span>
        )}
      </div>

      {editandoCampo === "localizacao" ? (
        <input name="localizacao" value={dados.localizacao} onChange={handleChange} onBlur={() => setEditandoCampo(null)} autoFocus />
      ) : (
        <p className="animal-localizacao" onClick={() => setEditandoCampo("localizacao")}>{dados.localizacao}</p>
      )}

      <div className="icones-container">
        <div className="icone-info" onClick={() => setEditandoCampo("sexo")}>
          <img src={Sexo} alt="Sexo" />
          {editandoCampo === "sexo" ? (
            <input name="sexo" value={dados.sexo} onChange={handleChange} onBlur={() => setEditandoCampo(null)} autoFocus />
          ) : (
            <span>{dados.sexo}</span>
          )}
        </div>

        <div className="icone-info" onClick={() => setEditandoCampo("vermifugado")}>
          <img src={check} alt="Vermifugado" />
          {editandoCampo === "vermifugado" ? (
            <input name="vermifugado" value={dados.vermifugado} onChange={handleChange} onBlur={() => setEditandoCampo(null)} autoFocus />
          ) : (
            <span>{dados.vermifugado}</span>
          )}
        </div>

        <div className="icone-info" onClick={() => setEditandoCampo("idade")}>
          <img src={Idade} alt="Idade" />
          {editandoCampo === "idade" ? (
            <input name="idade" value={dados.idade} onChange={handleChange} onBlur={() => setEditandoCampo(null)} autoFocus />
          ) : (
            <span>{dados.idade}</span>
          )}
        </div>
      </div>

      <button className="btn-criar" onClick={abrirModal}>Criar</button>
    </div>
  );
};

export default AnimalCard;