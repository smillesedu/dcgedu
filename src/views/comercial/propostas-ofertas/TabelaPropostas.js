import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
} from '@coreui/react'

const statusBadge = {
  Enviada: 'info',
  Aceita: 'success',
  Recusada: 'danger',
  Expirada: 'secondary',
}

const TabelaPropostas = ({ propostas }) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Lead</CTableHeaderCell>
          <CTableHeaderCell>Valor</CTableHeaderCell>
          <CTableHeaderCell>Desconto (%)</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Validade</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {propostas.map((p) => (
          <CTableRow key={p.id}>
            <CTableDataCell>{p.id}</CTableDataCell>
            <CTableDataCell>{p.lead?.nome}</CTableDataCell>
            <CTableDataCell>R$ {p.valor?.toFixed(2)}</CTableDataCell>
            <CTableDataCell>{p.desconto}%</CTableDataCell>
            <CTableDataCell>
              <CBadge color={statusBadge[p.status] || 'light'}>{p.status}</CBadge>
            </CTableDataCell>
            <CTableDataCell>
              {p.validade ? new Date(p.validade).toLocaleDateString() : '-'}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default TabelaPropostas
