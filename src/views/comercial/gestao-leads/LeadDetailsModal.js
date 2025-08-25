import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const LeadDetailsModal = ({ lead, onClose }) => {
  return (
    <CModal visible onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Detalhes do Lead</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          <strong>Nome:</strong> {lead.nome}
        </p>
        <p>
          <strong>Contato:</strong> {lead.contato}
        </p>
        <p>
          <strong>Origem:</strong> {lead.origem}
        </p>
        <p>
          <strong>Status:</strong> {lead.status}
        </p>
        <p>
          <strong>Data de Criação:</strong> {new Date(lead.created_at).toLocaleDateString()}
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default LeadDetailsModal
