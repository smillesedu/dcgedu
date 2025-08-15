import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalCargaHoraria from './ModalCargaHoraria'
import ModalFiltrosCargaHoraria from './ModalFiltrosCargaHoraria'

const GestaoCargaHoraria = () => {
  const [cargas, setCargas] = useState([])
  const [cargaEditando, setCargaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [cargaParaExcluir, setCargaParaExcluir] = useState(null)

  useEffect(() => {
    fetchCargas()
  }, [])

  const fetchCargas = async (filters = {}) => {
    let query = supabase.from('carga_horaria').select(`
      id,
      professor:professor_id (id, nome),
      disciplina:disciplina_id (id, nome),
      turma:turma_id (id, nome),
      data_inicio,
      data_fim,
      carga_semanal,
      total_horas
    `)

    if (filters.keyFilter && filters.search) {
      query = query.ilike(filters.keyFilter, `%${filters.search}%`)
    }
    if (filters.orderBy) {
      query = query.order(filters.orderBy, { ascending: true })
    }

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar carga horária:', error)
    } else {
      setCargas(data || [])
    }
  }

  const abrirModalNovo = () => {
    setCargaEditando(null)
  }

  const abrirModalEditar = (carga) => {
    setCargaEditando(carga)
  }

  const confirmarExclusao = (carga) => {
    setCargaParaExcluir(carga)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (cargaParaExcluir) {
      const { error } = await supabase.from('carga_horaria').delete().eq('id', cargaParaExcluir.id)
      if (!error) {
        setCargas((prev) => prev.filter((c) => c.id !== cargaParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Carga Horária</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosCargaHoraria onFiltrar={fetchCargas} />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalCargaHoraria"
              onClick={abrirModalNovo}
            >
              Nova Carga Horária
            </button>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={cargas} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Professor</th>
                      <th>Disciplina</th>
                      <th>Turma</th>
                      <th>Início</th>
                      <th>Fim</th>
                      <th>Carga Semanal</th>
                      <th>Total Horas</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.professor?.nome}</td>
                        <td>{c.disciplina?.nome}</td>
                        <td>{c.turma?.nome}</td>
                        <td>{new Date(c.data_inicio).toLocaleDateString()}</td>
                        <td>{new Date(c.data_fim).toLocaleDateString()}</td>
                        <td>{c.carga_semanal}h</td>
                        <td>{c.total_horas}h</td>
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
                                  data-bs-target="#modalCargaHoraria"
                                  onClick={() => abrirModalEditar(c)}
                                >
                                  Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => confirmarExclusao(c)}
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

            <ModalCargaHoraria cargaEditando={cargaEditando} onSalvo={() => fetchCargas()} />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Carga Horária"
              message={`Deseja excluir esta carga horária?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoCargaHoraria
