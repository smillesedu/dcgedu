import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const PoliticaReembolso = ({ texto }) => {
  return (
    <CCard className="shadow-sm">
      <CCardHeader className="fw-semibold">Política de Reembolso</CCardHeader>
      <CCardBody>
        <p className="mb-0">{texto}</p>
      </CCardBody>
    </CCard>
  )
}

export default PoliticaReembolso
