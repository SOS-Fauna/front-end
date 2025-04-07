import React from "react";
import { FaEdit } from "react-icons/fa";
import "../../styles/ModalAcompanhamento.css"

function ModalAcompanhamento({
  animal,
  setAnimal,
  onClose,
  onSave,
  editando,
  setEditando
}) {
  if (!animal) return null;

  return (
    <div className="modal-overlay-acom">
      <div className="modal-content-acom">
        <button className="close-modal-acom" onClick={onClose}>×</button>

        <div className="modal-header-acom">
          <h2>
            {editando ? (
              <input
                type="text"
                value={animal.nome}
                onChange={(e) =>
                  setAnimal({ ...animal, nome: e.target.value })
                }
              />
            ) : (
              animal.nome
            )}
          </h2>
          <FaEdit
            className="icone-editar-acom"
            onClick={() => setEditando(!editando)}
            title="Editar informações do animal"
          />
        </div>

        <div className="modal-body-acom">
          <div className="modal-img-container-acom">
            {animal.imgSrc && <img src={animal.imgSrc} alt={animal.nome} />}
          </div>
          <div className="modal-info-acom">
            {editando ? (
              <>
                <div className="form-group">
                  <label>Status:</label>
                  <select
                    value={animal.status}
                    onChange={(e) =>
                      setAnimal({ ...animal, status: e.target.value })
                    }
                  >
                    <option value="Em Adoção">Em Adoção</option>
                    <option value="Adotado">Adotado</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Idade:</label>
                  <input
                    type="text"
                    value={animal.idade}
                    onChange={(e) =>
                      setAnimal({ ...animal, idade: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Sexo:</label>
                  <input
                    type="text"
                    value={animal.sexo}
                    onChange={(e) =>
                      setAnimal({ ...animal, sexo: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Vacinação:</label>
                  <input
                    type="text"
                    value={animal.vacinacao}
                    onChange={(e) =>
                      setAnimal({ ...animal, vacinacao: e.target.value })
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <p><strong>Status:</strong> {animal.status}</p>
                <p><strong>Tempo no Sistema:</strong> {animal.tempoSistema}</p>
                <p><strong>Idade:</strong> {animal.idade}</p>
                <p><strong>Sexo:</strong> {animal.sexo}</p>
                <p><strong>Vacinação:</strong> {animal.vacinacao}</p>
              </>
            )}
          </div>
        </div>

        {editando && (
          <div className="modal-actions-acom">
            <button
              className="cancelar-btn-acom"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
            <button className="salvar-btn-acom" onClick={onSave}>
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalAcompanhamento;
