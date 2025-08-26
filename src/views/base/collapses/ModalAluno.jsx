import { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'

export default function ModalAluno({ alunoEditando, onSalvo }) {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    responsavel_id: '',
  })

  const [usarResponsavelExistente, setUsarResponsavelExistente] = useState(false)
  const [responsaveis, setResponsaveis] = useState([])
  const [responsavelSelecionado, setResponsavelSelecionado] = useState('')
  const [novoResponsavel, setNovoResponsavel] = useState({
    nome: '',
    email: '',
    telefone: '',
  })

  const [novoEndereco, setNovoEndereco] = useState({
    casa_numero: '',
    rua: '',
    bairro: '',
    municipio: '',
    distrito: '',
    provincia: '',
  })

  const [documentos, setDocumentos] = useState([]) // múltiplos arquivos

  useEffect(() => {
    if (usarResponsavelExistente) {
      fetchResponsaveis()
    }
  }, [usarResponsavelExistente])

  const fetchResponsaveis = async () => {
    const { data, error } = await supabase.from('responsaveis').select('*')
    if (!error) setResponsaveis(data)
  }

  useEffect(() => {
    if (alunoEditando) {
      setFormData({
        nome: alunoEditando.nome,
        data_nascimento: alunoEditando.data_nascimento,
        email: alunoEditando.email,
        telefone: alunoEditando.telefone,
      })

      if (alunoEditando.responsavel_id) {
        setUsarResponsavelExistente(true)
        setResponsavelSelecionado(alunoEditando.responsavel_id)
      }

      if (alunoEditando.endereco_id) {
        setNovoEndereco(alunoEditando.endereco_id)
      }
    } else {
      resetForm()
    }
  }, [alunoEditando])

  const resetForm = () => {
    setFormData({
      nome: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      responsavel_id: '',
    })
    setNovoResponsavel({ nome: '', email: '', telefone: '' })
    setNovoEndereco({
      casa_numero: '',
      rua: '',
      bairro: '',
      municipio: '',
      distrito: '',
      provincia: '',
    })
    setDocumentos([])
    setResponsavelSelecionado('')
    setUsarResponsavelExistente(false)
  }

  const salvarAluno = async (e) => {
    e.preventDefault()
    let responsavelId = responsavelSelecionado

    // Criar responsável novo
    if (!usarResponsavelExistente) {
      const { data: respData, error: respError } = await supabase
        .from('responsaveis')
        .insert([novoResponsavel])
        .select('id')
        .single()
      if (respError) {
        console.error('Erro ao criar responsável:', respError)
        return
      }
      responsavelId = respData.id
    }

    // Criar endereço
    let enderecoId = null
    if (Object.values(novoEndereco).some((v) => v.trim() !== '')) {
      const { data: endData, error: endError } = await supabase
        .from('enderecos')
        .insert([novoEndereco])
        .select('id')
        .single()
      if (endError) {
        console.error('Erro ao criar endereço:', endError)
        return
      }
      enderecoId = endData.id
    }

    // Salvar aluno
    const alunoPayload = {
      ...formData,
      responsavel_id: responsavelId,
      endereco_id: enderecoId,
    }

    let alunoId
    let error

    if (alunoEditando) {
      ;({ error } = await supabase.from('alunos').update(alunoPayload).eq('id', alunoEditando.id))
      alunoId = alunoEditando.id
    } else {
      const { data: alunoData, error: alunoError } = await supabase
        .from('alunos')
        .insert([alunoPayload])
        .select('id')
        .single()
      alunoId = alunoData?.id
      error = alunoError
    }

    if (error) {
      console.error('Erro ao salvar aluno:', error)
      return
    }

    // Upload múltiplo de documentos
    if (documentos.length > 0 && alunoId) {
      for (let file of documentos) {
        const ext = file.name.split('.').pop()
        if (!['pdf', 'docx'].includes(ext.toLowerCase())) {
          alert(`Arquivo inválido: ${file.name}. Apenas PDF/DOCX permitidos.`)
          continue
        }

        const filePath = `alunos/${alunoId}/${Date.now()}_${file.name}`
        const { error: uploadError } = await supabase.storage
          .from('documentos')
          .upload(filePath, file)

        if (uploadError) {
          console.error('Erro no upload:', uploadError)
        } else {
          await supabase.from('documentos_aluno').insert([
            {
              aluno_id: alunoId,
              caminho: filePath,
              nome: file.name,
            },
          ])
        }
      }
    }

    onSalvo()
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalAluno'))
    modal.hide()
    resetForm()
  }

  return (
    <div className="modal fade" id="modalAluno" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={salvarAluno}>
            <div className="modal-header">
              <h5 className="modal-title">{alunoEditando ? 'Editar Aluno' : 'Novo Aluno'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body row g-3">
              {/* Campos do aluno */}
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input
                  className="form-control"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.data_nascimento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      data_nascimento: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>

              {/* Endereço */}
              {/* Endereço */}
              <div className="col-md-3">
                <label className="form-label">Casa Nº</label>
                <input
                  className="form-control"
                  value={novoEndereco.casa_numero}
                  onChange={(e) =>
                    setNovoEndereco({ ...novoEndereco, casa_numero: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Bairro</label>
                <input
                  className="form-control"
                  value={novoEndereco.bairro}
                  onChange={(e) => setNovoEndereco({ ...novoEndereco, bairro: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Município</label>
                <input
                  className="form-control"
                  value={novoEndereco.municipio}
                  onChange={(e) => setNovoEndereco({ ...novoEndereco, municipio: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Distrito</label>
                <input
                  className="form-control"
                  value={novoEndereco.distrito}
                  onChange={(e) => setNovoEndereco({ ...novoEndereco, distrito: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Província</label>
                <input
                  className="form-control"
                  value={novoEndereco.provincia}
                  onChange={(e) => setNovoEndereco({ ...novoEndereco, provincia: e.target.value })}
                />
              </div>

              {/* Seletor de responsável */}
              <div className="col-12">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={usarResponsavelExistente}
                    onChange={(e) => setUsarResponsavelExistente(e.target.checked)}
                  />
                  <label className="form-check-label">Usar responsável já cadastrado</label>
                </div>
              </div>

              {usarResponsavelExistente ? (
                <div className="col-md-12">
                  <label className="form-label">Selecione o responsável</label>
                  <select
                    className="form-select"
                    value={responsavelSelecionado}
                    onChange={(e) => setResponsavelSelecionado(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {responsaveis.map((resp) => (
                      <option key={resp.id} value={resp.id}>
                        {resp.nome} - {resp.telefone}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Nome do Responsável</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.nome}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          nome: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">E-mail do Resp.</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.email}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Telefone do Resp.</label>
                    <input
                      className="form-control"
                      value={novoResponsavel.telefone}
                      onChange={(e) =>
                        setNovoResponsavel({
                          ...novoResponsavel,
                          telefone: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {/* Upload de documentos */}
              <div className="col-md-12">
                <label className="form-label">Documentos do Aluno (PDF/DOCX)</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.docx"
                  multiple
                  onChange={(e) => setDocumentos(Array.from(e.target.files))}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {alunoEditando ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
