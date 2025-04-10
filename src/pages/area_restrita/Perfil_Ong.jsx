import { useState } from "react";
import "../../styles/Perfil_Ong.css";
import ModalAtualizacaoDenuncia from "../../components/perfil_ong/ModalAtualizaçãoDenuncia";
import SobreOng from "../../components/perfil_ong/SobreOng";
import DadosOng from "../../components/perfil_ong/DadosOng";
import FotosPerfil_Ong from "../../components/perfil_ong/FotosPerfil_Ong";

const PerfilOng = () => {
  const [nome, setNome] = useState("Nome da ONG");
  const [descricao, setDescricao] = useState("Descrição da ONG");
  const [imagem, setImagem] = useState(null);
  const [dados, setDados] = useState(["", "", ""]);
  const [fotos, setFotos] = useState([null, null, null]);
  const [editando, setEditando] = useState(null);
  const [denuncias, setDenuncias] = useState([
    {
      id: 1,
      data: "15/05/2023",
      assunto: "Animal abandonado",
      protocolo: "PROT-2023-001",
      descricao: "Cachorro abandonado na rua assis",
      status: "Pendente",
      arquivos: [],
    },
    {
      id: 2,
      data: "10/05/2023",
      assunto: "Maus tratos",
      protocolo: "PROT-2023-002",
      descricao: "Cavalo sendo maltratado na fazenda111",
      status: "Em andamento",
      arquivos: [],
    },
  ]);

  const [denunciaSelecionada, setDenunciaSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSaveDenuncia = (denunciaAtualizada) => {
    setDenuncias((prevDenuncias) =>
      prevDenuncias.map((d) =>
        d.id === denunciaAtualizada.id ? denunciaAtualizada : d
      )
    );
  };

  const [publicado, setPublicado] = useState(false);
  const [alterado, setAlterado] = useState(false);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const denunciasPaginadas = [...denuncias].slice(indiceInicial, indiceFinal);
  const totalPaginas = Math.ceil(denuncias.length / itensPorPagina);

  const [mensagem, setMensagem] = useState("");


  const salvarPerfil = () => {
    setPublicado(true);
    setAlterado(false);
  
    try {
      let ongsSalvas = JSON.parse(localStorage.getItem("ongsPublicadas")) || [];
  
      const imagemValida =
        typeof imagem === "string" &&
        (imagem.startsWith("blob:") || imagem.startsWith("data:"))
          ? ""
          : imagem;
  
      const fotosValidas = fotos.map((foto) =>
        typeof foto === "string" &&
        (foto.startsWith("blob:") || foto.startsWith("data:"))
          ? ""
          : foto
      );
  
      const dadosFiltrados = {
        nome,
        descricao,
        localizacao: dados[0],
        telefone: dados[1],
        redesSociais: dados[2],
        imagem: imagemValida,
        fotos: fotosValidas,
      };
  
      const indexExistente = ongsSalvas.findIndex((ong) => ong.nome === nome);
  
      if (indexExistente !== -1) {
        ongsSalvas[indexExistente] = dadosFiltrados;
      } else {
        ongsSalvas.push(dadosFiltrados);
      }
  
      localStorage.setItem("ongsPublicadas", JSON.stringify(ongsSalvas));
      setMensagem("Perfil publicado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
      setMensagem("Erro ao publicar o perfil.");
    }
  
    setTimeout(() => setMensagem(""), 3000); 
  };
  
  

  return (
    <div className="perfil-container">
      {mensagem && <div className="mensagem-flutuante">{mensagem}</div>}

      <SobreOng
        nome={nome}
        setNome={(valor) => {
          setNome(valor);
          setAlterado(true);
        }}
        descricao={descricao}
        setDescricao={(valor) => {
          setDescricao(valor);
          setAlterado(true);
        }}
        imagem={imagem}
        setImagem={(valor) => {
          setImagem(valor);
          setAlterado(true);
        }}
        editando={editando}
        setEditando={setEditando}
      />

      <DadosOng
        dados={dados}
        setDados={(valor) => {
          setDados(valor);
          setAlterado(true);
        }}
        editando={editando}
        setEditando={setEditando}
      />

      <FotosPerfil_Ong
        fotos={fotos}
        setFotos={(valor) => {
          setFotos(valor);
          setAlterado(true);
        }}
      />

      <section className="denuncias-container">
        <h2>Atualizações de Denuncias</h2>

        <div className="table-container">
          <table className="denuncias-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Assunto</th>
                <th>Protocolo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {denunciasPaginadas.map((denuncia) => (
                <tr key={denuncia.id}>
                  <td data-label="Data">{denuncia.data}</td>
                  <td data-label="Assunto">{denuncia.assunto}</td>
                  <td data-label="Protocolo">{denuncia.protocolo}</td>
                  <td data-label="Status">
                    <span
                      className={`status-badge ${denuncia.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {denuncia.status}
                    </span>
                  </td>
                  <td data-label="Ações">
                    <button
                      className="btn-atualizar"
                      onClick={() => {
                        setDenunciaSelecionada(denuncia);
                        setMostrarModal(true);
                      }}
                    >
                      Atualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mostrarModal && denunciaSelecionada && (
          <ModalAtualizacaoDenuncia
            denuncia={denunciaSelecionada}
            onClose={() => setMostrarModal(false)}
            onSave={handleSaveDenuncia}
          />
        )}
      </section>

      <div className="perfil-salvar">
        {alterado && (
          <button className="btn-salvar" onClick={salvarPerfil}>
            {publicado ? "Atualizar Perfil" : "Publicar Perfil"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PerfilOng;
