import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import { CCol } from '@coreui/react'

const ModalFiltros = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    nome: '',
    matricula: '',
    turmaId: '',
  })

  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    fetchTurmas()
  }, [])

  const fetchTurmas = async () => {
    const { data, error } = await supabase.from('turmas').select('id, nome').order('nome')

    if (!error) {
      setTurmas(data || [])
    } else {
      console.error('Erro ao carregar turmas:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  const handleClear = () => {
    const cleared = {
      perPage: 5,
      startDate: '',
      endDate: '',
      nome: '',
      matricula: '',
      turmaId: '',
    }
    setFilters(cleared)
    onFiltrar?.(cleared)
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

            {/* Nome */}
            <div className="col-md-3">
              <input
                type="text"
                name="nome"
                value={filters.nome}
                onChange={handleChange}
                placeholder="Nome do aluno"
                className="form-control"
              />
            </div>

            {/* Matrícula */}
            <div className="col-md-2">
              <input
                type="text"
                name="matricula"
                value={filters.matricula}
                onChange={handleChange}
                placeholder="Matrícula"
                className="form-control"
              />
            </div>

            {/* Turma */}
            <div className="col-md-2">
              <select
                name="turmaId"
                value={filters.turmaId}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Todas as turmas</option>
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>

            {/* Botões */}
            <div className="col-md-3 d-flex gap-2">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
                <i className="fa fa-search" /> Filtrar
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleClear}>
                <i className="fa fa-eraser" /> Limpar
              </button>
            </div>
          </div>
        </div>
      </div>
    </CCol>
  )
}

export default ModalFiltros
