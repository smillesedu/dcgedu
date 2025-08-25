import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const FiltroMatricula = ({ onFiltrar }) => {
  const [cursos, setCursos] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [filters, setFilters] = useState({
    curso: '',
    disciplina: '',
    search: '',
  })

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from('cursos').select('id,nome')
      setCursos(data || [])
    }
    const fetchDisciplinas = async () => {
      const { data } = await supabase.from('disciplinas').select('id,nome')
      setDisciplinas(data || [])
    }
    fetchCursos()
    fetchDisciplinas()
  }, [])

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleFiltrarClick = () => {
    onFiltrar(filters)
  }

  return (
    <div className="mb-3 d-flex gap-2 flex-wrap">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por aluno"
        name="search"
        value={filters.search}
        onChange={handleChange}
      />
      <select className="form-select" name="curso" value={filters.curso} onChange={handleChange}>
        <option value="">Todos os Cursos</option>
        {cursos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>
      <select
        className="form-select"
        name="disciplina"
        value={filters.disciplina}
        onChange={handleChange}
      >
        <option value="">Todas as Disciplinas</option>
        {disciplinas.map((d) => (
          <option key={d.id} value={d.id}>
            {d.nome}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleFiltrarClick}>
        Filtrar
      </button>
    </div>
  )
}

export default FiltroMatricula
