import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const FiltroCronograma = ({ onFiltrar }) => {
  const [cursos, setCursos] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [filters, setFilters] = useState({
    curso: '',
    disciplina: '',
    data_inicio: '',
    data_fim: '',
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
      <select name="curso" className="form-select" value={filters.curso} onChange={handleChange}>
        <option value="">Todos os Cursos</option>
        {cursos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nome}
          </option>
        ))}
      </select>

      <select
        name="disciplina"
        className="form-select"
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

      <input
        type="date"
        name="data_inicio"
        className="form-control"
        value={filters.data_inicio}
        onChange={handleChange}
      />
      <input
        type="date"
        name="data_fim"
        className="form-control"
        value={filters.data_fim}
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={handleFiltrarClick}>
        Filtrar
      </button>
    </div>
  )
}

export default FiltroCronograma
