import logo from "../assets/logo.svg"
import iconperfil from "../assets/iconperfil.svg"
import "../styles/header.css"


import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header id="header">
      <nav className="nav-bar">
        <Link to="/">
          <img src={logo} alt="Descrição da imagem" />
        </Link>

        {/* <img src={logo} alt="" /> */}
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" ></Link></li>
          <li className="nav-item"><Link to="/Denuncie" >Denuncie Aqui</Link></li>
          <li className="nav-item"><Link to="/Ong" >Encontre uma Ong</Link></li>
          <li className="nav-item"><Link to="/QuemSomos" >Quem Somos</Link></li>
          <li className="nav-item"><Link to="/Adocao" >Adoção</Link></li>
          <li className="nav-item"><Link to="/Veterinario" >Atendimento Veterinário</Link></li>




        </ul>
        <img src={iconperfil} alt="" />
      </nav>
    </header>
  )

}