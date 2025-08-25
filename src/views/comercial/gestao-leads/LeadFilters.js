import React from 'react'
import { CRow, CCol, CFormInput, CFormSelect, CButton } from '@coreui/react'

const LeadFilters = ({ filtros, setFiltros, onFiltrar }) => {
  return (
    <CRow className="mb-3">
      <CCol md={4}>
        <CFormInput
          label="Nome"
          value={filtros.nome}
          onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
        />
      </CCol>
      <CCol md={4}>
        <CFormSelect
          label="Origem"
          value={filtros.origem}
          onChange={(e) => setFiltros({ ...filtros, origem: e.target.value })}
        >
          <option value="">Todas</option>
          <option value="Site">Site</option>
          <option value="Redes Sociais">Redes Sociais</option>
          <option value="Indicação">Indicação</option>
          <option value="Evento">Evento</option>
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormSelect
          label="Status"
          value={filtros.status}
          onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="Novo">Novo</option>
          <option value="Em Negociação">Em Negociação</option>
          <option value="Fechado">Fechado</option>
          <option value="Perdido">Perdido</option>
        </CFormSelect>
      </CCol>
      <CCol md={1} className="d-flex align-items-end">
        <CButton color="primary" onClick={onFiltrar}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default LeadFilters
