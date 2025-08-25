import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const RelatorioAlunos = ({ dados }) => {
  const ativos = dados.filter((a) => a.status === 'ativo').length
  const inativos = dados.filter((a) => a.status === 'inativo').length

  const chartData = [
    { name: 'Ativos', value: ativos },
    { name: 'Inativos', value: inativos },
  ]
  const colors = ['#28a745', '#dc3545']

  return (
    <div className="p-3">
      <h5>Distribuição de Alunos</h5>
      <PieChart width={400} height={300}>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Nome</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Curso</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {dados.map((aluno, idx) => (
            <CTableRow key={aluno.id}>
              <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{aluno.nome}</CTableDataCell>
              <CTableDataCell>{aluno.status}</CTableDataCell>
              <CTableDataCell>{aluno.curso_id}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default RelatorioAlunos
