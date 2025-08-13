import React, { useState } from 'react'
import { CRow, CCol, CFormSelect, CFormInput, CButton } from '@coreui/react'

const ModalFiltrosCalendario = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({ tipo: '', turma: '', startDate: '', endDate: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <CRow className="mb-3 g-2 align-items-end">
      <CCol md={2}>
        <CFormSelect name="tipo" value={filters.tipo} onChange={handleChange}>
          <option value="">Tipo de Evento</option>
          <option value="Aula">Aula</option>
          <option value="Avaliação">Avaliação</option>
          <option value="Feriado">Feriado</option>
          <option value="Reunião">Reunião</option>
          <option value="Outro">Outro</option>
        </CFormSelect>
      </CCol>
      <CCol md={2}>
        <CFormInput type="text" name="turma" value={filters.turma} onChange={handleChange} placeholder="Turma/Curso" />
      </CCol>
      <CCol md={2}>
        <CFormInput type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
      </CCol>
      <CCol md={2}>
        <CFormInput type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
      </CCol>
      <CCol md={2}>
        <CButton color="primary" onClick={handleSubmit}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default ModalFiltrosCalendario
