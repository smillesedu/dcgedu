import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import FiltroMatricula from './FiltroMatricula'
import ModalMatricula from './ModalMatricula'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const MatriculaAluno = () => {
  const [alunos, setAlunos] = useState([])
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [alunoSelecionado, setAlunoSelecionado] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [alunoParaExcluir, setAlunoParaExcluir] = useState(null)

  useEffect(() => {
    fetchAlunos()
    fetchDadosAuxiliares()
  }, [])

  const fetchAlunos = async (filters = {}) => {
    let query = supabase.from('alunos').select(`
      id,
      nome,
      data_nascimento,
      email,
      telefone,
      status,
      turma:turmas(nome),
      curso:cursos(nome)
    `)

    if (filters.turma) query = query.eq('turma', filters.turma)
    if (filters.curso) query = query.eq('curso', filters.curso)
    if (filters.search) query = query.ilike('nome', `%${filters.search}%`)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar alunos:', error)
    } else {
      setAlunos(data || [])
    }
  }

  const fetchDadosAuxiliares = async () => {
    const { data: turmasData } = await supabase.from('turmas').select('*')
    setTurmas(turmasData || [])

    const { data: cursosData } = await supabase.from('cursos').select('*')
    setCursos(cursosData || [])
  }

  const handleFiltrar = (filters) => {
    fetchAlunos(filters)
  }

  const abrirModalMatricula = (aluno = null) => {
    setAlunoSelecionado(aluno)
  }

  const confirmarExclusao = (aluno) => {
    setAlunoParaExcluir(aluno)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (alunoParaExcluir) {
      const { error } = await supabase.from('alunos').delete().eq('id', alunoParaExcluir.id)
      if (!error) {
        setAlunos((prev) => prev.filter((a) => a.id !== alunoParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Matrícula e Rematrícula de Alunos</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <FiltroMatricula turmas={turmas} cursos={cursos} onFiltrar={handleFiltrar} />
        </CContainer>

        <CRow className="my-4">
          <CCol xs={12} className="d-flex justify-content-end">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalMatricula"
              onClick={() => abrirModalMatricula(null)}
            >
              Nova Matrícula / Rematrícula
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={alunos} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Data de Nascimento</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Curso</th>
                      <th>Turma</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((aluno) => (
                      <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.data_nascimento}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.telefone}</td>
                        <td>{aluno.curso?.nome || '-'}</td>
                        <td>{aluno.turma?.nome || '-'}</td>
                        <td>{aluno.status ?? '-'}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              Ações
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalMatricula"
                                  onClick={() => abrirModalMatricula(aluno)}
                                >
                                  Editar Matrícula
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm text-danger"
                                  onClick={() => confirmarExclusao(aluno)}
                                >
                                  Excluir
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            <ModalMatricula
              alunoEditando={alunoSelecionado}
              turmas={turmas}
              cursos={cursos}
              onSalvo={() => fetchAlunos()}
            />

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Matrícula"
              message={`Tem certeza que deseja excluir o registro do aluno "${alunoParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatriculaAluno
