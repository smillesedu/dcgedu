import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import FormCadastroAluno from './ModalAluno';
import ModalAluno from './ModalAluno';

export const CadastroAluno = () => {
    const [visible, setVisible] = useState(false)

    const [aluno, setAluno] = useState({
        nome: "",
        dataNascimento: "",
        email: "",
        telefone: "",
        endereco: {
            casaNumero: "",
            bairro: "",
            municipio: "",
            distrito: "",
            provincia: ""
        },
        responsavelId: ""
    });

    // Função para atualizar campos normais
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para atualizar campos do endereço
    const handleEnderecoChange = (e) => {
        const { name, value } = e.target;
        setAluno((prev) => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [name]: value
            }
        }));
    };

    // Função para adicionar novo aluno
    const adicionarAluno = () => {
        // Aqui você pode enviar para API usando fetch/axios
        console.log("Novo aluno cadastrado:", aluno);
        alert("Aluno cadastrado com sucesso!");
    };

    return (
        <>
            <div
                        className="modal fade"
                        id="modalCadastroAluno"
                        tabIndex="-1"
                        aria-labelledby="modalCadastroAlunoLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="modalCadastroAlunoLabel">
                                        Cadastrar Novo Aluno
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <ModalAluno />
                                </div>

                            </div>
                        </div>
                    </div>
        </>
    )
}
