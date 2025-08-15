import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalDesempenhoDocente = ({ registroEditando, onSalvo }) => {
  const [professores, setProfessores] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [turmas, setTurmas] = useState([])

  const [form, setForm] = useState({
    professor_id: '',
    disciplina_id: '',
    turma_id: '',
    periodo_inicio: '',
    periodo_fim: '',
    presenca_percentual: '',
    pontualidade_percentual: '',
    nota_media: '',
    feedback: '',
  })

  useEffect(() => {
    fetchOptions()
    if (registroEditando) {
      setForm({
        professor_id: registroEditando.professor?.id || '',
        disciplina_id: registroEditando.disciplina?.id || '',
        turma_id: registroEditando.turma?.id || '',
        periodo_inicio: registroEditando.periodo_inicio || '',
        periodo_fim: registroEditando.periodo_fim || '',
        presenca_percentual: registroEditando.presenca_percentual || '',
        pontualidade_percentual: registroEditando.pontualidade_percentual || '',
        nota_media: registroEditando.nota_media || '',
        feedback: registroEditando.feedback || '',
      })
    }
  }, [registroEditando])

  const fetchOptions = async () => {
    const [{ data: profs }, { data: discs }, { data: turmas }] = await Promise.all([
      supabase.from('professores').select('id, nome'),
      supabase.from('disciplinas').select('id, nome'),
      supabase.from('turmas').select('id, nome'),
    ])
    setProfessores(profs || [])
    setDisciplinas(discs || [])
    setTurmas(turmas || [])
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res
    if (registroEditando) {
      res = await supabase.from('desempenho_docente').update(form).eq('id', registroEditando.id)
    } else {
      res = await supabase.from('desempenho_docente').insert([form])
    }
    if (!res.error) {
      onSalvo()
      document.getElementById('closeModalDesempenho').click()
    }
  }

  return (
    <div className="modal fade" id="modalDesempenhoDocente" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {registroEditando ? 'Editar Desempenho' : 'Novo Registro de Desempenho'}
              </h5>
              <button
                type="button"
                id="closeModalDesempenho"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body row g-3">
              <div className="col-md-4">
                <label>Professor</label>
                <select
                  className="form-control"
                  name="professor_id"
                  value={form.professor_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {professores.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Disciplina</label>
                <select
                  className="form-control"
                  name="disciplina_id"
                  value={form.disciplina_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {disciplinas.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Turma</label>
                <select
                  className="form-control"
                  name="turma_id"
                  value={form.turma_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {turmas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label>Início do Período</label>
                <input
                  type="date"
                  name="periodo_inicio"
                  className="form-control"
                  value={form.periodo_inicio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label>Fim do Período</label>
                <input
                  type="date"
                  name="periodo_fim"
                  className="form-control"
                  value={form.periodo_fim}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label>Presença (%)</label>
                <input
                  type="number"
                  name="presenca_percentual"
                  step="0.01"
                  min="0"
                  max="100"
                  className="form-control"
                  value={form.presenca_percentual}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Pontualidade (%)</label>
                <input
                  type="number"
                  name="pontualidade_percentual"
                  step="0.01"
                  min="0"
                  max="100"
                  className="form-control"
                  value={form.pontualidade_percentual}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Nota Média</label>
                <input
                  type="number"
                  name="nota_media"
                  step="0.01"
                  min="0"
                  max="10"
                  className="form-control"
                  value={form.nota_media}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label>Feedback</label>
                <textarea
                  name="feedback"
                  className="form-control"
                  value={form.feedback}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Salvar
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalDesempenhoDocente
