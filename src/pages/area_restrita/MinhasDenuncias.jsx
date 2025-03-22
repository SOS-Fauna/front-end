import React from "react";
import "../../styles/MinhasDenuncias.css";

const MinhasDenuncias = () => {
  // Dados temporários (serão puxados do banco no futuro)
  const denuncias = [
    {
      data: "12/03/2025",
      assunto: "Abandono",
      protocolo: "123456",
    },
    {
      data: "05/02/2025",
      assunto: "Maus Tratos",
      protocolo: "789012",
    },
    {
      data: "08/01/2025",
      assunto: "Outro",
      protocolo: "345678",
    },
  ];

  return (
    <>
      <div className="p-4">
        <h2 className="nome">Histórico de Denúncias</h2>

        <div className="table-container">
          <table className="denuncias-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Assunto</th>
                <th>Protocolo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {denuncias.map((denuncia, index) => (
                <tr key={index}>
                  <td>{denuncia.data}</td>
                  <td>{denuncia.assunto}</td>
                  <td>{denuncia.protocolo}</td>
                  <td>
                    <button onClick={() => alert(`Detalhes da denúncia ${denuncia.protocolo}`)}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MinhasDenuncias;
