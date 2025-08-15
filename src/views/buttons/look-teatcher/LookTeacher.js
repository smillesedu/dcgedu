import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalDesempenhoDocente from './ModalDesempenhoDocente'
import ModalFiltrosDesempenhoDocente from './ModalFiltrosDesempenhoDocente'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'

const DesempenhoDocente = () => {
  const [registros, setRegistros] = useState([])
  const [registroEditando, setRegistroEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [registroParaExcluir, setRegistroParaExcluir] = useState(null)

  useEffect(() => {
    fetchDesempenho()
  }, [])

  const fetchDesempenho = async (filters = {}) => {
    let query = supabase.from('desempenho_docente').select(`
      id,
      periodo_inicio,
      periodo_fim,
      presenca_percentual,
      pontualidade_percentual,
      nota_media,
      feedback,
      professor:professor_id(nome),
      disciplina:disciplina_id(nome),
      turma:turma_id(nome)
    `)

    if (filters.professor_id) query = query.eq('professor_id', filters.professor_id)
    if (filters.turma_id) query = query.eq('turma_id', filters.turma_id)
    if (filters.periodo_inicio && filters.periodo_fim) {
      query = query
        .gte('periodo_inicio', filters.periodo_inicio)
        .lte('periodo_fim', filters.periodo_fim)
    }

    const { data, error } = await query
    if (!error) setRegistros(data || [])
    else console.error(error)
  }

  const abrirModalNovo = () => setRegistroEditando(null)
  const abrirModalEditar = (registro) => setRegistroEditando(registro)

  const confirmarExclusao = (registro) => {
    setRegistroParaExcluir(registro)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (registroParaExcluir) {
      await supabase.from('desempenho_docente').delete().eq('id', registroParaExcluir.id)
      fetchDesempenho()
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Desempenho do Docente</strong>
        </CCardHeader>

        <CContainer>
          <ModalFiltrosDesempenhoDocente onFiltrar={fetchDesempenho} />
        </CContainer>

        <CRow className="my-4">
          <CCol className="d-flex justify-content-end">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalDesempenhoDocente"
              onClick={abrirModalNovo}
            >
              Novo Registro
            </button>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={registros} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Professor</th>
                      <th>Disciplina</th>
                      <th>Turma</th>
                      <th>Período</th>
                      <th>Presença (%)</th>
                      <th>Pontualidade (%)</th>
                      <th>Nota Média</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((r) => (
                      <tr key={r.id}>
                        <td>{r.professor?.nome}</td>
                        <td>{r.disciplina?.nome}</td>
                        <td>{r.turma?.nome}</td>
                        <td>{`${r.periodo_inicio} a ${r.periodo_fim}`}</td>
                        <td>{r.presenca_percentual}</td>
                        <td>{r.pontualidade_percentual}</td>
                        <td>{r.nota_media}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDesempenhoDocente"
                            onClick={() => abrirModalEditar(r)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => confirmarExclusao(r)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>
          </CCardBody>
        </CCard>

        <ModalDesempenhoDocente
          registroEditando={registroEditando}
          onSalvo={() => fetchDesempenho()}
        />
        <ModalConfirmacao
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
          title="Excluir Registro"
          message={`Tem certeza que deseja excluir este registro?`}
        />
      </CCol>
    </CRow>
  )
}

export default DesempenhoDocente
