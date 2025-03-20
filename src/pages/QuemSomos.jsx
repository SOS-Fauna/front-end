import '../styles/QuemSomos.css'
import Integrante from '../components/Integrante'

import ftArmando from '../assets/integrantes/armando.png'
import ftArthur from '../assets/integrantes/arthur.png'
import ftDani from '../assets/integrantes/dani.jpg'
import ftIsa from '../assets/integrantes/isa.png'
import ftLuiz from '../assets/integrantes/luiz.png'
import ftMaycon from '../assets/integrantes/maycon.png'
import ftTallys from '../assets/integrantes/tallys.png'

import logoPata from '../assets/logo-pag.png'
import { useEffect } from "react";

function QuemSomos() {
    /*Retira barra de rolagem horizontal    */
    useEffect(() => {
        document.body.style.overflowX = "hidden";
        return () => {
          document.body.style.overflowX = "auto"; // Restaura o padrão ao desmontar
        };
      }, []);
    return (

        <div>
            {/* <div className='imgPata'>
                <img src={logoPata} alt="logo pata" />
            </div> */}


            <div className='textQuemSomos'>

                <h1>Quem Somos</h1>

                <p>Somos uma plataforma dedicada à proteção e ao bem-estar dos animais, criada com o propósito de ser uma ponte entre aqueles que testemunham situações de maus-tratos e as autoridades ou organizações competentes para agir. Acreditamos que cada denúncia é um passo importante para construir um mundo mais justo e humano, onde todos os seres vivos sejam tratados com respeito e dignidade.</p><br />

                <p>Nossa missão vai além de oferecer um canal de denúncias. Queremos conscientizar a sociedade sobre a importância de cuidar e proteger os animais, promovendo uma cultura de respeito à vida. Por meio da tecnologia, buscamos criar uma ferramenta intuitiva e acessível, que capacite as pessoas a agir contra injustiças de maneira prática, segura e eficiente.</p><br />

                <p>Combinando empatia, inovação e responsabilidade social, trabalhamos para que nenhuma denúncia fique sem resposta e para que, juntos, possamos construir uma rede de proteção aos animais, onde cada voz tem o poder de fazer a diferença.</p>

            </div>

            <div className='NossoTime'>
                <h1>Nosso Time </h1>
                
            </div>

            <section className='secIntegrantes'>
                <div className='itensIntegrantes'>
                    <Integrante foto={ftArmando} nome="Armando Alves" descricao="Desenvolvedor Back-end" />
                    <Integrante foto={ftArthur} nome="Arthur Moura" descricao="Desenvolvedor Back-end" />
                    <Integrante foto={ftDani} nome="Danielle Ferreira" descricao="Desenvolvedora Front-end" />
                    <Integrante foto={ftIsa} nome="Isabelly Remígio" descricao="Desenvolvedora Front-end" />
                    <Integrante foto={ftLuiz} nome="Luiz Filipe" descricao="Desenvolvedor Back-end" />
                    <Integrante foto={ftMaycon} nome="Maycon Daniel" descricao="Desenvolvedor Back-end" />
                    <Integrante foto={ftTallys} nome="Tallys Labanca" descricao="Desenvolvedor Back-end" />
                </div>
            </section>

            <div className='textrodape'>
                <p>Com empatia e compromisso, você pode transformar vidas e somar forças à nossa missão de proteger os animais. Junte-se a nós e ajude a dar voz a quem mais precisa!</p>
            </div>

        </div>
    )
}

export default QuemSomos