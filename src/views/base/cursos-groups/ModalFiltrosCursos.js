import React, { useState } from 'react'

const ModalFiltrosCursos = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <div className="filter-modal">
      <div className="row g-2 align-items-end">
        {/* Itens por página */}
        <div className="col-md-1 col-3">
          <select
            name="perPage"
            value={filters.perPage}
            onChange={handleChange}
            className="form-control"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Data início */}
        <div className="col-md-2 col-6">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Data fim */}
        <div className="col-md-2 col-6">
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Tipo de filtro */}
        <div className="col-md-2">
          <select
            name="keyFilter"
            value={filters.keyFilter}
            onChange={handleChange}
            className="form-control"
          >
            <option value="null">Tipo</option>
            <option value="id">ID</option>
            <option value="nome">Nome</option>
            <option value="descricao">Descrição</option>
            <option value="carga_horaria">Carga Horária</option>
          </select>
        </div>

        {/* Campo de pesquisa */}
        <div className="col-md-3">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Pesquisar..."
            className="form-control"
          />
        </div>

        {/* Ordenação */}
        <div className="col-md-2">
          <select
            name="orderBy"
            value={filters.orderBy}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Ordenar por</option>
            <option value="nome">Nome</option>
            <option value="carga_horaria">Carga Horária</option>
            <option value="created_at">Data Criação</option>
          </select>
        </div>

        {/* Botões */}
        <div className="col-md-3 d-flex gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
            <i className="fa fa-search" /> Filtrar
          </button>
          <button type="button" className="btn btn-info btn-sm">
            <i className="fa fa-file-excel-o" /> Excel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalFiltrosCursos
