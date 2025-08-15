import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CCol,
} from '@coreui/react'

const ModalFiltrosBoletins = ({ onFiltrar }) => {
  const [tipo, setTipo] = useState('')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const aplicarFiltros = () => {
    onFiltrar({ tipo, search, startDate, endDate })
  }

  return (
    <CModal >
      <CModalHeader>Filtrar Boletins e Documentos</CModalHeader>
      <CModalBody>
        <CForm className="row g-3">
          <CCol md={3}>
            <CFormSelect value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos os Tipos</option>
              <option value="Boletim">Boletim</option>
              <option value="Documento">Documento</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="text"
              placeholder="Pesquisar título"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="date"
              placeholder="Data Inicial"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              type="date"
              placeholder="Data Final"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={aplicarFiltros}>
          Aplicar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalFiltrosBoletins
