import React, { useState } from 'react'

const FiltroMateriais = ({ disciplinas, turmas, professores, onFiltrar }) => {
  const [filters, setFilters] = useState({
    disciplina: '',
    turma: '',
    professor: '',
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
        <label>Disciplina</label>
        <select
          className="form-select"
          name="disciplina"
          value={filters.disciplina}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Turma</label>
        <select
          className="form-select"
          name="turma"
          value={filters.turma}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Professor</label>
        <select
          className="form-select"
          name="professor"
          value={filters.professor}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          {professores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
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
          value={filters.search}
          onChange={handleChange}
          placeholder="Título do material"
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

export default FiltroMateriais
