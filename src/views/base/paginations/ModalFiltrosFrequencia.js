import React, { useState } from 'react'

const ModalFiltrosFrequencia = ({ onFiltrar, turmas = [], alunos = [] }) => {
  const [filters, setFilters] = useState({
    turmaId: '',
    alunoId: '',
    status: '',
    startDate: '',
    endDate: '',
    perPage: 5,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
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

      {/* Turma */}
      <div className="col-md-3">
        <select
          name="turmaId"
          value={filters.turmaId}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Todas as Turmas</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Aluno */}
      <div className="col-md-3">
        <select
          name="alunoId"
          value={filters.alunoId}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Todos os Alunos</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="col-md-2">
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Todos</option>
          <option value="Presente">Presente</option>
          <option value="Falta">Falta</option>
          <option value="Justificada">Justificada</option>
        </select>
      </div>

      {/* Data início */}
      <div className="col-md-2">
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Data fim */}
      <div className="col-md-2">
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* Botão */}
      <div className="col-md-2">
        <button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export default ModalFiltrosFrequencia
