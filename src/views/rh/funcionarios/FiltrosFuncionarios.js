import React from 'react'
import { CRow, CCol, CFormInput, CFormSelect, CButton } from '@coreui/react'

const FiltrosFuncionarios = ({ filtros, setFiltros, onFiltrar, departamentos }) => {
  return (
    <CRow className="g-2">
      <CCol md={4}>
        <CFormInput
          placeholder="Nome"
          value={filtros.nome}
          onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
        />
      </CCol>
      <CCol md={3}>
        <CFormSelect
          value={filtros.status}
          onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="ativo">Ativo</option>
          <option value="afastado">Afastado</option>
          <option value="desligado">Desligado</option>
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormSelect
          value={filtros.departamento_id}
          onChange={(e) => setFiltros({ ...filtros, departamento_id: e.target.value })}
        >
          <option value="">Departamento</option>
          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={2}>
        <CButton color="secondary" className="w-100" onClick={onFiltrar}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}
export default FiltrosFuncionarios
