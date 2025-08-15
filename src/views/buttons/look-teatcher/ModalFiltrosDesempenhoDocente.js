import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalFiltrosDesempenhoDocente = ({ onFiltrar }) => {
  const [professores, setProfessores] = useState([])
  const [turmas, setTurmas] = useState([])
  const [filters, setFilters] = useState({
    professor_id: '',
    turma_id: '',
    periodo_inicio: '',
    periodo_fim: '',
  })

  useEffect(() => {
    fetchOptions()
  }, [])

  const fetchOptions = async () => {
    const [{ data: profs }, { data: turmasData }] = await Promise.all([
      supabase.from('professores').select('id, nome'),
      supabase.from('turmas').select('id, nome'),
    ])
    setProfessores(profs || [])
    setTurmas(turmasData || [])
  }

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFiltrar = (e) => {
    e.preventDefault()
    onFiltrar(filters)
  }

  return (
    <form onSubmit={handleFiltrar} className="row g-3 mb-4">
      <div className="col-md-4">
        <label>Professor</label>
        <select
          name="professor_id"
          className="form-control"
          value={filters.professor_id}
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
      <div className="col-md-4">
        <label>Turma</label>
        <select
          name="turma_id"
          className="form-control"
          value={filters.turma_id}
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
      <div className="col-md-2">
        <label>Início</label>
        <input
          type="date"
          name="periodo_inicio"
          className="form-control"
          value={filters.periodo_inicio}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <label>Fim</label>
        <input
          type="date"
          name="periodo_fim"
          className="form-control"
          value={filters.periodo_fim}
          onChange={handleChange}
        />
      </div>
      <div className="col-12 d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">
          Filtrar
        </button>
      </div>
    </form>
  )
}

export default ModalFiltrosDesempenhoDocente
