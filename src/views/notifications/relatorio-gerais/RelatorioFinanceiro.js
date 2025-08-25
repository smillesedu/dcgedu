import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const RelatorioFinanceiro = ({ dados }) => {
  const totalReceita = dados.reduce((sum, item) => sum + item.valor, 0)
  const pagos = dados.filter((d) => d.pago).reduce((sum, item) => sum + item.valor, 0)
  const pendentes = totalReceita - pagos

  const chartData = [
    { name: 'Receita Total', valor: totalReceita },
    { name: 'Pago', valor: pagos },
    { name: 'Pendente', valor: pendentes },
  ]

  return (
    <CCard>
      <CCardHeader>
        <strong>Resumo Financeiro</strong>
      </CCardHeader>
      <CCardBody>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#17a2b8" />
          </BarChart>
        </ResponsiveContainer>
      </CCardBody>
    </CCard>
  )
}

export default RelatorioFinanceiro
