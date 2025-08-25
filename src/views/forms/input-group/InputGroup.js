import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalMatricula from './ModalMatricula'
import FiltroMatricula from './FiltroMatricula'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const MatriculaAluno = () => {
  const [matriculas, setMatriculas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [matriculaEditando, setMatriculaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [matriculaParaExcluir, setMatriculaParaExcluir] = useState(null)

  const fetchMatriculas = async (filters = {}) => {
    let query = supabase.from('matriculas').select(`
      id,
      aluno_id,
      curso:cursos(nome),
      disciplina:disciplinas(nome),
      data_matricula
    `)

    if (filters.search) query = query.ilike('aluno_id', `%${filters.search}%`)
    if (filters.curso) query = query.eq('curso_id', filters.curso)
    if (filters.disciplina) query = query.eq('disciplina_id', filters.disciplina)

    const { data, error } = await query
    if (!error) setMatriculas(data || [])
    else console.error(error)
  }

  useEffect(() => {
    fetchMatriculas()
  }, [])

  const abrirModalNovo = () => {
    setMatriculaEditando(null)
    setShowModal(true)
  }

  const abrirModalEditar = (matricula) => {
    setMatriculaEditando(matricula)
    setShowModal(true)
  }

  const confirmarExclusao = (matricula) => {
    setMatriculaParaExcluir(matricula)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (matriculaParaExcluir) {
      await supabase.from('matriculas').delete().eq('id', matriculaParaExcluir.id)
      setMatriculas((prev) => prev.filter((m) => m.id !== matriculaParaExcluir.id))
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Matrícula e Rematrícula</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <FiltroMatricula onFiltrar={fetchMatriculas} />
        </CContainer>

        <div className="my-3 d-flex justify-content-end">
          <CButton color="success" onClick={abrirModalNovo}>
            Nova Matrícula
          </CButton>
        </div>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={matriculas} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Aluno</th>
                      <th>Curso</th>
                      <th>Disciplina</th>
                      <th>Data Matrícula</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.aluno_id}</td>
                        <td>{m.curso?.nome || '-'}</td>
                        <td>{m.disciplina?.nome || '-'}</td>
                        <td>{m.data_matricula}</td>
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
                                  className="dropdown-item"
                                  onClick={() => abrirModalEditar(m)}
                                >
                                  Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => confirmarExclusao(m)}
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

            {showModal && (
              <ModalMatricula
                alunoEditando={matriculaEditando}
                onClose={() => setShowModal(false)}
                onSalvo={() => fetchMatriculas()}
              />
            )}

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Matrícula"
              message={`Deseja realmente excluir esta matrícula?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatriculaAluno
