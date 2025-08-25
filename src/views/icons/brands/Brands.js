import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb } from '../../../components'

const ContatoProfessoresDirecao = () => {
  const [responsavelId, setResponsavelId] = useState(null)
  const [professores, setProfessores] = useState([])
  const [direcao, setDirecao] = useState([])
  const [mensagens, setMensagens] = useState([])
  const [form, setForm] = useState({
    tipo_destinatario: '',
    destinatario_id: '',
    assunto: '',
    mensagem: '',
  })

  useEffect(() => {
    autenticarResponsavel()
  }, [])

  const autenticarResponsavel = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Você precisa estar logado.')
      return
    }

    const { data, error } = await supabase
      .from('responsaveis')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (error || !data) {
      alert('Responsável não encontrado.')
      return
    }

    setResponsavelId(data.id)
    fetchProfessores(data.id)
    fetchDirecao()
    fetchMensagens(data.id)
  }

  const fetchProfessores = async (respId) => {
    const { data, error } = await supabase
      .from('professores')
      .select('id, nome')
      .in(
        'id',
        supabase
          .from('turmas')
          .select('professor_id')
          .in('id', supabase.from('alunos').select('turma_id').eq('responsavel_id', respId)),
      )

    if (!error) setProfessores(data || [])
  }

  const fetchDirecao = async () => {
    const { data, error } = await supabase
      .from('equipe_administrativa')
      .select('id, nome, cargo')
      .eq('cargo', 'Direção')

    if (!error) setDirecao(data || [])
  }

  const fetchMensagens = async (respId) => {
    const { data, error } = await supabase
      .from('mensagens')
      .select(
        `
        id,
        assunto,
        mensagem,
        resposta,
        data_envio,
        data_resposta,
        professores(nome),
        equipe_administrativa(nome)
      `,
      )
      .eq('responsavel_id', respId)
      .order('data_envio', { ascending: false })

    if (!error) setMensagens(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!responsavelId) return

    const payload = {
      responsavel_id: responsavelId,
      assunto: form.assunto,
      mensagem: form.mensagem,
    }

    if (form.tipo_destinatario === 'professor') {
      payload.professor_id = form.destinatario_id
    } else if (form.tipo_destinatario === 'direcao') {
      payload.direcao_id = form.destinatario_id
    }

    const { error } = await supabase.from('mensagens').insert([payload])

    if (!error) {
      setForm({ tipo_destinatario: '', destinatario_id: '', assunto: '', mensagem: '' })
      fetchMensagens(responsavelId)
    }
  }

  return (
    <CContainer className="px-4">
      <AppBreadcrumb />

      <CCard className="my-4">
        <CCardHeader>
          <strong>Novo Contato</strong>
        </CCardHeader>
        <CCardBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Tipo de Destinatário</label>
              <select
                className="form-select"
                value={form.tipo_destinatario}
                onChange={(e) =>
                  setForm({ ...form, tipo_destinatario: e.target.value, destinatario_id: '' })
                }
                required
              >
                <option value="">Selecione</option>
                <option value="professor">Professor</option>
                <option value="direcao">Direção</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Destinatário</label>
              <select
                className="form-select"
                value={form.destinatario_id}
                onChange={(e) => setForm({ ...form, destinatario_id: e.target.value })}
                required
                disabled={!form.tipo_destinatario}
              >
                <option value="">Selecione</option>
                {form.tipo_destinatario === 'professor' &&
                  professores.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                {form.tipo_destinatario === 'direcao' &&
                  direcao.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nome}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Assunto</label>
              <input
                type="text"
                className="form-control"
                value={form.assunto}
                onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                required
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Mensagem</label>
              <textarea
                className="form-control"
                rows="3"
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                required
              />
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
            </div>
          </form>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <strong>Histórico de Mensagens</strong>
        </CCardHeader>
        <CCardBody>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Data</th>
                <th>Destinatário</th>
                <th>Assunto</th>
                <th>Mensagem</th>
                <th>Resposta</th>
              </tr>
            </thead>
            <tbody>
              {mensagens.map((msg) => (
                <tr key={msg.id}>
                  <td>{new Date(msg.data_envio).toLocaleString()}</td>
                  <td>{msg.professores?.nome || msg.equipe_administrativa?.nome}</td>
                  <td>{msg.assunto}</td>
                  <td>{msg.mensagem}</td>
                  <td>{msg.resposta || 'Aguardando resposta'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default ContatoProfessoresDirecao
