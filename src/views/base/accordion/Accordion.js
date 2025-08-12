import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import supabase from '../../../supaBaseClient'
import ModalAluno from './ModalAluno'


const Accordion = () => {

  const [alunos, setAlunos] = useState([]);
  const [alunoEditando, setAlunoEditando] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  // const fetchAlunos = async () => {
  //   const { data, error } = await supabase.from("alunos").select("*");
  //   if (error) {
  //     console.error("Erro ao buscar alunos:", error);
  //   } else {
  //     setAlunos(data);
  //   }
  // };

  const fetchAlunos = async () => {
  const { data, error } = await supabase
    .from("alunos")
    .select(`
      id,
      nome,
      data_nascimento,
      email,
      telefone,
      responsavel:responsaveis (
        id,
        nome,
        telefone
      )
    `);

  if (error) {
    console.error("Erro ao buscar alunos:", error);
  } else {
    setAlunos(data);
  }
};


  const deletarAluno = async (id) => {
    const { error } = await supabase.from("alunos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao deletar aluno:", error);
    } else {
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
    }
  };

  const abrirModalNovo = () => {
    setAlunoEditando(null);
    new bootstrap.Modal(document.getElementById("modalAluno")).show();
  };

  const abrirModalEditar = (aluno) => {
    setAlunoEditando(aluno);
    new bootstrap.Modal(document.getElementById("modalAluno")).show();
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Alunos </strong>
        </CCardHeader>
        <CRow className="my-4">
          <CCol md={6} className="md-6">
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Tipo de Filtro</label>
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
              <input type="text" class="form-control" aria-label="Text input with dropdown button" />
            </div>
          </CCol>
          <CCol>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Data de Inicio</label>
              <input type="date" class="form-control" placeholder="Data" aria-label="data" />
            </div>
          </CCol>
          <CCol>
            <div class="input-group mb-3">
              <label class="input-group-text" for="inputGroupSelect01">Data de Fim</label>
              <input type="date" class="form-control" placeholder="Data" aria-label="data" />
            </div>
          </CCol>
          <CCol>
            <button type="button" class="btn btn-primary">Filtrar</button>
          </CCol>
        </CRow>
        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4}>
            {/* <button  type="button" class="btn btn-primary" onClick={() => setShowModal(true)}>Registar</button> */}
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalAluno"
              onClick={abrirModalNovo}
            >
              Registrar Aluno
            </button>
          </CCol>
        </CRow>
        <CCard className="my-4">
          <CCardBody>
            <table class="table table-bordered table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome Completo</th>
                  <th scope="col">Data de Nascimento</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Status Acadêmico</th>
                  <th scope="col">Endereço</th>
                  <th scope="col">Responsáveis</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.data_nascimento}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.telefone}</td>
                    <td>{aluno.status}</td>
                    <td>{aluno.endereco}</td>
                    <td>{aluno.responsavel.nome}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => abrirModalEditar(aluno)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deletarAluno(aluno.id)}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Modal */}
            <ModalAluno alunoEditando={alunoEditando} onSalvo={fetchAlunos} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
