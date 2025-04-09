import "../styles/ModalCard.css";
import CarrosselFotos_Ong from "./perfil_ong/CarrosselFotos_Ong";

const ModalCard = ({ item, fecharModal, botaoTexto }) => {
  if (!item) return null;

  const renderConteudoAnimal = () => (
    <>
      <img
        src={item.imgSrc || "https://via.placeholder.com/150"}
        alt={item.nome}
        className="modal-img"
      />
      <h2>{item.nome}</h2>
      <p className="localizacao-card">{item.localizacao}</p>
      <div className="modal-ong-info">
        <p>
          <strong>Contato:</strong> {item.contato}
        </p>
      </div>
    </>
  );

  const renderConteudoOng = () => (
    <>
      <h2>{item.nome}</h2>
      <CarrosselFotos_Ong fotos={item.fotos} />
      <p className="descricao-ong">{item.descricao}</p>
      <div className="modal-ong-info">
        <p>
          <strong>Endereço:</strong> {item.localizacao}
        </p>
        <p>
          <strong>Contato:</strong> {item.contato}
        </p>
      </div>
    </>
  );

  return (
    <div className="modal-overlay" onClick={fecharModal}>
      <div className="modal-container-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={fecharModal}>
          ✖
        </button>

        {item.tipo === "ong" ? renderConteudoOng() : renderConteudoAnimal()}

        <button className="btn-adotar">{botaoTexto}</button>
      </div>
    </div>
  );
};

export default ModalCard;
