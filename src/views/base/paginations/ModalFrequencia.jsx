import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const ModalFrequencia = ({ frequenciaEditando, turmas, alunos, onSalvo }) => {
  const [form, setForm] = useState({
    turma_id: '',
    aluno_id: '',
    data_aula: '',
    status: 'Presente',
    observacao: '',
  })

  useEffect(() => {
    if (frequenciaEditando) {
      setForm({
        turma_id: frequenciaEditando.turma?.id || '',
        aluno_id: frequenciaEditando.aluno?.id || '',
        data_aula: frequenciaEditando.data_aula || '',
        status: frequenciaEditando.status || 'Presente',
        observacao: frequenciaEditando.observacao || '',
      })
    } else {
      setForm({
        turma_id: '',
        aluno_id: '',
        data_aula: '',
        status: 'Presente',
        observacao: '',
      })
    }
  }, [frequenciaEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    let result
    if (frequenciaEditando) {
      result = await supabase.from('frequencias').update(form).eq('id', frequenciaEditando.id)
    } else {
      result = await supabase.from('frequencias').insert([form])
    }

    if (!result.error) {
      onSalvo?.()
      document.getElementById('btnCloseFrequencia').click()
    } else {
      console.error(result.error)
    }
  }

  return (
    <div
      className="modal fade"
      id="modalFrequencia"
      tabIndex="-1"
      aria-labelledby="modalFrequenciaLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalFrequenciaLabel">
              {frequenciaEditando ? 'Editar Frequência' : 'Registrar Frequência'}
            </h5>
            <button
              type="button"
              className="btn-close"
              id="btnCloseFrequencia"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Turma</label>
                <select
                  name="turma_id"
                  value={form.turma_id}
                  onChange={handleChange}
                  className="form-control"
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
                <label>Aluno</label>
                <select
                  name="aluno_id"
                  value={form.aluno_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Selecione</option>
                  {alunos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label>Data</label>
                <input
                  type="date"
                  name="data_aula"
                  value={form.data_aula}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-4">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="Presente">Presente</option>
                  <option value="Falta">Falta</option>
                  <option value="Justificada">Justificada</option>
                </select>
              </div>

              <div className="col-md-12">
                <label>Observação</label>
                <textarea
                  name="observacao"
                  value={form.observacao}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalFrequencia
