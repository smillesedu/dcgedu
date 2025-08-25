import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCadastroDisciplina = ({ disciplinaEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    carga_horaria: '',
    descricao: '',
  })

  useEffect(() => {
    if (disciplinaEditando) {
      setForm({
        nome: disciplinaEditando.nome || '',
        codigo: disciplinaEditando.codigo || '',
        carga_horaria: disciplinaEditando.carga_horaria || '',
        descricao: disciplinaEditando.descricao || '',
      })
    } else {
      setForm({ nome: '', codigo: '', carga_horaria: '', descricao: '' })
    }
  }, [disciplinaEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSave = async () => {
    if (!form.nome || !form.codigo || !form.carga_horaria) {
      alert('Preencha os campos obrigatórios!')
      return
    }

    let result
    if (disciplinaEditando) {
      result = await supabase
        .from('disciplinas')
        .update({
          nome: form.nome,
          codigo: form.codigo,
          carga_horaria: parseInt(form.carga_horaria, 10),
          descricao: form.descricao,
        })
        .eq('id', disciplinaEditando.id)
    } else {
      result = await supabase.from('disciplinas').insert([
        {
          nome: form.nome,
          codigo: form.codigo,
          carga_horaria: parseInt(form.carga_horaria, 10),
          descricao: form.descricao,
        },
      ])
    }

    if (result.error) {
      alert('Erro: ' + result.error.message)
    } else {
      onSalvo()
      const modalEl = document.getElementById('modalCadastroDisciplina')
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl)
      modalInstance.hide()
    }
  }

  return (
    <div className="modal fade" id="modalCadastroDisciplina" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {disciplinaEditando ? 'Editar Disciplina' : 'Nova Disciplina'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome*</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={form.nome}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Código*</label>
              <input
                type="text"
                name="codigo"
                className="form-control"
                value={form.codigo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Carga Horária (h)*</label>
              <input
                type="number"
                name="carga_horaria"
                className="form-control"
                value={form.carga_horaria}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                name="descricao"
                className="form-control"
                rows="3"
                value={form.descricao}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCadastroDisciplina
