import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCadastroFeriado = ({ feriadoEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    tipo: '',
    data: '',
    ano: '',
    descricao: '',
  })

  useEffect(() => {
    if (feriadoEditando) {
      setForm({
        nome: feriadoEditando.nome || '',
        tipo: feriadoEditando.tipo || '',
        data: feriadoEditando.data ? feriadoEditando.data.split('T')[0] : '',
        ano: feriadoEditando.ano || '',
        descricao: feriadoEditando.descricao || '',
      })
    } else {
      setForm({ nome: '', tipo: '', data: '', ano: '', descricao: '' })
    }
  }, [feriadoEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!form.nome.trim() || !form.data.trim() || !form.tipo.trim()) {
      alert('Preencha pelo menos Nome, Tipo e Data.')
      return
    }

    if (!form.ano) {
      form.ano = new Date(form.data).getFullYear().toString()
    }

    if (feriadoEditando) {
      const { error } = await supabase
        .from('feriados_datas')
        .update(form)
        .eq('id', feriadoEditando.id)
      if (error) console.error(error)
    } else {
      const { error } = await supabase.from('feriados_datas').insert([form])
      if (error) console.error(error)
    }

    onSalvo()
    const modal = document.getElementById('modalCadastroFeriadoClose')
    if (modal) modal.click()
  }

  return (
    <div
      className="modal fade"
      id="modalCadastroFeriado"
      tabIndex="-1"
      aria-labelledby="modalCadastroFeriadoLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCadastroFeriadoLabel">
              {feriadoEditando ? 'Editar Feriado/Data Letiva' : 'Novo Feriado/Data Letiva'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="modalCadastroFeriadoClose"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={form.nome}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <input
                type="text"
                name="tipo"
                className="form-control"
                value={form.tipo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Data</label>
              <input
                type="date"
                name="data"
                className="form-control"
                value={form.data}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ano</label>
              <input
                type="text"
                name="ano"
                className="form-control"
                value={form.ano}
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

export default ModalCadastroFeriado
