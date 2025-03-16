import { useEffect, useState } from "react"
import "../styles/slider.css"
import carouselImg1 from '../assets/Slide1.png';
import carouselImg2 from '../assets/Slide2.png';
import carouselImg3 from '../assets/Slide3.png';
import carouselImg4 from '../assets/Slide4.png';


export default function Slider() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [carouselImg1, carouselImg2, carouselImg3, carouselImg4];

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Função para voltar para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // Avança a cada 3 segundos
    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <>
      <section className="slider">
        <div className="slides">
          {slides.map((img, index) => (
            <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Navegação Manual */}
        <div className="manual-navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`manual-btn ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

      </section>

    </>
  )


}