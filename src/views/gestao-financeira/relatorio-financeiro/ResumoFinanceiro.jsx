import React from "react"
import { CCard, CCardBody, CRow, CCol } from "@coreui/react"

const ResumoFinanceiro = ({ totais }) => {
  return (
    <CCard>
      <CCardBody>
        <h5>Resumo</h5>
        <CRow>
          <CCol><b>Total Recebido:</b> {totais.recebido || 0} Kz</CCol>
          <CCol><b>Total Pendente:</b> {totais.pendente || 0} Kz</CCol>
          <CCol><b>Inadimplência:</b> {totais.inadimplencia || 0}%</CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ResumoFinanceiro
