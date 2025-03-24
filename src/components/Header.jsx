import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AcessoPerfil from "../pages/AcessoPerfil"
import logo from "../assets/logo.svg";
import icon_perfil from "../assets/iconperfil.svg";
import { FaUserCircle } from "react-icons/fa";
import "../styles/header.css";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(localStorage.getItem("usuarioTipo"));
  const [menuAberto, setMenuAberto] = useState(false);
  const [openMenuHamb, setOpenMenuHamb] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const usuarioTipo = localStorage.getItem("usuarioTipo");
    setUsuarioLogado(usuarioTipo);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioTipo");
    setUsuarioLogado(null);
    navigate("/"); 
  };

  const resetMenu = () => {
    setOpenMenuHamb(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resetMenu);
    window.addEventListener("scroll", resetMenu);
    return () => {
      window.removeEventListener("resize", resetMenu);
      window.removeEventListener("scroll", resetMenu);
    };
  }, []);

  return (
    <>
      <header id="header">
        <nav className="nav-bar">
          <Link to="/" className="linkLogo" onClick={resetMenu}>
            <img src={logo} alt="Logo" />
          </Link>

          <div className="menu-hamb" onClick={() => setOpenMenuHamb(!openMenuHamb)}>
            <div className={openMenuHamb ? "barra1-ative" : "barra1"}></div>
            <div className={openMenuHamb ? "barra2-ative" : "barra2"}></div>
            <div className={openMenuHamb ? "barra3-ative" : "barra3"}></div>
          </div>

          {/* Lista de Navegação */}
          <ul className={openMenuHamb ? "nav-list on" : "nav-list"}>
            <li className="nav-item">
              <Link to="/Denuncie" onClick={resetMenu}>Denuncie Aqui</Link>
            </li>
            <li className="nav-item">
              <Link to="/Ong" onClick={resetMenu}>Encontre uma Ong</Link>
            </li>
            <li className="nav-item">
              <Link to="/QuemSomos" onClick={resetMenu}>Quem Somos</Link>
            </li>
            <li className="nav-item">
              <Link to="/Adocao" onClick={resetMenu}>Adoção</Link>
            </li>
            <li className="nav-item">
              <Link to="/Servico-Veterinarios" onClick={resetMenu}>Atendimento Veterinário</Link>
            </li>
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
