import React, { useState, useEffect } from "react";

import logo from "../assets/logo.svg";
import iconperfil from "../assets/iconperfil.svg";
import "../styles/header.css";

import { Link } from "react-router-dom";

export default function Header() {
  const [openMenuHamb, setOpenMenuHamb] = useState(false);
  const resetMenu = () => {
    setOpenMenuHamb(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resetMenu);
    window.addEventListener("scroll", resetMenu);
  }, []);

  const clickMenu = () => {
    setOpenMenuHamb(!openMenuHamb);
  };

  return (
    <header id="header">
      <nav className="nav-bar">
        <Link to="/" className="linkLogo" onClick={resetMenu}>
          <img src={logo} alt="Descrição da imagem" />
        </Link>
        <div onClick={clickMenu}>
          <div className="menu-hamb">
            <div className={openMenuHamb ? "barra1-ative" : "barra1"}></div>
            <div className={openMenuHamb ? "barra2-ative" : "barra2"}></div>
            <div className={openMenuHamb ? "barra3-ative" : "barra3"}></div>
          </div>
          <ul className={openMenuHamb ? "nav-list on" : "nav-list"}>
            <li className="nav-item">
              <Link to="/Denuncie">Denuncie Aqui</Link>
            </li>
            <li className="nav-item">
              <Link to="/Ong">Encontre uma Ong</Link>
            </li>
            <li className="nav-item">
              <Link to="/QuemSomos">Quem Somos</Link>
            </li>
            <li className="nav-item">
              <Link to="/Adocao">Adoção</Link>
            </li>
            <li className="nav-item">
              <Link to="/Veterinario">Atendimento Veterinário</Link>
            </li>
          </ul>
        </div>

        <div className="iconePerfil">
          <img src={iconperfil} alt="" />
        </div>
      </nav>
    </header>
  );
}