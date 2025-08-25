import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const LeadsTable = ({ leads, onEdit, onView, onDelete }) => {
  return (
    <CTable hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>Nome</CTableHeaderCell>
          <CTableHeaderCell>Contato</CTableHeaderCell>
          <CTableHeaderCell>Origem</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Data Criação</CTableHeaderCell>
          <CTableHeaderCell className="text-end">Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {leads.length > 0 ? (
          leads.map((lead) => (
            <CTableRow key={lead.id}>
              <CTableDataCell>{lead.nome}</CTableDataCell>
              <CTableDataCell>{lead.contato}</CTableDataCell>
              <CTableDataCell>{lead.origem}</CTableDataCell>
              <CTableDataCell>{lead.status}</CTableDataCell>
              <CTableDataCell>{new Date(lead.created_at).toLocaleDateString()}</CTableDataCell>
              <CTableDataCell className="text-end">
                <button className="btn btn-sm btn-info me-2" onClick={() => onView(lead)}>
                  Ver
                </button>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(lead)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(lead)}>
                  Excluir
                </button>
              </CTableDataCell>
            </CTableRow>
          ))
        ) : (
          <CTableRow>
            <CTableDataCell colSpan="6" className="text-center">
              Nenhum lead encontrado
            </CTableDataCell>
          </CTableRow>
        )}
      </CTableBody>
    </CTable>
  )
}

export default LeadsTable
