import { CBreadcrumb, CCol, CRow } from '@coreui/react'
import React, { useState } from 'react'

const ModalFiltros = ({ onFiltrar, tipoClientes = [], municipios = [] }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: '',
    estado: '',
    tipo_cliente_id: 'null',
    municipio_id: 'null',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <>
      <CCol xs={12}>
        <div className="filter-modal">
   

          <div className="modal-body">
            <div className="row g-2 align-items-end">
              {/* Itens por página */}
              <div className="col-md-1 col-3">
                <select
                  name="perPage"
                  value={filters.perPage}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="1">Entrada</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
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
                  placeholder="Data Início"
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
                  placeholder="Data Fim"
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
                  <option value="null">Selecione o tipo</option>
                  <option value="id">ID</option>
                  <option value="nome">Nome</option>
                  <option value="telefone">Telefone</option>
                  <option value="email">E-mail</option>
                  <option value="nif">NIF</option>
                </select>
              </div>

              {/* Campo de pesquisa */}
              <div className="col-md-3">
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
                  <option value="created_at">Data</option>
                  <option value="numero_identificacao">NIF</option>
                  <option value="morada">Endereço</option>
                  <option value="telefone">Telefone</option>
                </select>
              </div>

              {/* Estado */}
              <div className="col-md-2">
                <select
                  name="estado"
                  value={filters.estado}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Status</option>
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
              </div>

              {/* Tipo cliente */}
              <div className="col-md-2">
                <select
                  name="tipo_cliente_id"
                  value={filters.tipo_cliente_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="null">Tipo Cliente</option>
                  <option value="T">Todos</option>
                  {tipoClientes.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Município */}
              <div className="col-md-2">
                <select
                  name="municipio_id"
                  value={filters.municipio_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="null">Município</option>
                  <option value="T">Todos</option>
                  {municipios.map((mun) => (
                    <option key={mun.id} value={mun.id}>
                      {mun.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botões */}
              <div className="col-md-3 d-flex gap-2">
                <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
                  <i className="fa fa-search" /> Filtrar
                </button>
                <button type="button" className="btn btn-info btn-sm" disabled={false}>
                  <i className="fa fa-file-excel-o" /> Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </CCol>
    </>
  )
}

export default ModalFiltros
