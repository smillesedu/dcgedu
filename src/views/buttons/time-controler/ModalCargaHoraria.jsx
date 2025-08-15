import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCargaHoraria = ({ cargaEditando, onSalvo }) => {
  const [professores, setProfessores] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [form, setForm] = useState({
    professor_id: '',
    disciplina_id: '',
    turma_id: '',
    data_inicio: '',
    data_fim: '',
    carga_semanal: '',
  })

  useEffect(() => {
    fetchSelects()
  }, [])

  useEffect(() => {
    if (cargaEditando) {
      setForm({
        professor_id: cargaEditando.professor?.id || '',
        disciplina_id: cargaEditando.disciplina?.id || '',
        turma_id: cargaEditando.turma?.id || '',
        data_inicio: cargaEditando.data_inicio || '',
        data_fim: cargaEditando.data_fim || '',
        carga_semanal: cargaEditando.carga_semanal || '',
      })
    } else {
      setForm({
        professor_id: '',
        disciplina_id: '',
        turma_id: '',
        data_inicio: '',
        data_fim: '',
        carga_semanal: '',
      })
    }
  }, [cargaEditando])

  const fetchSelects = async () => {
    const { data: profs } = await supabase.from('professores').select('id, nome')
    const { data: discs } = await supabase.from('disciplinas').select('id, nome')
    const { data: turms } = await supabase.from('turmas').select('id, nome')
    setProfessores(profs || [])
    setDisciplinas(discs || [])
    setTurmas(turms || [])
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (cargaEditando) {
      await supabase.from('carga_horaria').update(form).eq('id', cargaEditando.id)
    } else {
      await supabase.from('carga_horaria').insert([form])
    }
    onSalvo()
  }

  return (
    <div className="modal fade" id="modalCargaHoraria" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {cargaEditando ? 'Editar Carga Horária' : 'Nova Carga Horária'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Professor</label>
              <select
                className="form-control"
                name="professor_id"
                value={form.professor_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {professores.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Disciplina</label>
              <select
                className="form-control"
                name="disciplina_id"
                value={form.disciplina_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {disciplinas.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Turma</label>
              <select
                className="form-control"
                name="turma_id"
                value={form.turma_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {turmas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Data Início</label>
              <input
                type="date"
                className="form-control"
                name="data_inicio"
                value={form.data_inicio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Data Fim</label>
              <input
                type="date"
                className="form-control"
                name="data_fim"
                value={form.data_fim}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Carga Semanal (h)</label>
              <input
                type="number"
                className="form-control"
                name="carga_semanal"
                value={form.carga_semanal}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCargaHoraria
