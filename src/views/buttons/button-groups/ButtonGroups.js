import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalEquipeAdm from './ModalEquipeAdm'
import ModalFiltrosEquipeAdm from './ModalFiltrosEquipeAdm'

const GestaoEquipeAdministrativa = () => {
  const [membros, setMembros] = useState([])
  const [membroEditando, setMembroEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [membroParaExcluir, setMembroParaExcluir] = useState(null)

  useEffect(() => {
    fetchMembros()
  }, [])

  const fetchMembros = async (filters = {}) => {
    let query = supabase.from('equipe_administrativa').select(`
        id,
        nome,
        cargo,
        email,
        telefone,
        status,
        unidade:unidades ( id, nome ),
        enderecos:enderecos (
          rua,
          casa_numero,
          bairro,
          municipio,
          provincia
        )
      `)

    if (filters.startDate) query = query.gte('created_at', filters.startDate)
    if (filters.endDate) query = query.lte('created_at', filters.endDate)

    if (filters.keyFilter && filters.keyFilter !== 'null' && filters.search) {
      query = query.ilike(filters.keyFilter, `%${filters.search}%`)
    }

    if (filters.unidade_id && filters.unidade_id !== 'T') {
      query = query.eq('unidade_id', filters.unidade_id)
    }

    if (typeof filters.status === 'string' && filters.status !== '') {
      query = query.eq('status', filters.status)
    }

    if (filters.orderBy) query = query.order(filters.orderBy, { ascending: true })
    if (filters.perPage) {
      const end = Number(filters.perPage) - 1
      query = query.range(0, end)
    }

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar equipe:', error)
    } else {
      setMembros(data || [])
    }
  }

  const handleFiltrar = (filters) => {
    fetchMembros(filters)
  }

  const abrirModalNovo = () => {
    setMembroEditando(null)
  }

  const abrirModalEditar = (m) => {
    setMembroEditando(m)
  }

  const confirmarExclusao = (m) => {
    setMembroParaExcluir(m)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!membroParaExcluir) return
    const { error } = await supabase
      .from('equipe_administrativa')
      .delete()
      .eq('id', membroParaExcluir.id)

    if (error) {
      console.error('Erro ao excluir membro:', error)
    } else {
      setMembros((prev) => prev.filter((p) => p.id !== membroParaExcluir.id))
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Equipe Administrativa</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosEquipeAdm onFiltrar={handleFiltrar} />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalEquipeAdm"
              onClick={abrirModalNovo}
            >
              Novo Membro
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={membros} itemsPerPage={10}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Unidade</th>
                      <th>Status</th>
                      <th>Endereço</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.nome}</td>
                        <td>{m.cargo}</td>
                        <td>{m.email || '-'}</td>
                        <td>{m.telefone || '-'}</td>
                        <td>{m.unidade?.nome || '-'}</td>
                        <td>{m.status === '1' || m.status === 1 ? 'Ativo' : 'Inativo'}</td>
                        <td>
                          {m.enderecos
                            ? `${m.enderecos.rua ?? ''}, Nº ${m.enderecos.casa_numero ?? ''}, ${m.enderecos.bairro ?? ''} - ${m.enderecos.municipio ?? ''}/${m.enderecos.provincia ?? ''}`
                            : '-'}
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              id={`dropdownMenu-${m.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Ações
                            </button>
                            <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${m.id}`}>
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalEquipeAdm"
                                  onClick={() => abrirModalEditar(m)}
                                >
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm text-danger"
                                  onClick={() => confirmarExclusao(m)}
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

            <ModalEquipeAdm membroEditando={membroEditando} onSalvo={() => fetchMembros()} />

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Membro"
              message={`Tem certeza que deseja excluir "${membroParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoEquipeAdministrativa
