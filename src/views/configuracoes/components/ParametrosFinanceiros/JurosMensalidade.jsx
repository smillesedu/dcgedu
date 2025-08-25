import React from 'react'
import { CCard, CCardBody, CCardHeader } from '@coreui/react'

const JurosMensalidade = ({ valor }) => {
  return (
    <CCard className="shadow-sm">
      <CCardHeader className="fw-semibold">Juros sobre Mensalidade</CCardHeader>
      <CCardBody>
        <p className="mb-0">
          Juros aplicados: <strong>{valor}% ao mês</strong>
        </p>
      </CCardBody>
    </CCard>
  )
}

export default JurosMensalidade
