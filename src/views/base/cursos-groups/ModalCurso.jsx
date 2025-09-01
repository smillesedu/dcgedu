import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCurso = ({ cursoEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
    carga_horaria: '',
  })

  useEffect(() => {
    if (cursoEditando) {
      setForm({
        nome: cursoEditando.nome || '',
        descricao: cursoEditando.descricao || '',
        carga_horaria: cursoEditando.carga_horaria || '',
      })
    } else {
      setForm({ nome: '', descricao: '', carga_horaria: '' })
    }
  }, [cursoEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (cursoEditando) {
      const { error } = await supabase
        .from('cursos')
        .update({
          nome: form.nome,
          descricao: form.descricao,
          carga_horaria: form.carga_horaria,
        })
        .eq('id', cursoEditando.id)

      if (!error) onSalvo?.()
    } else {
      const { error } = await supabase.from('cursos').insert([form])
      if (!error) onSalvo?.()
    }
  }

  return (
    <div
      className="modal fade"
      id="modalCurso"
      tabIndex="-1"
      aria-labelledby="modalCursoLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCursoLabel">
              {cursoEditando ? 'Editar Curso' : 'Novo Curso'}
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
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Carga Horária (horas)</label>
              <input
                type="number"
                className="form-control"
                name="carga_horaria"
                value={form.carga_horaria}
                onChange={handleChange}
              />
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

export default ModalCurso
