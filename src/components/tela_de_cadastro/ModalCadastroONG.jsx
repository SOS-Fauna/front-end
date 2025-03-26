import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5"; 

const ModalCadastroONG = ({ fecharModal, abrirConfirmacao, onCadastroFinalizado }) => {
  const [etapa, setEtapa] = useState(1);
  const [formData, setFormData] = useState({
    nomeEntidade: "",
    cnpj: "",
    email: "",
    dataConstituicao: "",
    finalidade: "",
    endereco: "",
    responsavel: "",
    contato: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validarCamposEtapa1 = () => {
    const newErrors = {};
    if (!formData.nomeEntidade) newErrors.nomeEntidade = "Nome da Entidade é obrigatório.";
    if (!formData.cnpj) newErrors.cnpj = "CNPJ é obrigatório.";
    if (!formData.email) newErrors.email = "E-mail é obrigatório.";
    if (!formData.dataConstituicao) newErrors.dataConstituicao = "Data de Constituição é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validarCamposEtapa2 = () => {
    const newErrors = {};
    if (!formData.finalidade) newErrors.finalidade = "Finalidade é obrigatória.";
    if (!formData.endereco) newErrors.endereco = "Endereço é obrigatório.";
    if (!formData.responsavel) newErrors.responsavel = "Nome do responsável é obrigatório.";
    if (!formData.contato) newErrors.contato = "Contato é obrigatório.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finalizarCadastro = () => {
    if (validarCamposEtapa2()) {
      abrirConfirmacao(); 
      onCadastroFinalizado("ONG"); 
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={fecharModal}>✖</button>
        <h2>Cadastro ONG</h2>

        {etapa === 1 ? (
          <div className="inputs-container">
            <button className="btn-voltar" onClick={() => setEtapa(1)}>
              <IoArrowBack size={24} /> 
            </button>
            <div>
              <input type="text" name="nomeEntidade" placeholder="Nome da Entidade" onChange={handleChange} value={formData.nomeEntidade} />
              {errors.nomeEntidade && <p className="error-text">{errors.nomeEntidade}</p>}
            </div>
            <div>
              <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} value={formData.cnpj} />
              {errors.cnpj && <p className="error-text">{errors.cnpj}</p>}
            </div>
            <div>
              <input type="email" name="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
              <input type="date" name="dataConstituicao" placeholder="Data de Constituição" onChange={handleChange} value={formData.dataConstituicao} />
              {errors.dataConstituicao && <p className="error-text">{errors.dataConstituicao}</p>}
            </div>
            <button className="btn-entrar" onClick={() => validarCamposEtapa1() && setEtapa(2)}>Próximo</button>
          </div>
        ) : (
          <div className="inputs-container">
            <button className="btn-voltar" onClick={() => setEtapa(1)}>
              <IoArrowBack size={24} /> 
            </button>
            <div>
              <input type="text" name="finalidade" placeholder="Finalidade Institucional" onChange={handleChange} value={formData.finalidade} />
              {errors.finalidade && <p className="error-text">{errors.finalidade}</p>}
            </div>
            <div>
              <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} value={formData.endereco} />
              {errors.endereco && <p className="error-text">{errors.endereco}</p>}
            </div>
            <div>
              <input type="text" name="responsavel" placeholder="Nome do Responsável" onChange={handleChange} value={formData.responsavel} />
              {errors.responsavel && <p className="error-text">{errors.responsavel}</p>}
            </div>
            <div>
              <input type="text" name="contato" placeholder="Contato (WhatsApp)" onChange={handleChange} value={formData.contato} />
              {errors.contato && <p className="error-text">{errors.contato}</p>}
            </div>
            <button className="btn-entrar" onClick={finalizarCadastro}>Finalizar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCadastroONG;
