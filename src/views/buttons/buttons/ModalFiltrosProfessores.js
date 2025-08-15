import React, { useState } from 'react'

const ModalFiltrosProfessores = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({ keyFilter: '', search: '', orderBy: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleApply = () => {
    onFiltrar(filters)
  }

  return (
    <div className="card p-3 mb-3">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label>Filtrar por</label>
          <select
            name="keyFilter"
            className="form-select"
            value={filters.keyFilter}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nome">Nome</option>
            <option value="email">Email</option>
            <option value="especialidade">Especialidade</option>
            <option value="status">Status</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Pesquisar</label>
          <input
            type="text"
            className="form-control"
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label>Ordenar por</label>
          <select
            name="orderBy"
            className="form-select"
            value={filters.orderBy}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nome">Nome</option>
            <option value="email">Email</option>
            <option value="especialidade">Especialidade</option>
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100" onClick={handleApply}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalFiltrosProfessores
