import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const TaxasMulta = ({ valor }) => {
  return (
    <CCard className="shadow-sm">
      <CCardHeader className="fw-semibold">Taxa de Multa</CCardHeader>
      <CCardBody>
        <p className="mb-0">
          Taxa atual: <strong>{valor}%</strong>
        </p>
      </CCardBody>
    </CCard>
  )
}

export default TaxasMulta
