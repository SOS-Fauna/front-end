import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AcessoPerfil from "../pages/AcessoPerfil";
import logo from '../assets/logo.svg';
import icon_perfil from '../assets/iconperfil.svg';
import { FaUserCircle } from "react-icons/fa"; 
import "../styles/header.css";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem("usuarioTipo")); // "ONG", "Denunciante" ou null
  const [menuAberto, setMenuAberto] = useState(false);
  const [menuHamburguerAberto, setMenuHamburguerAberto] = useState(false);

  useEffect(() => {
    const usuarioTipo = localStorage.getItem("usuarioTipo");
    setUsuarioLogado(usuarioTipo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioTipo"); 
    setUsuarioLogado(null);
    setMenuAberto(false);
  };

  return (
    <>
      <header id="header">
        <nav className="nav-bar">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>

          <div 
            className={`menu-hamburguer ${menuHamburguerAberto ? "ativo" : ""}`} 
            onClick={() => setMenuHamburguerAberto(!menuHamburguerAberto)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>

          {/* Lista de Navegação */}
          <ul className={`nav-list ${menuHamburguerAberto ? "ativo" : ""}`}>
            <li className="nav-item"><Link to="/Denuncia" onClick={() => setMenuHamburguerAberto(false)}>Denuncie Aqui</Link></li>
            <li className="nav-item"><Link to="/Ong" onClick={() => setMenuHamburguerAberto(false)}>Encontre uma Ong</Link></li>
            <li className="nav-item"><Link to="/QuemSomos" onClick={() => setMenuHamburguerAberto(false)}>Quem Somos</Link></li>
            <li className="nav-item"><Link to="/Adocao" onClick={() => setMenuHamburguerAberto(false)}>Adoção</Link></li>
            <li className="nav-item"><Link to="/Servico-Veterinarios" onClick={() => setMenuHamburguerAberto(false)}>Atendimento Veterinário</Link></li>
          </ul>

          {usuarioLogado ? (
            <div className="perfil-menu">
              <FaUserCircle className="perfil-icone" onClick={() => setMenuAberto(!menuAberto)} />

              {menuAberto && (
                <div className="menu-suspenso">
                  <Link to={usuarioLogado === "ONG" ? "/perfil-ong" : "/perfil-usuario"} onClick={() => setMenuAberto(false)}>
                    Perfil
                  </Link>
                  {usuarioLogado === "Denunciante" && (
                    <Link to="/minhas-denuncias" onClick={() => setMenuAberto(false)}>
                      Minhas Denúncias
                    </Link>
                  )}
                  <button onClick={handleLogout}>Sair</button>
                </div>
              )}
            </div>
          ) : (
            <button className="perfil-button" onClick={() => setModalAberto(true)}>
              <img src={icon_perfil} alt="Ícone de perfil" />
            </button>
          )}
        </nav>
      </header>

      {/* Modal de Acesso */}
      {modalAberto && <AcessoPerfil fecharModal={() => setModalAberto(false)} setUsuarioLogado={setUsuarioLogado} />}
    </>
  );
}
