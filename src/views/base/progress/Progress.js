import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb, ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltrosTransferencia from './ModalFiltrosTransferencia'
import ModalTransferencia from './ModalTransferencia'

const Transferencias = () => {
  const [pessoas, setPessoas] = useState([])
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [historico, setHistorico] = useState([])
  const [filters, setFilters] = useState({})

  // Busca histórico com filtros
  const buscarHistorico = async (filtros = {}) => {
    let query = supabase.from('transferencias').select(`
      id,
      tipo,
      nome_pessoa,
      de_turma,
      para_turma,
      de_curso,
      para_curso,
      de_unidade,
      para_unidade,
      data_transferencia
    `)

    if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
    if (filtros.search) query = query.ilike('nome_pessoa', `%${filtros.search}%`)
    if (filtros.startDate) query = query.gte('data_transferencia', filtros.startDate)
    if (filtros.endDate) query = query.lte('data_transferencia', filtros.endDate)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar histórico:', error)
      return
    }
    setHistorico(data)
  }

  // Abre modal de filtros do histórico
  const abrirModalHistorico = () => {
    const modal = new bootstrap.Modal(document.getElementById('modalFiltroTransferencias'))
    modal.show()
  }

  // Aplica filtros
  const handleFiltrar = (filtros) => {
    setFilters(filtros)
    fetchPessoas(filtros)
    buscarHistorico(filtros)
  }

  // Busca pessoas (alunos e professores)
  const fetchPessoas = async (filtros = {}) => {
    let query = supabase.from('pessoas') // tabela unificada ou VIEW
      .select(`
        id,
        nome,
        tipo,
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

  const abrirModalTransferencia = (pessoa) => {
    setPessoaSelecionada(pessoa)
    const modal = new bootstrap.Modal(document.getElementById('modalTransferencia'))
    modal.show()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Transferências Internas e Externas</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <button className="btn btn-outline-info mb-3" onClick={abrirModalHistorico}>
            <i className="fa fa-history"></i> Ver Histórico
          </button>
        </CContainer>

        {/* Histórico */}
        {historico.length > 0 && (
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Histórico de Transferências</strong>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-bordered">
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

        {/* Lista principal */}
        <CCard className="my-4">
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
                    {paginaAtual.map((pessoa) => (
                      <tr key={pessoa.id}>
                        <td>{pessoa.id}</td>
                        <td>{pessoa.nome}</td>
                        <td>{pessoa.tipo}</td>
                        <td>{pessoa.turma_atual?.nome || '-'}</td>
                        <td>{pessoa.curso_atual?.nome || '-'}</td>
                        <td>{pessoa.unidade_atual?.nome || '-'}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              id={`dropdownMenu-${pessoa.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Ações
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenu-${pessoa.id}`}
                            >
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => abrirModalTransferencia(pessoa)}
                                >
                                  <i className="fa fa-exchange"></i> Fazer Transferência
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => abrirModalHistorico()}
                                >
                                  <i className="fa fa-history"></i> Ver Histórico
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

            {/* Modal de Transferência */}
            <ModalTransferencia
              id="modalTransferencia"
              pessoa={pessoaSelecionada}
              onSalvo={() => fetchPessoas()}
            />

            {/* Modal de Filtros para Histórico */}
            <ModalFiltrosTransferencia id="modalFiltroTransferencias" onFiltrar={handleFiltrar} />

            {/* Modal de Confirmação */}
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={() => {}}
              title="Excluir Registro"
              message={`Tem certeza que deseja excluir este registro?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Transferencias
