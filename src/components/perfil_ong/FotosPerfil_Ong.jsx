import React from "react";
import { FaTimes } from "react-icons/fa";
// import "../../styles/FotosPerfil.css"; // ajuste conforme a estrutura da pasta

const FotosPerfil_Ong = ({ fotos, setFotos }) => {
  const handleImagem = (e, index) => {
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
  };

  const removerImagem = (index) => {
    const novasFotos = [...fotos];
    novasFotos[index] = null;
    setFotos(novasFotos);
  };

  return (
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
                  onClick={() => removerImagem(index)}
                >
                  <FaTimes className="icone-remover" />
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImagem(e, index)}
                className="input-file"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FotosPerfil_Ong;
