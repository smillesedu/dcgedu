import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalProfessor from './ModalProfessor'
import ModalFiltrosProfessores from './ModalFiltrosProfessores'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const GestaoProfessores = () => {
  const [professores, setProfessores] = useState([])
  const [professorEditando, setProfessorEditando] = useState(null)
  const [professorParaExcluir, setProfessorParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchProfessores()
  }, [])

  const fetchProfessores = async (filters = {}) => {
    let query = supabase.from('professores').select(`
      id,
      nome,
      email,
      telefone,
      especialidade,
      status,
      unidade:unidades(nome),
      enderecos:enderecos (
        rua,
        casa_numero,
        bairro,
        municipio,
        provincia
      )
    `)

    if (filters.keyFilter && filters.search) {
      query = query.ilike(filters.keyFilter, `%${filters.search}%`)
    }
    if (filters.orderBy) {
      query = query.order(filters.orderBy, { ascending: true })
    }

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar professores:', error)
    } else {
      setProfessores(data || [])
    }
  }

  const abrirModalNovo = () => {
    setProfessorEditando(null)
  }

  const abrirModalEditar = (prof) => {
    setProfessorEditando(prof)
  }

  const confirmarExclusao = (prof) => {
    setProfessorParaExcluir(prof)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (professorParaExcluir) {
      const { error } = await supabase
        .from('professores')
        .delete()
        .eq('id', professorParaExcluir.id)
      if (!error) {
        setProfessores((prev) => prev.filter((p) => p.id !== professorParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  const handleFiltrar = (filters) => {
    fetchProfessores(filters)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Professores</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosProfessores onFiltrar={handleFiltrar} />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalProfessor"
              onClick={abrirModalNovo}
            >
              Registrar Professor
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={professores} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Especialidade</th>
                      <th>Status</th>
                      <th>Unidade</th>
                      <th>Endereço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((prof) => (
                      <tr key={prof.id}>
                        <td>{prof.id}</td>
                        <td>{prof.nome}</td>
                        <td>{prof.email}</td>
                        <td>{prof.telefone}</td>
                        <td>{prof.especialidade}</td>
                        <td>{prof.status ?? '-'}</td>
                        <td>{prof.unidade?.nome ?? '-'}</td>
                        <td>
                          {prof.enderecos
                            ? `${prof.enderecos.rua ?? ''}, Nº ${prof.enderecos.casa_numero ?? ''}, ${prof.enderecos.bairro ?? ''}`
                            : '-'}
                        </td>
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
                                  data-bs-target="#modalProfessor"
                                  onClick={() => abrirModalEditar(prof)}
                                >
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm text-danger"
                                  onClick={() => confirmarExclusao(prof)}
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

            <ModalProfessor
              professorEditando={professorEditando}
              onSalvo={() => fetchProfessores()}
            />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Professor"
              message={`Tem certeza que deseja excluir o professor "${professorParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoProfessores
