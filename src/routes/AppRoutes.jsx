import { Routes, Route } from "react-router-dom";
import QuemSomos from "../pages/QuemSomos";
import Home from "../pages/Home";
import Denuncie from "../pages/Denuncie";
import Ong from "../pages/Ong";
import Adocao from "../pages/Adocao";
import PerfilUsuario from "../pages/area_restrita/Perfil_Usuario";
import MinhasDenuncias from "../pages/area_restrita/MinhasDenuncias";
import ServicosVeterinarios from "../pages/ServicosVeterinarios";
import PerfilOng from "../pages/area_restrita/Perfil_Ong";
import DetalhesDenuncia from "../pages/area_restrita/Detalhes_MinhasDenuncias";
import AcompanhamentoAdocao_ONG from "../pages/area_restrita/AcompanhamentoAdocao_ONG";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/QuemSomos" element={<QuemSomos />} />
      <Route path="/Denuncie" element={<Denuncie/>} />
      <Route path="/Ong" element={<Ong/>} />
      <Route path="/Adocao" element={<Adocao/>} />
      <Route path="/Servico-Veterinarios" element={<ServicosVeterinarios/>}/>
      <Route path ="/perfil-usuario" element={<PerfilUsuario/>}/>
      <Route path = "/perfil-ong" element={<PerfilOng/>}/>
      <Route path="/minhas-denuncias" element={<MinhasDenuncias/>}/>
      <Route path="/detalhesDenuncias" element={<DetalhesDenuncia/>}/>
      <Route path="/AcompanhamentoDeAdocao" element={<AcompanhamentoAdocao_ONG/>}/>
    </Routes>
  );
}

export default AppRoutes;

