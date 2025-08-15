import React, { useState } from 'react'

const ModalFiltrosAtribuicoes = ({ onFiltrar }) => {
  const [keyFilter, setKeyFilter] = useState('professor.nome')
  const [search, setSearch] = useState('')

  const aplicarFiltro = () => {
    onFiltrar({ keyFilter, search })
  }

  return (
    <div className="d-flex gap-2 align-items-end">
      <div>
        <label>Filtrar por</label>
        <select
          className="form-select"
          value={keyFilter}
          onChange={(e) => setKeyFilter(e.target.value)}
        >
          <option value="professor.nome">Professor</option>
          <option value="disciplina.nome">Disciplina</option>
          <option value="turma.nome">Turma</option>
          <option value="unidade.nome">Unidade</option>
        </select>
      </div>
      <div>
        <label>Busca</label>
        <input
          className="form-control"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={aplicarFiltro}>
        Aplicar
      </button>
    </div>
  )
}

export default ModalFiltrosAtribuicoes
