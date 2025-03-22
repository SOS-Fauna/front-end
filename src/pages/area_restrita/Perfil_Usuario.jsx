import { useState } from "react";
import "../../styles/Perfil_Usuario.css";
import contato from '../../assets/contato.svg'
import redessociais from "../../assets/redessociais.svg";

const PerfilUsuario = () => {
  const [nome, setNome] = useState("Nome do Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [arroba, setArroba] = useState("@usuario");

  const handleClick = (tipo) => {
    const novoValor = window.prompt(`Digite o novo ${tipo}:`, tipo === "telefone" ? telefone : tipo === "email" ? email : arroba);
    if (novoValor !== null) {
      if (tipo === "telefone") setTelefone(novoValor);
      else if (tipo === "email") setEmail(novoValor);
      else setArroba(novoValor);
    }
  };

  const handleSalvar = () => {
    alert("Dados salvos com sucesso!");
  };

  return (
    <>
      <div className="perfil-container">
        <section className="perfil-info">
          <div className="perfil-dados">
            <h2>Atualize seus dados:</h2>
            <h1
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setNome(e.target.innerText)}
            >
              {nome}
            </h1>
            <p className="descricao">Nome de usuário</p>
          </div>
        </section>

        <div className="perfil-contato-arroba">
          <p className="editar-info">(Clique para editar os dados)</p>
  
          <div className="perfil-contato-arroba-conteudo">
            <div className="perfil-contato">
              <img src={contato} alt="Contato" />
              <span onClick={() => handleClick("telefone")}>{telefone}</span>
              <span onClick={() => handleClick("email")}>{email}</span>
            </div>

            <div className="perfil-arroba" onClick={() => handleClick("arroba")}>
              <img src={redessociais} alt="Redes Sociais" />
              <span>{arroba}</span>
            </div>
          </div>
        </div>

        <div className="perfil-salvar">
          <button className="btn-salvar" onClick={handleSalvar}>Salvar</button>
        </div>
      </div>
      
    </>
  );
};

export default PerfilUsuario;
