import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

const ModalProfessor = ({ professorEditando, onSalvo }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    status: 'Ativo',
    unidade_id: '',
    rua: '',
    casa_numero: '',
    bairro: '',
    municipio: '',
    provincia: '',
  })

  const [unidades, setUnidades] = useState([])

  useEffect(() => {
    fetchUnidades()
    if (professorEditando) {
      setFormData({
        nome: professorEditando.nome || '',
        email: professorEditando.email || '',
        telefone: professorEditando.telefone || '',
        especialidade: professorEditando.especialidade || '',
        status: professorEditando.status || 'Ativo',
        unidade_id: professorEditando.unidade?.id || '',
        rua: professorEditando.enderecos?.rua || '',
        casa_numero: professorEditando.enderecos?.casa_numero || '',
        bairro: professorEditando.enderecos?.bairro || '',
        municipio: professorEditando.enderecos?.municipio || '',
        provincia: professorEditando.enderecos?.provincia || '',
      })
    } else {
      resetForm()
    }
  }, [professorEditando])

  const fetchUnidades = async () => {
    const { data, error } = await supabase.from('unidades').select('id, nome')
    if (!error) setUnidades(data)
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      especialidade: '',
      status: 'Ativo',
      unidade_id: '',
      rua: '',
      casa_numero: '',
      bairro: '',
      municipio: '',
      provincia: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    let endereco_id = professorEditando?.endereco_id

    if (!endereco_id) {
      const { data: enderecoData, error: enderecoError } = await supabase
        .from('enderecos')
        .insert([
          {
            rua: formData.rua,
            casa_numero: formData.casa_numero,
            bairro: formData.bairro,
            municipio: formData.municipio,
            provincia: formData.provincia,
          },
        ])
        .select()
        .single()

      if (enderecoError) {
        console.error('Erro ao salvar endereço:', enderecoError)
        return
      }
      endereco_id = enderecoData.id
    }

    const payload = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      especialidade: formData.especialidade,
      status: formData.status,
      unidade_id: formData.unidade_id,
      endereco_id,
    }

    let result
    if (professorEditando) {
      result = await supabase.from('professores').update(payload).eq('id', professorEditando.id)
    } else {
      result = await supabase.from('professores').insert([payload])
    }

    if (result.error) {
      console.error('Erro ao salvar professor:', result.error)
    } else {
      onSalvo()
      resetForm()
    }
  }

  return (
    <div className="modal fade" id="modalProfessor" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {professorEditando ? 'Editar Professor' : 'Novo Professor'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Especialidade</label>
                <input
                  type="text"
                  className="form-control"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Unidade de Atuação</label>
                <select
                  name="unidade_id"
                  className="form-select"
                  value={formData.unidade_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {unidades.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label>Rua</label>
                <input
                  type="text"
                  className="form-control"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Número</label>
                <input
                  type="text"
                  className="form-control"
                  name="casa_numero"
                  value={formData.casa_numero}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Município</label>
                <input
                  type="text"
                  className="form-control"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Província</label>
                <input
                  type="text"
                  className="form-control"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                />
              </div>
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

export default ModalProfessor
