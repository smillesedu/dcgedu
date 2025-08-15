import React, { useState } from 'react'

const FiltroMatricula = ({ turmas, cursos, onFiltrar }) => {
  const [filters, setFilters] = useState({
    turma: '',
    curso: '',
    search: '',
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const aplicarFiltros = () => {
    onFiltrar(filters)
  }

  return (
    <div className="mb-4 d-flex flex-wrap gap-2 align-items-end">
      <div>
        <label>Turma</label>
        <select className="form-select" name="turma" value={filters.turma} onChange={handleChange}>
          <option value="">Todas</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Curso</label>
        <select className="form-select" name="curso" value={filters.curso} onChange={handleChange}>
          <option value="">Todos</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Pesquisar</label>
        <input
          type="text"
          className="form-control"
          name="search"
          placeholder="Nome do aluno"
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={aplicarFiltros}>
          Filtrar
        </button>
      </div>
    </div>
  )
}

export default FiltroMatricula
