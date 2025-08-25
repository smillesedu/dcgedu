import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCadastroParametro = ({ parametroEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    tipo: '',
    descricao: '',
    valor: '',
  })

  useEffect(() => {
    if (parametroEditando) {
      setForm({
        nome: parametroEditando.nome || '',
        tipo: parametroEditando.tipo || '',
        descricao: parametroEditando.descricao || '',
        valor: parametroEditando.valor || '',
      })
    } else {
      setForm({
        nome: '',
        tipo: '',
        descricao: '',
        valor: '',
      })
    }
  }, [parametroEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!form.nome.trim() || !form.tipo.trim()) {
      alert('Por favor, preencha pelo menos o Nome e o Tipo.')
      return
    }

    if (parametroEditando) {
      // Atualizar
      const { error } = await supabase
        .from('parametros_regras')
        .update(form)
        .eq('id', parametroEditando.id)

      if (error) console.error(error)
    } else {
      // Inserir
      const { error } = await supabase.from('parametros_regras').insert([form])

      if (error) console.error(error)
    }

    onSalvo()
    // Fecha modal manualmente
    const modal = document.getElementById('modalCadastroParametroClose')
    if (modal) modal.click()
  }

  return (
    <div
      className="modal fade"
      id="modalCadastroParametro"
      tabIndex="-1"
      aria-labelledby="modalCadastroParametroLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCadastroParametroLabel">
              {parametroEditando ? 'Editar Parâmetro' : 'Novo Parâmetro'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="modalCadastroParametroClose"
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
                placeholder="Ex: Limite de Faltas"
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
                placeholder="Ex: Regra, Limite, Data..."
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
                placeholder="Detalhe sobre a regra ou parâmetro"
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Valor</label>
              <input
                type="text"
                name="valor"
                className="form-control"
                value={form.valor}
                onChange={handleChange}
                placeholder="Ex: 75%, 10 dias, 2025-12-31"
              />
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

export default ModalCadastroParametro
