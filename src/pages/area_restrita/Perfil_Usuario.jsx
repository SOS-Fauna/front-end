import { useState } from "react";
import "../../styles/Perfil_Usuario.css";
import { IoCall } from "react-icons/io5";
import {  FaAt, FaEdit } from "react-icons/fa"; 


const PerfilUsuario = () => {
  const [nome, setNome] = useState("Nome do Usuário");
  const [telefone, setTelefone] = useState("Adicionar Telefone");
  const [email, setEmail] = useState("Adicionar Email ");
  const [arroba, setArroba] = useState("Adicionar Rede Social");
  const [editando, setEditando] = useState(null);
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
  {/* Contato */}
  <div className="perfil-contato">
    <span className="dados-icones">{<IoCall />}</span>
    {editando === "telefone" ? (
      <>
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)} 
          onBlur={() => setEditando(null)} 
          autoFocus
        />
        <FaEdit className="edit-icon" /> 
      </>
    ) : (
      <span onClick={() => setEditando("telefone")}>
        {telefone || "Clique para adicionar"} <FaEdit className="edit-icon" />
      </span>
    )}
    {editando === "email" ? (
      <>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onBlur={() => setEditando(null)} 
          autoFocus
        />
        <FaEdit className="edit-icon" />
      </>
    ) : (
      <span onClick={() => setEditando("email")}>
        {email || "Clique para adicionar"} <FaEdit className="edit-icon" />
      </span>
    )}
  </div>

  <div className="perfil-arroba">
    <span className="dados-icones">{<FaAt />}</span>
    {editando === "arroba" ? (
      <>
        <input
          type="text"
          value={arroba}
          onChange={(e) => setArroba(e.target.value)} 
          onBlur={() => setEditando(null)} 
          autoFocus
        />
        <FaEdit className="edit-icon" />
      </>
    ) : (
      <span onClick={() => setEditando("arroba")}>
        {arroba || "Clique para adicionar"} <FaEdit className="edit-icon" />
      </span>
    )}
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
