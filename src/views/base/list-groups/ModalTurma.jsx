// src/views/turmas/ModalTurma.jsx
import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const ModalTurma = ({ turmaEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    ano_letivo: '',
    turno: '',
    curso_id: '',
  })
  const [cursos, setCursos] = useState([])

  useEffect(() => {
    fetchCursos()
  }, [])

  useEffect(() => {
    if (turmaEditando) {
      setForm({
        nome: turmaEditando.nome || '',
        ano_letivo: turmaEditando.ano_letivo || '',
        turno: turmaEditando.turno || '',
        curso_id: turmaEditando.curso?.id || '',
      })
    } else {
      setForm({ nome: '', ano_letivo: '', turno: '', curso_id: '' })
    }
  }, [turmaEditando])

  const fetchCursos = async () => {
    const { data, error } = await supabase.from('cursos').select('id, nome')
    if (!error) setCursos(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (turmaEditando) {
      const { error } = await supabase
        .from('turmas')
        .update({
          nome: form.nome,
          ano_letivo: form.ano_letivo,
          turno: form.turno,
          curso_id: form.curso_id,
        })
        .eq('id', turmaEditando.id)
      if (!error) onSalvo?.()
    } else {
      const { error } = await supabase.from('turmas').insert([form])
      if (!error) onSalvo?.()
    }
  }

  return (
    <div
      className="modal fade"
      id="modalTurma"
      tabIndex="-1"
      aria-labelledby="modalTurmaLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTurmaLabel">
              {turmaEditando ? 'Editar Turma' : 'Nova Turma'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ano Letivo</label>
              <input
                type="number"
                className="form-control"
                name="ano_letivo"
                value={form.ano_letivo}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Turno</label>
              <select
                name="turno"
                className="form-control"
                value={form.turno}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="manhã">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Curso</label>
              <select
                name="curso_id"
                className="form-control"
                value={form.curso_id}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalTurma
