import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const PagamentosFaturacao = () => {
  const [pagamentos, setPagamentos] = useState([])
  const [filtros, setFiltros] = useState({ aluno: '', dataInicio: '', dataFim: '', status: '' })
  const [showConfirm, setShowConfirm] = useState(false)
  const [pagamentoParaExcluir, setPagamentoParaExcluir] = useState(null)

  useEffect(() => {
    fetchPagamentos()
  }, [])

  const fetchPagamentos = async () => {
    let query = supabase
      .from('pagamentos')
      .select('id, aluno:alunos(nome), valor, data_pagamento, status')
      .order('data_pagamento', { ascending: false })

    if (filtros.aluno) query = query.ilike('aluno.nome', `%${filtros.aluno}%`)
    if (filtros.dataInicio) query = query.gte('data_pagamento', filtros.dataInicio)
    if (filtros.dataFim) query = query.lte('data_pagamento', filtros.dataFim)
    if (filtros.status) query = query.eq('status', filtros.status)

    const { data, error } = await query
    if (!error) setPagamentos(data || [])
  }

  const confirmarExclusao = (pagamento) => {
    setPagamentoParaExcluir(pagamento)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (pagamentoParaExcluir) {
      await supabase.from('pagamentos').delete().eq('id', pagamentoParaExcluir.id)
      fetchPagamentos()
    }
    setShowConfirm(false)
  }

  const totalFaturado = pagamentos.reduce((acc, p) => acc + parseFloat(p.valor || 0), 0)
  const totalPago = pagamentos
    .filter((p) => p.status === 'Pago')
    .reduce((acc, p) => acc + parseFloat(p.valor || 0), 0)
  const totalPendente = totalFaturado - totalPago

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pagamentos e Faturação</strong>
          </CCardHeader>
          <CCardBody>
            {/* Filtros */}
            <div className="card mb-3">
              <div className="card-header">
                <strong>Filtros</strong>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome do Aluno"
                      value={filtros.aluno}
                      onChange={(e) => setFiltros({ ...filtros, aluno: e.target.value })}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      value={filtros.dataInicio}
                      onChange={(e) => setFiltros({ ...filtros, dataInicio: e.target.value })}
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="date"
                      className="form-control"
                      value={filtros.dataFim}
                      onChange={(e) => setFiltros({ ...filtros, dataFim: e.target.value })}
                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={filtros.status}
                      onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
                    >
                      <option value="">Todos</option>
                      <option value="Pago">Pago</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Atrasado">Atrasado</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={fetchPagamentos}>
                      Filtrar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Totais */}
            <div className="mb-3">
              <span className="badge bg-primary me-2">
                Total Faturado: R$ {totalFaturado.toFixed(2)}
              </span>
              <span className="badge bg-success me-2">Total Pago: R$ {totalPago.toFixed(2)}</span>
              <span className="badge bg-danger">Total Pendente: R$ {totalPendente.toFixed(2)}</span>
            </div>

            {/* Tabela */}
            <div className="card">
              <div className="card-body">
                <PaginationWrapper data={pagamentos} itemsPerPage={10}>
                  {(paginaAtual) => (
                    <table className="table table-bordered table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Aluno</th>
                          <th>Data</th>
                          <th>Valor</th>
                          <th>Status</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginaAtual.map((p) => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.aluno?.nome}</td>
                            <td>{new Date(p.data_pagamento).toLocaleDateString()}</td>
                            <td>R$ {parseFloat(p.valor || 0).toFixed(2)}</td>
                            <td>
                              <span
                                className={`badge ${
                                  p.status === 'Pago'
                                    ? 'bg-success'
                                    : p.status === 'Pendente'
                                      ? 'bg-warning'
                                      : 'bg-danger'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-secondary btn-sm dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                >
                                  Ações
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={() => confirmarExclusao(p)}
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
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Pagamento"
        message={`Tem certeza que deseja excluir o pagamento #${pagamentoParaExcluir?.id}?`}
      />
    </CRow>
  )
}

export default PagamentosFaturacao
