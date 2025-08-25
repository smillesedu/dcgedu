import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const RelatorioProfessores = ({ dados }) => {
  const contagemPorDisciplina = dados.reduce((acc, prof) => {
    acc[prof.disciplina] = (acc[prof.disciplina] || 0) + 1
    return acc
  }, {})

  const chartData = Object.keys(contagemPorDisciplina).map((disc) => ({
    disciplina: disc,
    quantidade: contagemPorDisciplina[disc],
  }))

  return (
    <div className="p-3">
      <h5>Professores por Disciplina</h5>
      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="disciplina" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" fill="#007bff" />
      </BarChart>

      <CTable striped hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Nome</CTableHeaderCell>
            <CTableHeaderCell>Disciplina</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {dados.map((prof, idx) => (
            <CTableRow key={prof.id}>
              <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
              <CTableDataCell>{prof.nome}</CTableDataCell>
              <CTableDataCell>{prof.disciplina}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default RelatorioProfessores
