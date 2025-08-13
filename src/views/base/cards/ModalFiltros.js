import React, { useState } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const ModalFiltros = ({ onFiltrar }) => {
  const [visible, setVisible] = useState(false)
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    serie: '',
    disciplina: '',
    situacao: '',
    keyFilter: 'aluno',
    search: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleFiltrar = () => {
    onFiltrar(filters)
    setVisible(false)
  }

  const handleLimpar = () => {
    const emptyFilters = {
      startDate: '',
      endDate: '',
      serie: '',
      disciplina: '',
      situacao: '',
      keyFilter: 'aluno',
      search: ''
    }
    setFilters(emptyFilters)
    onFiltrar(emptyFilters)
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)}>
        <i className="fa fa-filter me-2"></i> Filtros
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)} alignment="center" size="lg">
        <CModalHeader>
          <CModalTitle>Filtrar Histórico Escolar</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="row mb-3">
              <div className="col">
                <CFormLabel>Ano inicial</CFormLabel>
                <CFormInput
                  type="number"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleChange}
                  placeholder="Ex: 2022"
                />
              </div>
              <div className="col">
                <CFormLabel>Ano final</CFormLabel>
                <CFormInput
                  type="number"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleChange}
                  placeholder="Ex: 2024"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <CFormLabel>Série</CFormLabel>
                <CFormInput
                  type="text"
                  name="serie"
                  value={filters.serie}
                  onChange={handleChange}
                  placeholder="Ex: 3º Ano"
                />
              </div>
              <div className="col">
                <CFormLabel>Disciplina</CFormLabel>
                <CFormInput
                  type="text"
                  name="disciplina"
                  value={filters.disciplina}
                  onChange={handleChange}
                  placeholder="Ex: Matemática"
                />
              </div>
            </div>

            <div className="mb-3">
              <CFormLabel>Situação</CFormLabel>
              <CFormSelect
                name="situacao"
                value={filters.situacao}
                onChange={handleChange}
              >
                <option value="">Todas</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
              </CFormSelect>
            </div>

            <div className="row mb-3">
              <div className="col-4">
                <CFormLabel>Pesquisar por</CFormLabel>
                <CFormSelect
                  name="keyFilter"
                  value={filters.keyFilter}
                  onChange={handleChange}
                >
                  <option value="aluno">Aluno</option>
                  <option value="disciplina">Disciplina</option>
                  <option value="situacao">Situação</option>
                </CFormSelect>
              </div>
              <div className="col-8">
                <CFormLabel>Texto</CFormLabel>
                <CFormInput
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  placeholder="Digite para pesquisar..."
                />
              </div>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleLimpar}>
            Limpar
          </CButton>
          <CButton color="primary" onClick={handleFiltrar}>
            Aplicar Filtros
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalFiltros
