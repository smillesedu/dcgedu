import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'

const RecibosPagamento = () => {
  const [rows, setRows] = useState([])

  const load = async () => {
    const { data } = await supabase
      .from('folhas_pagamento')
      .select(
        'id, mes, ano, salario_base, adicionais, descontos, salario_liquido, status, funcionario:funcionarios(nome)',
      )
      .order('ano', { ascending: false })
      .order('mes', { ascending: false })
    setRows(data || [])
  }
  useEffect(() => {
    load()
  }, [])

  const marcarPago = async (id) => {
    await supabase.from('folhas_pagamento').update({ status: 'pago' }).eq('id', id)
    load()
  }

  return (
    <CCard className="my-4">
      <CCardHeader>
        <strong>Folhas & Recibos</strong>
      </CCardHeader>
      <CCardBody>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Funcionário</th>
                <th>Mês/Ano</th>
                <th>Bruto</th>
                <th>Adic.</th>
                <th>Desc.</th>
                <th>Líquido</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.funcionario?.nome}</td>
                  <td>
                    {String(r.mes).padStart(2, '0')}/{r.ano}
                  </td>
                  <td>{Number(r.salario_base).toLocaleString()} Kz</td>
                  <td>{Number(r.adicionais).toLocaleString()} Kz</td>
                  <td>{Number(r.descontos).toLocaleString()} Kz</td>
                  <td>
                    <strong>{Number(r.salario_liquido).toLocaleString()} Kz</strong>
                  </td>
                  <td>
                    <span
                      className={`badge bg-${r.status === 'pago' ? 'success' : r.status === 'cancelado' ? 'secondary' : 'warning'}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="d-flex gap-2">
                    {r.status !== 'pago' && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => marcarPago(r.id)}
                      >
                        Marcar Pago
                      </button>
                    )}
                    {/* aqui poderia gerar PDF do recibo */}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    Sem folhas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  )
}
export default RecibosPagamento
