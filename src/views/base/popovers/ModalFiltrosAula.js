import React, { useState } from 'react'
import { CCol, CRow, CButton, CFormSelect, CFormInput } from '@coreui/react'

const ModalFiltrosAula = ({ onFiltrar, turmas = [], disciplinas = [], professores = [] }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    turma_id: '',
    disciplina_id: '',
    professor_id: '',
    status: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <CRow className="align-items-end g-2 mb-3">
      <CCol md={2}>
        <CFormSelect name="perPage" value={filters.perPage} onChange={handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormInput type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
      </CCol>

      <CCol md={2}>
        <CFormInput type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
      </CCol>

      <CCol md={2}>
        <CFormSelect name="turma_id" value={filters.turma_id} onChange={handleChange}>
          <option value="">Turma</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormSelect name="disciplina_id" value={filters.disciplina_id} onChange={handleChange}>
          <option value="">Disciplina</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormSelect name="professor_id" value={filters.professor_id} onChange={handleChange}>
          <option value="">Professor</option>
          {professores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormSelect name="status" value={filters.status} onChange={handleChange}>
          <option value="">Status</option>
          <option value="Agendada">Agendada</option>
          <option value="Realizada">Realizada</option>
          <option value="Cancelada">Cancelada</option>
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CButton color="primary" onClick={handleSubmit}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default ModalFiltrosAula
