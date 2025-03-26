import { useState, useEffect } from 'react';
import '../../styles/ModalAtualizacaoDenuncia.css';

const ModalAtualizacaoDenuncia = ({
    denuncia,
    onClose,
    onSave
}) => {
    const etapasBase = [
        { id: 1, nome: 'Acolhimento', concluido: false },
        { id: 2, nome: 'Sondagem', concluido: false },
        { id: 3, nome: 'Tratamento', concluido: false },
        { id: 4, nome: 'Socialização', concluido: false },
        { id: 5, nome: 'Adoção', concluido: false }
    ];

    const [etapasAtivas, setEtapasAtivas] = useState(() => {
        if (denuncia.etapas) {
            return denuncia.etapas;
        }

        return etapasBase.map(etapa => {
            switch (denuncia.status) {
                case 'Em andamento':
                    return { ...etapa, concluido: etapa.id === 1 }; 
                case 'Resolvida':
                    return { ...etapa, concluido: true }; 
                default:
                    return etapa; 
            }
        });
    });

    const [denunciaEditada, setDenunciaEditada] = useState({
        ...denuncia,
        etapas: etapasAtivas 
    });

    const [novosArquivos, setNovosArquivos] = useState([]);

    useEffect(() => {
        setDenunciaEditada(prev => ({
            ...prev,
            etapas: etapasAtivas
        }));
    }, [etapasAtivas]);

    const handleStatusChange = (e) => {
        setDenunciaEditada({
            ...denunciaEditada,
            status: e.target.value
        });
    };

    const toggleEtapa = (id) => {
        setEtapasAtivas(prevEtapas =>
            prevEtapas.map(etapa =>
                etapa.id === id ? { ...etapa, concluido: !etapa.concluido } : etapa
            )
        );
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setNovosArquivos([...e.target.files]);
        }
    };

    const handleSubmit = () => {
        const todasConcluidas = etapasAtivas.every(etapa => etapa.concluido);
        const status = todasConcluidas ? 'Resolvida' :
            etapasAtivas.some(etapa => etapa.concluido) ? 'Em andamento' : 'Pendente';

        const denunciaAtualizada = {
            ...denunciaEditada,
            status,
            etapas: etapasAtivas,
            arquivos: [...denunciaEditada.arquivos, ...novosArquivos]
        };

        onSave(denunciaAtualizada);
        onClose();
    };


    const removeArquivo = (index) => {
        const novosArquivos = [...denunciaEditada.arquivos];
        novosArquivos.splice(index, 1);
        setDenunciaEditada({
            ...denunciaEditada,
            arquivos: novosArquivos
        });
    };

    return (
        <div className="modal-denuncia-overlay">
            <div className="modal-denuncia-content">
                <button className="modal-close-button" onClick={onClose}>
                    &times;
                </button>

                <h2 className="modal-title">Atualizar Denúncia: {denuncia.assunto}</h2>

                <div className="denuncia-info-section">
                    <div className="form-group">
                        <label>Status atual:</label>
                        <select
                            className="status-select"
                            value={denunciaEditada.status}
                            onChange={handleStatusChange}
                        >
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Resolvida">Resolvida</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Progresso do Animal:</label>
                        <div className="etapas-container">
                            {etapasAtivas.map((etapa) => (
                                <div
                                    key={etapa.id}
                                    className={`etapa-item ${etapa.concluido ? 'concluido' : ''}`}
                                    onClick={() => toggleEtapa(etapa.id)}
                                >
                                    <div className="etapa-marcador">
                                        {etapa.concluido ? '✓' : etapa.id}
                                    </div>
                                    <span className="etapa-nome">{etapa.nome}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Descrição:</label>
                        <textarea
                            className="descricao-textarea"
                            value={denunciaEditada.descricao}
                            onChange={(e) => setDenunciaEditada({
                                ...denunciaEditada,
                                descricao: e.target.value
                            })}
                            placeholder="Descreva a atualização do caso..."
                        />
                    </div>
                </div>

                <div className="arquivos-section">
                    <h3>Arquivos Anexados</h3>

                    {denunciaEditada.arquivos.length > 0 ? (
                        <div className="arquivos-grid">
                            {denunciaEditada.arquivos.map((arquivo, index) => (
                                <div className="arquivo-item" key={index}>
                                    {arquivo.type?.startsWith("image/") ? (
                                        <img
                                            src={typeof arquivo === 'string' ? arquivo : URL.createObjectURL(arquivo)}
                                            alt={`Anexo ${index + 1}`}
                                        />
                                    ) : arquivo.type?.startsWith("video/") ? (
                                        <video controls>
                                            <source
                                                src={typeof arquivo === 'string' ? arquivo : URL.createObjectURL(arquivo)}
                                                type={arquivo.type}
                                            />
                                        </video>
                                    ) : (
                                        <div className="documento-item">
                                            <span className="documento-icon">📄</span>
                                            <span className="documento-nome">
                                                {typeof arquivo === 'string' ? arquivo.split('/').pop() : arquivo.name}
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        className="remove-arquivo"
                                        onClick={() => removeArquivo(index)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="nenhum-arquivo">Nenhum arquivo anexado</p>
                    )}

                    <div className="novos-arquivos-form">
                        <h4>Adicionar Novos Arquivos</h4>
                        <input
                            type="file"
                            id="novos-arquivos"
                            multiple
                            accept="image/*,video/*,.doc,.docx,.pdf"
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="novos-arquivos" className="file-input-label">
                            Selecione os arquivos
                        </label>
                        {novosArquivos.length > 0 && (
                            <div className="arquivos-selecionados">
                                {novosArquivos.map((file, index) => (
                                    <span key={index} className="arquivo-selecionado">
                                        {file.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-actions">
                    <button className="btn-cancelar" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-salvar" onClick={handleSubmit}>
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ModalAtualizacaoDenuncia;