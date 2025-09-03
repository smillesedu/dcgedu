import React from "react"
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CBadge } from "@coreui/react"

const TabelaRegistros = ({ registros }) => {
  return (
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Aluno</CTableHeaderCell>
          <CTableHeaderCell>Item</CTableHeaderCell>
          <CTableHeaderCell>Valor</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Método</CTableHeaderCell>
          <CTableHeaderCell>Data</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {registros.map((r, idx) => (
          <CTableRow key={idx}>
            <CTableDataCell>{r.aluno_nome}</CTableDataCell>
            <CTableDataCell>{r.tipo}</CTableDataCell>
            <CTableDataCell>{r.total} Kz</CTableDataCell>
            <CTableDataCell>
              {r.pago ? <CBadge color="success">Pago</CBadge> : <CBadge color="danger">Pendente</CBadge>}
            </CTableDataCell>
            <CTableDataCell>{r.metodo_pagamento}</CTableDataCell>
            <CTableDataCell>{r.data_pagamento}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default TabelaRegistros
