import React, { useState, useEffect } from 'react'
import supabase from '../../../supaBaseClient'

const ModalCadastroUnidade = ({ unidadeEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    cidade: '',
    estado: '',
    endereco: '',
  })

  useEffect(() => {
    if (unidadeEditando) {
      setForm({
        nome: unidadeEditando.nome || '',
        cidade: unidadeEditando.cidade || '',
        estado: unidadeEditando.estado || '',
        endereco: unidadeEditando.endereco || '',
      })
    } else {
      setForm({ nome: '', cidade: '', estado: '', endereco: '' })
    }
  }, [unidadeEditando])

  const salvarUnidade = async () => {
    if (!form.nome) {
      alert('Nome da unidade é obrigatório')
      return
    }

    if (unidadeEditando) {
      const { error } = await supabase.from('unidades').update(form).eq('id', unidadeEditando.id)

      if (!error) {
        onSalvo()
        document.getElementById('modalCadastroUnidadeFechar').click()
      }
    } else {
      const { error } = await supabase.from('unidades').insert([form])
      if (!error) {
        onSalvo()
        document.getElementById('modalCadastroUnidadeFechar').click()
      }
    }
  }

  return (
    <div className="modal fade" id="modalCadastroUnidade" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {unidadeEditando ? 'Editar Unidade Escolar' : 'Nova Unidade Escolar'}
            </h5>
            <button
              type="button"
              className="btn-close"
              id="modalCadastroUnidadeFechar"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.cidade}
                  onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Endereço</label>
              <input
                type="text"
                className="form-control"
                value={form.endereco}
                onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={salvarUnidade}>
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCadastroUnidade
