import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltrosFrequencia from './ModalFiltrosFrequencia'
import ModalFrequencia from './ModalFrequencia'

const GestaoFrequencia = () => {
  const [frequencias, setFrequencias] = useState([])
  const [frequenciaEditando, setFrequenciaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [frequenciaParaExcluir, setFrequenciaParaExcluir] = useState(null)
  const [turmas, setTurmas] = useState([])
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    fetchFrequencias()
    fetchTurmas()
    fetchAlunos()
  }, [])

  const fetchTurmas = async () => {
    const { data } = await supabase.from('turmas').select('id, nome')
    setTurmas(data || [])
  }

  const fetchAlunos = async () => {
    const { data } = await supabase.from('alunos').select('id, nome')
    setAlunos(data || [])
  }

  const fetchFrequencias = async (filters = {}) => {
    let query = supabase
      .from('frequencias')
      .select(`
        id,
        data_aula,
        status,
        observacao,
        aluno:alunos(id, nome),
        turma:turmas(id, nome)
      `)
      .order('data_aula', { ascending: false })

    if (filters.turmaId) query = query.eq('turma_id', filters.turmaId)
    if (filters.alunoId) query = query.eq('aluno_id', filters.alunoId)
    if (filters.status) query = query.eq('status', filters.status)
    if (filters.startDate) query = query.gte('data_aula', filters.startDate)
    if (filters.endDate) query = query.lte('data_aula', filters.endDate)

    const { data, error } = await query
    if (error) console.error(error)
    else setFrequencias(data || [])
  }

  const deletarFrequencia = async (id) => {
    const { error } = await supabase.from('frequencias').delete().eq('id', id)
    if (error) console.error(error)
    else setFrequencias((prev) => prev.filter((f) => f.id !== id))
  }

  const confirmarExclusao = (freq) => {
    setFrequenciaParaExcluir(freq)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (frequenciaParaExcluir) deletarFrequencia(frequenciaParaExcluir.id)
    setShowConfirm(false)
  }

  const abrirModalNovo = () => setFrequenciaEditando(null)
  const abrirModalEditar = (freq) => setFrequenciaEditando(freq)

  const handleFiltrar = (filters) => fetchFrequencias(filters)

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Frequência</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosFrequencia onFiltrar={handleFiltrar} turmas={turmas} alunos={alunos} />
        </CContainer>

        <CRow className="my-4">
          <CCol xs={6} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalFrequencia"
              onClick={abrirModalNovo}
            >
              Registrar Frequência
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={frequencias} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Aluno</th>
                      <th>Turma</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th>Observação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((freq) => (
                      <tr key={freq.id}>
                        <td>{freq.aluno?.nome || '-'}</td>
                        <td>{freq.turma?.nome || '-'}</td>
                        <td>{freq.data_aula}</td>
                        <td>
                          {freq.status === 'Presente' && <span className="badge bg-success">Presente</span>}
                          {freq.status === 'Falta' && <span className="badge bg-danger">Falta</span>}
                          {freq.status === 'Justificada' && <span className="badge bg-warning">Justificada</span>}
                        </td>
                        <td>{freq.observacao || '-'}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#modalFrequencia"
                              onClick={() => abrirModalEditar(freq)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => confirmarExclusao(freq)}
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            <ModalFrequencia
              frequenciaEditando={frequenciaEditando}
              turmas={turmas}
              alunos={alunos}
              onSalvo={() => fetchFrequencias()}
            />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Frequência"
              message={`Tem certeza que deseja excluir o registro de frequência de "${frequenciaParaExcluir?.aluno?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoFrequencia
