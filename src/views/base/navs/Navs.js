import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltrosNotas from './ModalFiltrosNotas'
import ModalNota from './ModalNota'

const GestaoNotas = () => {
  const [notas, setNotas] = useState([])
  const [avaliacoes, setAvaliacoes] = useState([])
  const [notaEditando, setNotaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [notaParaExcluir, setNotaParaExcluir] = useState(null)

  useEffect(() => {
    fetchAvaliacoes()
    fetchNotas()
  }, [])

  const fetchAvaliacoes = async () => {
    const { data, error } = await supabase
      .from('avaliacoes')
      .select('id, tipo, data_avaliacao')
      .order('data_avaliacao', { ascending: true })
    if (error) console.error('Erro ao buscar avaliações:', error)
    else setAvaliacoes(data || [])
  }

  const fetchNotas = async (filters = {}) => {
    let query = supabase
      .from('notas')
      .select(`
        id,
        nota,
        observacao,
        avaliacao:avaliacoes (
          id,
          tipo,
          data_avaliacao,
          turma_disciplina:turmas_disciplinas (
            disciplina:disciplinas(nome)
          )
        ),
        aluno:alunos (
          id,
          nome
        )
      `)

    if (filters.turmaId) {
      query = query.eq('avaliacao.turma_disciplina.turma_id', filters.turmaId)
    }
    if (filters.disciplinaId) {
      query = query.eq('avaliacao.turma_disciplina.disciplina_id', filters.disciplinaId)
    }
    if (filters.alunoId) {
      query = query.eq('aluno.id', filters.alunoId)
    }

    const { data, error } = await query
    if (error) console.error('Erro ao buscar notas:', error)
    else setNotas(data || [])
  }

  const abrirModalNovaNota = () => setNotaEditando(null)
  const abrirModalEditarNota = (nota) => setNotaEditando(nota)

  const confirmarExclusao = (nota) => {
    setNotaParaExcluir(nota)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (notaParaExcluir) {
      const { error } = await supabase.from('notas').delete().eq('id', notaParaExcluir.id)
      if (error) console.error('Erro ao excluir nota:', error)
      else setNotas((prev) => prev.filter((n) => n.id !== notaParaExcluir.id))
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Notas</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosNotas onFiltrar={fetchNotas} />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalNota"
              onClick={abrirModalNovaNota}
            >
              Lançar Nota
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={notas} itemsPerPage={10}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Aluno</th>
                      <th>Disciplina</th>
                      <th>Avaliação</th>
                      <th>Data</th>
                      <th>Nota</th>
                      <th>Observação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((n) => (
                      <tr key={n.id}>
                        <td>{n.aluno?.nome}</td>
                        <td>{n.avaliacao?.turma_disciplina?.disciplina?.nome}</td>
                        <td>{n.avaliacao?.tipo}</td>
                        <td>{n.avaliacao?.data_avaliacao}</td>
                        <td>{n.nota}</td>
                        <td>{n.observacao || '-'}</td>
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
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalNota"
                                  onClick={() => abrirModalEditarNota(n)}
                                >
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => confirmarExclusao(n)}
                                >
                                  <i className="fa fa-trash"></i> Excluir
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

            <ModalNota notaEditando={notaEditando} onSalvo={() => fetchNotas()} />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Nota"
              message={`Tem certeza que deseja excluir esta nota?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoNotas
