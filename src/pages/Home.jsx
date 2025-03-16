import Slider from "../components/Slider";
import "../styles/home.css"
import banner  from "../assets/bannerFoto.png"
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      document.body.style.overflowX = "hidden";
      return () => {
        document.body.style.overflowX = "auto"; // Restaura o padrão ao desmontar
      };
    }, []);
  return( <>
    <Slider />
    <section id="denuncia-container">
        <p className="estilo-paragrafo">Faça sua parte e ajude a combater os maus-tratos agora mesmo</p>
        <a href="#" class="denuncia-btn">FAÇA SUA DENÚNCIA AQUI!</a>

      </section>
      <section id="banner">
        <div className="container-banner">
          <dv className="textos">
            <h1 className="titulo"><b>MAUS TRATOS <br></br>A ANIMAIS É CRIME!!</b></h1>
            <p className="estilo-paragrafo">A lei federal que protege os animais de maus-tratos é a Lei de Crimes Ambientais, nº 9.605/1998, e o artigo 225 da Constituição Federal Brasileira. O crime de maus-tratos é definido no artigo 32 da Lei de Crimes Ambientais, e a pena prevista é de detenção de 3 meses a 1 ano e multa. A pena pode ser aumentada de ⅓ a ⅙ em caso de morte do animal.</p>
          </dv>

           <img src={banner} alt="Cão Marrom" /> 
        </div>
      </section>

  </>
  )
}