import React, { useState } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ModalFiltrosTransferencia = ({ visible, onClose, onFiltrar }) => {
  const [tipo, setTipo] = useState('')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = () => {
    onFiltrar({ tipo, search, startDate, endDate })
    onClose()
  }

  const handleLimpar = () => {
    setTipo('')
    setSearch('')
    setStartDate('')
    setEndDate('')
    onFiltrar({})
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg" alignment="center">
      <CModalHeader closeButton>
        <CModalTitle>Filtrar Transferências</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Tipo de Transferência</label>
            <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos</option>
              <option value="interna">Interna</option>
              <option value="externa">Externa</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Nome da Pessoa</label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Data Inicial</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Data Final</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleLimpar}>
          Limpar Filtros
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Aplicar Filtros
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalFiltrosTransferencia
