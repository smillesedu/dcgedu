import React, { useState } from "react"
import { CRow, CCol, CFormInput, CButton } from "@coreui/react"

const RelatorioFilters = ({ onChange }) => {
  const [inicio, setInicio] = useState("")
  const [fim, setFim] = useState("")

  const aplicarFiltros = () => {
    onChange({ inicio, fim })
  }

  return (
    <CRow>
      <CCol md={4}>
        <CFormInput type="date" label="Data Início" value={inicio} onChange={(e) => setInicio(e.target.value)} />
      </CCol>
      <CCol md={4}>
        <CFormInput type="date" label="Data Fim" value={fim} onChange={(e) => setFim(e.target.value)} />
      </CCol>
      <CCol md={4} className="d-flex align-items-end">
        <CButton color="primary" onClick={aplicarFiltros}>Aplicar</CButton>
      </CCol>
    </CRow>
  )
}

export default RelatorioFilters
