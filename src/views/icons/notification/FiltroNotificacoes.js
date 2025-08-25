import React, { useState } from 'react'
import { CRow, CCol } from '@coreui/react'

const FiltroNotificacoes = ({ onFiltrar }) => {
  const [status, setStatus] = useState('todas')
  const [periodoDias, setPeriodoDias] = useState('')

  const aplicarFiltro = () => {
    onFiltrar({
      status,
      periodoDias: periodoDias ? parseInt(periodoDias) : null,
    })
  }

  return (
    <CRow className="mb-3">
      <CCol md={4}>
        <label>Status</label>
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="naoLidas">Não lidas</option>
          <option value="lidas">Lidas</option>
        </select>
      </CCol>

      <CCol md={4}>
        <label>Período</label>
        <select
          className="form-select"
          value={periodoDias}
          onChange={(e) => setPeriodoDias(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 3 meses</option>
        </select>
      </CCol>

      <CCol md={4} className="d-flex align-items-end">
        <button className="btn btn-primary w-100" onClick={aplicarFiltro}>
          Filtrar
        </button>
      </CCol>
    </CRow>
  )
}

export default FiltroNotificacoes
