import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb } from '../../../components'

const SolicitacaoDocumentosMatricula = () => {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [form, setForm] = useState({
    aluno_id: '',
    tipo_solicitacao: '',
    descricao: '',
  })
  const [alunos, setAlunos] = useState([])
  const [responsavelId, setResponsavelId] = useState(null)

  useEffect(() => {
    autenticarResponsavel()
  }, [])

  const autenticarResponsavel = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Você precisa estar logado para acessar esta página.')
      return
    }

    // Busca o ID do responsável usando o auth_user_id
    const { data, error } = await supabase
      .from('responsaveis')
      .select('id')
      .eq('auth_user_id', user.id)
      .single()

    if (error || !data) {
      alert('Responsável não encontrado no sistema.')
      return
    }

    setResponsavelId(data.id)
    fetchAlunos(data.id)
    fetchSolicitacoes(data.id)
  }

  const fetchAlunos = async (respId) => {
    const { data, error } = await supabase
      .from('alunos')
      .select('id, nome')
      .eq('responsavel_id', respId)

    if (!error) setAlunos(data)
  }

  const fetchSolicitacoes = async (respId) => {
    const { data, error } = await supabase
      .from('solicitacoes')
      .select(
        `
        id,
        tipo_solicitacao,
        descricao,
        status,
        data_solicitacao,
        alunos(nome)
      `,
      )
      .eq('responsavel_id', respId)
      .order('data_solicitacao', { ascending: false })

    if (!error) setSolicitacoes(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!responsavelId) {
      alert('Responsável não autenticado.')
      return
    }

    const { error } = await supabase
      .from('solicitacoes')
      .insert([{ ...form, responsavel_id: responsavelId }])

    if (!error) {
      setForm({ aluno_id: '', tipo_solicitacao: '', descricao: '' })
      fetchSolicitacoes(responsavelId)
    }
  }

  return (
    <CContainer className="px-4">
      <CCard className="my-4">
        <CCardHeader>
          <strong>Solicitar Documento ou Matrícula</strong>
        </CCardHeader>
        <CCardBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Aluno</label>
              <select
                className="form-select"
                value={form.aluno_id}
                onChange={(e) => setForm({ ...form, aluno_id: e.target.value })}
                required
              >
                <option value="">Selecione</option>
                {alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Tipo de Solicitação</label>
              <select
                className="form-select"
                value={form.tipo_solicitacao}
                onChange={(e) => setForm({ ...form, tipo_solicitacao: e.target.value })}
                required
              >
                <option value="">Selecione</option>
                <option value="documento">Documento</option>
                <option value="matricula">Matrícula</option>
                <option value="rematricula">Rematrícula</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                rows="3"
              />
            </div>

            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Enviar Solicitação
              </button>
            </div>
          </form>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <strong>Minhas Solicitações</strong>
        </CCardHeader>
        <CCardBody>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Data</th>
                <th>Aluno</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {solicitacoes.map((sol) => (
                <tr key={sol.id}>
                  <td>{new Date(sol.data_solicitacao).toLocaleDateString()}</td>
                  <td>{sol.alunos?.nome || '-'}</td>
                  <td>{sol.tipo_solicitacao}</td>
                  <td>{sol.descricao}</td>
                  <td>{sol.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default SolicitacaoDocumentosMatricula
