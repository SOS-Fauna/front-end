import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import '../../styles/CarrosselFotos_Ong.css';

const CarrosselFotos_Ong = ({ fotos }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const proximaFoto = () => {
    setIndiceAtual((indiceAtual + 1) % fotos.length);
  };

  const fotoAnterior = () => {
    setIndiceAtual((indiceAtual - 1 + fotos.length) % fotos.length);
  };

  if (!fotos || fotos.length === 0) return null;

  return (
    <div className="carrossel-fotos">
      <button className="seta esquerda" onClick={fotoAnterior}>
        <IoIosArrowBack />
      </button>

      <img src={fotos[indiceAtual]} alt={`Foto ${indiceAtual + 1}`} className="imagem-carrossel" />

      <button className="seta direita" onClick={proximaFoto}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default CarrosselFotos_Ong;
