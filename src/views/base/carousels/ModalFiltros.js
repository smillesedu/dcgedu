import { CCol } from '@coreui/react'
import React, { useState } from 'react'

const ModalFiltrosMatriculas = ({ onFiltrar, alunos = [], cursos = [] }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: '',
    estado: '',
    aluno_id: 'null',
    curso_id: 'null',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
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
                <option value="null">Selecione o tipo</option>
                <option value="id">ID Matrícula</option>
                <option value="aluno">Aluno</option>
                <option value="curso">Curso</option>
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
                <option value="aluno">Aluno</option>
                <option value="curso">Curso</option>
                <option value="data_matricula">Data Matrícula</option>
              </select>
            </div>

            {/* Status da matrícula */}
            <div className="col-md-2">
              <select
                name="estado"
                value={filters.estado}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Status</option>
                <option value="1">Ativa</option>
                <option value="0">Cancelada</option>
              </select>
            </div>

            {/* Aluno */}
            <div className="col-md-3">
              <select
                name="aluno_id"
                value={filters.aluno_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="null">Todos os alunos</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Curso */}
            <div className="col-md-3">
              <select
                name="curso_id"
                value={filters.curso_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="null">Todos os cursos</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
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
      </div>
    </CCol>
  )
}

export default ModalFiltrosMatriculas
