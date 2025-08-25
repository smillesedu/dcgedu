import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CProgress,
} from '@coreui/react'

const TabelaEquipe = ({ equipe }) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Nome</CTableHeaderCell>
          <CTableHeaderCell>Meta Mensal (R$)</CTableHeaderCell>
          <CTableHeaderCell>Vendas Realizadas (R$)</CTableHeaderCell>
          <CTableHeaderCell>Progresso</CTableHeaderCell>
          <CTableHeaderCell>Comissão (%)</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {equipe.map((m) => {
          const progresso = m.meta_mensal > 0 ? (m.vendas_realizadas / m.meta_mensal) * 100 : 0
          return (
            <CTableRow key={m.id}>
              <CTableDataCell>{m.nome}</CTableDataCell>
              <CTableDataCell>R$ {m.meta_mensal?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>R$ {m.vendas_realizadas?.toFixed(2)}</CTableDataCell>
              <CTableDataCell>
                <CProgress thin value={progresso} color={progresso >= 100 ? 'success' : 'info'} />
                {progresso.toFixed(1)}%
              </CTableDataCell>
              <CTableDataCell>{m.comissao}%</CTableDataCell>
            </CTableRow>
          )
        })}
      </CTableBody>
    </CTable>
  )
}

export default TabelaEquipe
