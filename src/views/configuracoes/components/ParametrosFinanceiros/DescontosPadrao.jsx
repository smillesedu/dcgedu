import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const DescontosPadrao = ({ valor }) => {
  return (
    <CCard className="shadow-sm">
      <CCardHeader className="fw-semibold">Descontos Padrão</CCardHeader>
      <CCardBody>
        <p className="mb-0">
          Desconto aplicado: <strong>{valor}%</strong>
        </p>
      </CCardBody>
    </CCard>
  )
}

export default DescontosPadrao
