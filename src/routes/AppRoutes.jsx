import { Routes, Route } from "react-router-dom";
import QuemSomos from "../pages/QuemSomos";
import Home from "../pages/Home";
import Denuncie from "../pages/Denuncie";
import Ong from "../pages/Ong";
import Adocao from "../pages/Adocao";
import Veterinario from "../pages/Veterinario";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/QuemSomos" element={<QuemSomos />} />
      <Route path="/Denuncie" element={<Denuncie/>} />
      <Route path="/Ong" element={<Ong/>} />
      <Route path="/Adocao" element={<Adocao/>} />
      <Route path="/Veterinario" element={<Veterinario/>} />
    </Routes>
  );
}

export default AppRoutes;

