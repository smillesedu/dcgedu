import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalEquipeAdm = ({ membroEditando, onSalvo }) => {
  const [form, setForm] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    status: '1',
    unidade_id: null,
    rua: '',
    casa_numero: '',
    bairro: '',
    municipio: '',
    provincia: '',
  })
  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    carregarUnidades()
  }, [])

  const carregarUnidades = async () => {
    const { data, error } = await supabase.from('unidades').select('id, nome')
    if (!error) setUnidades(data || [])
  }

  useEffect(() => {
    if (membroEditando) {
      setForm({
        nome: membroEditando.nome || '',
        cargo: membroEditando.cargo || '',
        email: membroEditando.email || '',
        telefone: membroEditando.telefone || '',
        status: String(membroEditando.status ?? '1'),
        unidade_id: membroEditando.unidade?.id ?? null,
        rua: membroEditando.enderecos?.rua || '',
        casa_numero: membroEditando.enderecos?.casa_numero || '',
        bairro: membroEditando.enderecos?.bairro || '',
        municipio: membroEditando.enderecos?.municipio || '',
        provincia: membroEditando.enderecos?.provincia || '',
      })
    } else {
      setForm((prev) => ({
        ...prev,
        nome: '',
        cargo: '',
        email: '',
        telefone: '',
        status: '1',
        unidade_id: null,
        rua: '',
        casa_numero: '',
        bairro: '',
        municipio: '',
        provincia: '',
      }))
    }
  }, [membroEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  const salvar = async () => {
    // 1) upsert endereço
    let endereco_id = membroEditando?.endereco_id || null
    const enderecoPayload = {
      rua: form.rua || null,
      casa_numero: form.casa_numero || null,
      bairro: form.bairro || null,
      municipio: form.municipio || null,
      provincia: form.provincia || null,
    }

    if (
      enderecoPayload.rua ||
      enderecoPayload.bairro ||
      enderecoPayload.municipio ||
      enderecoPayload.provincia
    ) {
      if (endereco_id) {
        const { error } = await supabase
          .from('enderecos')
          .update(enderecoPayload)
          .eq('id', endereco_id)
        if (error) console.error('Erro ao atualizar endereço:', error)
      } else {
        const { data, error } = await supabase
          .from('enderecos')
          .insert(enderecoPayload)
          .select('id')
          .single()
        if (!error) endereco_id = data.id
      }
    } else {
      endereco_id = null
    }

    // 2) upsert membro
    const payload = {
      nome: form.nome,
      cargo: form.cargo,
      email: form.email || null,
      telefone: form.telefone || null,
      status: form.status,
      unidade_id: form.unidade_id ? Number(form.unidade_id) : null,
      endereco_id: endereco_id,
    }

    let error
    if (membroEditando?.id) {
      ;({ error } = await supabase
        .from('equipe_administrativa')
        .update(payload)
        .eq('id', membroEditando.id))
    } else {
      ;({ error } = await supabase.from('equipe_administrativa').insert(payload))
    }

    if (error) {
      console.error('Erro ao salvar membro:', error)
      return
    }

    // Fechar modal via data-bs-dismiss no botão (não programático)
    onSalvo?.()
    // limpar formulário (opcional)
  }

  return (
    <div className="modal fade" id="modalEquipeAdm" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {membroEditando ? 'Editar Membro da Equipe' : 'Novo Membro da Equipe'}
            </h5>
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Fechar"
            />
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome *</label>
                <input
                  className="form-control"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Cargo *</label>
                <input
                  className="form-control"
                  name="cargo"
                  value={form.cargo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Unidade</label>
                <select
                  className="form-control"
                  name="unidade_id"
                  value={form.unidade_id ?? ''}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  {unidades.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="1">Ativo</option>
                  <option value="0">Inativo</option>
                </select>
              </div>

              <div className="col-12">
                <hr />
                <strong>Endereço (opcional)</strong>
              </div>

              <div className="col-md-6">
                <label className="form-label">Rua</label>
                <input
                  className="form-control"
                  name="rua"
                  value={form.rua}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Número</label>
                <input
                  className="form-control"
                  name="casa_numero"
                  value={form.casa_numero}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Bairro</label>
                <input
                  className="form-control"
                  name="bairro"
                  value={form.bairro}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Município</label>
                <input
                  className="form-control"
                  name="municipio"
                  value={form.municipio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Província</label>
                <input
                  className="form-control"
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={salvar}
              data-bs-dismiss="modal"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalEquipeAdm
