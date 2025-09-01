import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltrosTransferencia from './ModalFiltrosTransferencia'
import ModalTransferencia from './ModalTransferencia'

const Transferencias = () => {
  const [pessoas, setPessoas] = useState([])
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [historico, setHistorico] = useState([])
  const [showModalFiltro, setShowModalFiltro] = useState(false)
  const [filters, setFilters] = useState({})

  // Buscar histórico
  const buscarHistorico = async (filtros = {}) => {
    let query = supabase.from('transferencias').select(`
      id,
      tipo,
      nome_pessoa,
      de_turma, para_turma,
      de_curso, para_curso,
      de_unidade, para_unidade,
      data_transferencia
    `)

    if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
    if (filtros.search) query = query.ilike('nome_pessoa', `%${filtros.search}%`)
    if (filtros.startDate) query = query.gte('data_transferencia', filtros.startDate)
    if (filtros.endDate) query = query.lte('data_transferencia', filtros.endDate)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar histórico:', error)
    } else {
      setHistorico(data || [])
    }
  }

  // Buscar pessoas
  const fetchPessoas = async (filtros = {}) => {
    let query = supabase.from('pessoas').select(`
      id, nome, tipo,
      turma_atual:turmas(nome),
      curso_atual:cursos(nome),
      unidade_atual:unidades(nome)
    `)

    if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
    if (filtros.search) query = query.ilike('nome', `%${filtros.search}%`)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar pessoas:', error)
    } else {
      setPessoas(data || [])
    }
  }

  useEffect(() => {
    fetchPessoas()
  }, [])

  const handleFiltrar = (filtros) => {
    setFilters(filtros)
    fetchPessoas(filtros)
    buscarHistorico(filtros)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Transferências</strong>
        </CCardHeader>

        <CContainer className="px-4 mb-3">
          <CButton color="info" onClick={() => setShowModalFiltro(true)}>
            <i className="fa fa-filter"></i> Filtros e Histórico
          </CButton>
        </CContainer>

        {/* Histórico */}
        {historico.length > 0 && (
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Histórico de Transferências</strong>
            </CCardHeader>
            <CCardBody>
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Nome</th>
                    <th>De Turma</th>
                    <th>Para Turma</th>
                    <th>De Curso</th>
                    <th>Para Curso</th>
                    <th>De Unidade</th>
                    <th>Para Unidade</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map((h) => (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.tipo}</td>
                      <td>{h.nome_pessoa}</td>
                      <td>{h.de_turma || '-'}</td>
                      <td>{h.para_turma || '-'}</td>
                      <td>{h.de_curso || '-'}</td>
                      <td>{h.para_curso || '-'}</td>
                      <td>{h.de_unidade || '-'}</td>
                      <td>{h.para_unidade || '-'}</td>
                      <td>{new Date(h.data_transferencia).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        )}

        {/* Pessoas */}
        <CCard>
          <CCardBody>
            <PaginationWrapper data={pessoas} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Turma Atual</th>
                      <th>Curso Atual</th>
                      <th>Unidade Atual</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.nome}</td>
                        <td>{p.tipo}</td>
                        <td>{p.turma_atual?.nome || '-'}</td>
                        <td>{p.curso_atual?.nome || '-'}</td>
                        <td>{p.unidade_atual?.nome || '-'}</td>
                        <td>
                          <CButton
                            size="sm"
                            color="primary"
                            onClick={() => setPessoaSelecionada(p)}
                          >
                            <i className="fa fa-exchange"></i> Transferir
                          </CButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>
          </CCardBody>
        </CCard>

        {/* Modais */}
        <ModalTransferencia
          pessoa={pessoaSelecionada}
          onClose={() => setPessoaSelecionada(null)}
          onSalvo={() => fetchPessoas(filters)}
        />

        <ModalFiltrosTransferencia
          visible={showModalFiltro}
          onClose={() => setShowModalFiltro(false)}
          onFiltrar={handleFiltrar}
        />

        <ModalConfirmacao
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => { }}
          title="Excluir Registro"
          message="Tem certeza que deseja excluir este registro?"
        />
      </CCol>
    </CRow>
  )
}

export default Transferencias
