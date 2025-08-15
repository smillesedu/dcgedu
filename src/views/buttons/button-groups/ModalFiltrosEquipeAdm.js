import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalFiltrosEquipeAdm = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    perPage: 10,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: 'nome',
    status: '',
    unidade_id: 'T',
  })
  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    const carregar = async () => {
      const { data, error } = await supabase
        .from('unidades')
        .select('id, nome')
        .order('nome', { ascending: true })
      if (!error) setUnidades(data || [])
    }
    carregar()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <div className="filter-modal">
      <div className="modal-body">
        <div className="row g-2 align-items-end">
          <div className="col-md-2 col-6">
            <label className="form-label">Itens</label>
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

          <div className="col-md-2 col-6">
            <label className="form-label">Início</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-2 col-6">
            <label className="form-label">Fim</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Campo</label>
            <select
              name="keyFilter"
              value={filters.keyFilter}
              onChange={handleChange}
              className="form-control"
            >
              <option value="null">Selecione</option>
              <option value="nome">Nome</option>
              <option value="cargo">Cargo</option>
              <option value="email">Email</option>
              <option value="telefone">Telefone</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Pesquisar</label>
            <div className="position-relative">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Pesquisar..."
                className="form-control"
              />
              <i
                className="fa fa-search position-absolute"
                style={{
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 18,
                  color: '#777',
                }}
              />
            </div>
          </div>

          <div className="col-md-2">
            <label className="form-label">Ordenar</label>
            <select
              name="orderBy"
              value={filters.orderBy}
              onChange={handleChange}
              className="form-control"
            >
              <option value="nome">Nome</option>
              <option value="cargo">Cargo</option>
              <option value="created_at">Data Criação</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Todos</option>
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Unidade</label>
            <select
              name="unidade_id"
              value={filters.unidade_id}
              onChange={handleChange}
              className="form-control"
            >
              <option value="T">Todas</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
              <i className="fa fa-search" /> Filtrar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() =>
                setFilters({
                  perPage: 10,
                  startDate: '',
                  endDate: '',
                  keyFilter: 'null',
                  search: '',
                  orderBy: 'nome',
                  status: '',
                  unidade_id: 'T',
                })
              }
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalFiltrosEquipeAdm
