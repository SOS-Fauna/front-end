import React, { useState } from "react";

const ModalCadastroDenunciante = ({ fecharModal, abrirConfirmacao, onCadastroFinalizado }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cidade: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove o erro ao preencher o campo
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validarCampos = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome completo é obrigatório.";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório.";
    if (!formData.email) newErrors.email = "E-mail é obrigatório.";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório.";
    if (!formData.cidade) newErrors.cidade = "Cidade é obrigatória.";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória.";
    if (!formData.confirmarSenha) newErrors.confirmarSenha = "Confirmação de senha é obrigatória.";
    if (formData.senha && formData.confirmarSenha && formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const finalizarCadastro = () => {
    if (validarCampos()) {
      abrirConfirmacao();
      onCadastroFinalizado("Denunciante"); // Atualiza o estado para usuário logado
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={fecharModal}>✖</button>
        <h2>Cadastro Denunciante</h2>
        <div className="inputs-container">
          <div>
            <input type="text" name="nome" placeholder="Nome Completo" onChange={handleChange} value={formData.nome} />
            {errors.nome && <p className="error-text">{errors.nome}</p>}
          </div>
          <div>
            <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} value={formData.cpf} />
            {errors.cpf && <p className="error-text">{errors.cpf}</p>}
          </div>
          <div>
            <input type="email" name="email" placeholder="E-mail" onChange={handleChange} value={formData.email} />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} value={formData.telefone} />
            {errors.telefone && <p className="error-text">{errors.telefone}</p>}
          </div>
          <div>
            <input type="text" name="cidade" placeholder="Cidade" onChange={handleChange} value={formData.cidade} />
            {errors.cidade && <p className="error-text">{errors.cidade}</p>}
          </div>
          <div>
            <input type="password" name="senha" placeholder="Senha" onChange={handleChange} value={formData.senha} />
            {errors.senha && <p className="error-text">{errors.senha}</p>}
          </div>
          <div>
            <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" onChange={handleChange} value={formData.confirmarSenha} />
            {errors.confirmarSenha && <p className="error-text">{errors.confirmarSenha}</p>}
          </div>
        </div>
        <button className="btn-entrar" onClick={finalizarCadastro}>Finalizar</button>
      </div>
    </div>
  );
};

export default ModalCadastroDenunciante;
