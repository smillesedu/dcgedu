import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CForm,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

/**
 * PortalProfessor.jsx
 *
 * Props:
 *  - professorId (optional) : id do professor para carregar o portal; se não informado, tenta obter via supabase.auth
 *
 * Notas:
 *  - As tabelas assumidas: professores, turmas, disciplinas, aulas, notas, frequencia, materiais, mensagens
 *  - Ajuste nomes de colunas/tabelas conforme seu schema.
 */

const PortalProfessor = ({ professorId: propProfessorId }) => {
  const [activeTab, setActiveTab] = useState('resumo')
  const [loading, setLoading] = useState(false)

  const [professorId, setProfessorId] = useState(propProfessorId || null)
  const [professor, setProfessor] = useState(null)
  const [disciplinas, setDisciplinas] = useState([])
  const [turmas, setTurmas] = useState([])

  const [aulasProximas, setAulasProximas] = useState([])
  const [notas, setNotas] = useState([])
  const [frequencias, setFrequencias] = useState([])
  const [materiais, setMateriais] = useState([])
  const [mensagens, setMensagens] = useState([])

  // modais / formulario states
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmPayload, setConfirmPayload] = useState(null)

  const [notaForm, setNotaForm] = useState({
    turma_id: '',
    disciplina_id: '',
    aluno_id: '',
    valor: '',
    descricao: '',
  })
  const [freqForm, setFreqForm] = useState({
    aula_id: '',
    aluno_id: '',
    presente: false,
    observacao: '',
  })
  const [materialForm, setMaterialForm] = useState({
    turma_id: '',
    disciplina_id: '',
    titulo: '',
    arquivos: [],
  })
  const [mensagemForm, setMensagemForm] = useState({
    turma_id: '',
    titulo: '',
    corpo: '',
  })

  // tenta identificar professor atual se não for passado por props
  useEffect(() => {
    if (propProfessorId) {
      setProfessorId(propProfessorId)
      return
    }
    const tryGetUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        // se você guarda o id do professor no perfil do usuário, adapte aqui:
        if (user?.id) {
          // exemplo: buscar professor pelo auth_id (se tiver essa coluna)
          const { data } = await supabase
            .from('professores')
            .select('id')
            .eq('auth_id', user.id)
            .single()
          if (data?.id) setProfessorId(data.id)
        }
      } catch (err) {
        console.warn('Não foi possível obter usuário autenticado automaticamente.', err)
      }
    }
    tryGetUser()
  }, [propProfessorId])

  useEffect(() => {
    if (!professorId) return
    loadAll()
  }, [professorId])

  const loadAll = async () => {
    setLoading(true)
    await Promise.all([
      fetchProfessor(),
      fetchAulasProximas(),
      fetchDisciplinasETurmas(),
      fetchNotas(),
      fetchFrequencias(),
      fetchMateriais(),
      fetchMensagens(),
    ])
    setLoading(false)
  }

  const fetchProfessor = async () => {
    if (!professorId) return
    const { data, error } = await supabase
      .from('professores')
      .select('id, nome, email, telefone, unidade:unidades(nome)')
      .eq('id', professorId)
      .single()
    if (error) {
      console.error('Erro ao buscar professor', error)
      return
    }
    setProfessor(data)
  }

  const fetchDisciplinasETurmas = async () => {
    if (!professorId) return
    // disciplinas atribuídas e turmas do professor
    const { data: atribs, error } = await supabase
      .from('atribuicoes') // tabela hipotética: atribuicoes(professor_id, disciplina_id, turma_id)
      .select(
        `
        disciplina:disciplinas(id, nome),
        turma:turmas(id, nome)
      `,
      )
      .eq('professor_id', professorId)

    if (!error) {
      const disc = []
      const trms = []
      atribs.forEach((a) => {
        if (a.disciplina && !disc.find((d) => d.id === a.disciplina.id)) disc.push(a.disciplina)
        if (a.turma && !trms.find((t) => t.id === a.turma.id)) trms.push(a.turma)
      })
      setDisciplinas(disc)
      setTurmas(trms)
    } else {
      console.error('Erro ao buscar disciplinas/turmas', error)
    }
  }

  const fetchAulasProximas = async () => {
    if (!professorId) return
    // aulas com data futura (hoje em diante), limit 10
    const hoje = new Date().toISOString().slice(0, 10)
    const { data, error } = await supabase
      .from('aulas')
      .select(
        `
        id,
        data,
        hora_inicio,
        hora_fim,
        turma:turmas(id, nome),
        disciplina:disciplinas(id, nome),
        sala
      `,
      )
      .eq('professor_id', professorId)
      .gte('data', hoje)
      .order('data', { ascending: true })
      .limit(10)

    if (!error) setAulasProximas(data || [])
    else console.error('Erro ao buscar aulas', error)
  }

  const fetchNotas = async () => {
    if (!professorId) return
    // notas lançadas por esse professor (ou nas turmas dele)
    const { data, error } = await supabase
      .from('notas')
      .select(
        `
        id,
        valor,
        descricao,
        criado_em,
        aluno:alunos(id, nome),
        turma:turmas(id, nome),
        disciplina:disciplinas(id, nome)
      `,
      )
      .eq('professor_id', professorId)
      .order('criado_em', { ascending: false })
      .limit(50)

    if (!error) setNotas(data || [])
    else console.error('Erro ao buscar notas', error)
  }

  const fetchFrequencias = async () => {
    if (!professorId) return
    const { data, error } = await supabase
      .from('frequencia')
      .select(
        `
        id,
        data,
        presente,
        observacao,
        aluno:alunos(id, nome),
        aula:aulas(id, data, hora_inicio),
        turma:turmas(id, nome)
      `,
      )
      .eq('professor_id', professorId)
      .order('data', { ascending: false })
      .limit(100)
    if (!error) setFrequencias(data || [])
    else console.error('Erro ao buscar frequências', error)
  }

  const fetchMateriais = async () => {
    if (!professorId) return
    const { data, error } = await supabase
      .from('materiais')
      .select(
        `
        id,
        titulo,
        caminho,
        criado_em,
        turma:turmas(id, nome),
        disciplina:disciplinas(id, nome)
      `,
      )
      .eq('professor_id', professorId)
      .order('criado_em', { ascending: false })
      .limit(100)

    if (!error) setMateriais(data || [])
    else console.error('Erro ao buscar materiais', error)
  }

  const fetchMensagens = async () => {
    if (!professorId) return
    const { data, error } = await supabase
      .from('mensagens')
      .select(
        `
        id,
        titulo,
        corpo,
        created_at,
        turma:turmas(id, nome)
      `,
      )
      .eq('remetente_id', professorId)
      .order('created_at', { ascending: false })
      .limit(100)

    if (!error) setMensagens(data || [])
    else console.error('Erro ao buscar mensagens', error)
  }

  /* ----------------------
     Handlers: notas, frequência, materiais, mensagens
     ---------------------- */

  const handleOpenNotaModal = (prefill = {}) => {
    setNotaForm({
      turma_id: prefill.turma_id || '',
      disciplina_id: prefill.disciplina_id || '',
      aluno_id: prefill.aluno_id || '',
      valor: '',
      descricao: '',
    })
    // abrir modal pelo id: modal sempre montado no DOM
    const modal = new bootstrap.Modal(document.getElementById('modalAddNota'))
    modal.show()
  }

  const handleSaveNota = async (e) => {
    e.preventDefault()
    if (!professorId) return alert('Professor não identificado')

    const payload = {
      professor_id: professorId,
      aluno_id: notaForm.aluno_id || null,
      turma_id: notaForm.turma_id || null,
      disciplina_id: notaForm.disciplina_id || null,
      valor: notaForm.valor,
      descricao: notaForm.descricao || null,
    }

    const { error } = await supabase.from('notas').insert([payload])
    if (error) {
      console.error('Erro ao salvar nota', error)
      alert('Erro ao salvar nota')
    } else {
      fetchNotas()
      const m = bootstrap.Modal.getInstance(document.getElementById('modalAddNota'))
      m.hide()
    }
  }

  const handleOpenFreqModal = (prefill = {}) => {
    setFreqForm({
      aula_id: prefill.aula_id || '',
      aluno_id: prefill.aluno_id || '',
      presente: prefill.presente || false,
      observacao: prefill.observacao || '',
    })
    const modal = new bootstrap.Modal(document.getElementById('modalAddFreq'))
    modal.show()
  }

  const handleSaveFreq = async (e) => {
    e.preventDefault()
    if (!professorId) return
    const payload = {
      professor_id: professorId,
      aula_id: freqForm.aula_id || null,
      aluno_id: freqForm.aluno_id || null,
      presente: freqForm.presente,
      observacao: freqForm.observacao || null,
      data: new Date().toISOString().slice(0, 10),
    }
    const { error } = await supabase.from('frequencia').insert([payload])
    if (error) {
      console.error('Erro ao salvar frequência', error)
      alert('Erro ao salvar frequência')
    } else {
      fetchFrequencias()
      const m = bootstrap.Modal.getInstance(document.getElementById('modalAddFreq'))
      m.hide()
    }
  }

  const handleUploadMateriais = async (e) => {
    e.preventDefault()
    if (!professorId) return
    if (!materialForm.turma_id || !materialForm.titulo) {
      return alert('Preencha turma e título')
    }
    if (!materialForm.arquivos || materialForm.arquivos.length === 0) {
      return alert('Selecione ao menos um arquivo')
    }

    for (const file of materialForm.arquivos) {
      const ext = file.name.split('.').pop()
      const allowed = ['pdf', 'docx', 'pptx', 'zip', 'jpg', 'png', 'txt']
      if (!allowed.includes(ext.toLowerCase())) {
        alert(`Formato não suportado: ${file.name}`)
        continue
      }
      const path = `materiais/${professorId}/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from('materiais').upload(path, file)
      if (uploadError) {
        console.error('Erro upload', uploadError)
        continue
      }

      // salvar registro
      const { error } = await supabase.from('materiais').insert([
        {
          professor_id: professorId,
          turma_id: materialForm.turma_id,
          disciplina_id: materialForm.disciplina_id || null,
          titulo: materialForm.titulo,
          caminho: path,
        },
      ])
      if (error) console.error('Erro ao salvar material', error)
    }

    fetchMateriais()
    const m = bootstrap.Modal.getInstance(document.getElementById('modalUploadMaterial'))
    m.hide()
  }

  const handleSendMensagem = async (e) => {
    e.preventDefault()
    if (!professorId) return
    if (!mensagemForm.turma_id || !mensagemForm.titulo) {
      return alert('Preencha turma e título')
    }
    const { error } = await supabase.from('mensagens').insert([
      {
        remetente_id: professorId,
        turma_id: mensagemForm.turma_id,
        titulo: mensagemForm.titulo,
        corpo: mensagemForm.corpo,
      },
    ])
    if (error) console.error('Erro ao enviar mensagem', error)
    else {
      fetchMensagens()
      const m = bootstrap.Modal.getInstance(document.getElementById('modalSendMensagem'))
      m.hide()
    }
  }

  /* Util: retorna URL pública do material (se estiver usando bucket privado, você pode gerar signedUrl) */
  const getPublicUrl = (path) => {
    if (!path) return null
    const { data } = supabase.storage.from('materiais').getPublicUrl(path)
    return data?.publicUrl || '#'
  }

  /* Render */
  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Portal do Professor</strong>
          <div className="small text-muted">Área pessoal do docente</div>
        </CCardHeader>

        <CCard className="mb-3">
          <CCardBody>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink active={activeTab === 'resumo'} onClick={() => setActiveTab('resumo')}>
                  Resumo
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 'agenda'} onClick={() => setActiveTab('agenda')}>
                  Agenda
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 'notas'} onClick={() => setActiveTab('notas')}>
                  Notas & Frequência
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === 'materiais'}
                  onClick={() => setActiveTab('materiais')}
                >
                  Materiais
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={activeTab === 'mensagens'}
                  onClick={() => setActiveTab('mensagens')}
                >
                  Mensagens
                </CNavLink>
              </CNavItem>
            </CNav>

            <CTabContent>
              <CTabPane visible={activeTab === 'resumo'}>
                <CRow className="mt-3">
                  <CCol md={6}>
                    <CCard>
                      <CCardBody>
                        <h5>Dados Pessoais</h5>
                        <p>
                          <strong>Nome:</strong> {professor?.nome || '-'}
                          <br />
                          <strong>Email:</strong> {professor?.email || '-'}
                          <br />
                          <strong>Telefone:</strong> {professor?.telefone || '-'}
                          <br />
                          <strong>Unidade:</strong> {professor?.unidade?.nome || '-'}
                        </p>
                      </CCardBody>
                    </CCard>
                  </CCol>

                  <CCol md={6}>
                    <CCard>
                      <CCardBody>
                        <h5>Disciplinas & Turmas</h5>
                        <p>
                          <strong>Disciplinas:</strong>
                          <ul>
                            {disciplinas.length === 0 && <li>Nenhuma disciplina atribuída</li>}
                            {disciplinas.map((d) => (
                              <li key={d.id}>{d.nome}</li>
                            ))}
                          </ul>
                          <strong>Turmas:</strong>
                          <ul>
                            {turmas.length === 0 && <li>Nenhuma turma atribuída</li>}
                            {turmas.map((t) => (
                              <li key={t.id}>{t.nome}</li>
                            ))}
                          </ul>
                        </p>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CTabPane>

              <CTabPane visible={activeTab === 'agenda'}>
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-2">
                    <h5>Próximas Aulas</h5>
                    <div>
                      <button className="btn btn-primary me-2" onClick={() => fetchAulasProximas()}>
                        Atualizar
                      </button>
                    </div>
                  </div>
                  {aulasProximas.length === 0 && <div>Nenhuma aula programada</div>}
                  {aulasProximas.map((a) => (
                    <CCard className="mb-2" key={a.id}>
                      <CCardBody>
                        <strong>
                          {a.data} {a.hora_inicio} - {a.hora_fim}
                        </strong>
                        <div>
                          <small>
                            {a.turma?.nome} — {a.disciplina?.nome}{' '}
                            {a.sala ? ` — Sala: ${a.sala}` : ''}
                          </small>
                        </div>
                        <div className="mt-2">
                          <button
                            className="btn btn-sm btn-outline-success me-2"
                            onClick={() => handleOpenFreqModal({ aula_id: a.id })}
                          >
                            Marcar Frequência
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              handleOpenNotaModal({
                                turma_id: a.turma?.id,
                                disciplina_id: a.disciplina?.id,
                              })
                            }
                          >
                            Lançar Nota
                          </button>
                        </div>
                      </CCardBody>
                    </CCard>
                  ))}
                </div>
              </CTabPane>

              <CTabPane visible={activeTab === 'notas'}>
                <div className="mt-3 d-flex justify-content-between">
                  <h5>Notas lançadas</h5>
                  <div>
                    <button className="btn btn-primary me-2" onClick={() => handleOpenNotaModal()}>
                      Nova Nota
                    </button>
                    <button className="btn btn-secondary" onClick={() => fetchNotas()}>
                      Atualizar
                    </button>
                  </div>
                </div>

                <PaginationWrapper data={notas} itemsPerPage={8}>
                  {(paginaAtual) => (
                    <table className="table table-bordered table-striped mt-2">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>Aluno</th>
                          <th>Turma</th>
                          <th>Disciplina</th>
                          <th>Valor</th>
                          <th>Descrição</th>
                          <th>Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginaAtual.map((n) => (
                          <tr key={n.id}>
                            <td>{n.id}</td>
                            <td>{n.aluno?.nome}</td>
                            <td>{n.turma?.nome}</td>
                            <td>{n.disciplina?.nome}</td>
                            <td>{n.valor}</td>
                            <td>{n.descricao}</td>
                            <td>{new Date(n.criado_em).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </PaginationWrapper>

                <div className="mt-3">
                  <h6>Frequências recentes</h6>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Aluno</th>
                        <th>Aula</th>
                        <th>Presente</th>
                        <th>Observação</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frequencias.map((f) => (
                        <tr key={f.id}>
                          <td>{f.id}</td>
                          <td>{f.aluno?.nome}</td>
                          <td>
                            {f.aula?.data} {f.aula?.hora_inicio}
                          </td>
                          <td>{f.presente ? 'Sim' : 'Não'}</td>
                          <td>{f.observacao}</td>
                          <td>{f.data}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CTabPane>

              <CTabPane visible={activeTab === 'materiais'}>
                <div className="mt-3 d-flex justify-content-between">
                  <h5>Materiais do Professor</h5>
                  <div>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalUploadMaterial"
                    >
                      Enviar Material
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => fetchMateriais()}>
                      Atualizar
                    </button>
                  </div>
                </div>

                {materiais.length === 0 && <div className="mt-2">Nenhum material publicado</div>}
                <table className="table table-striped mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Turma</th>
                      <th>Disciplina</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materiais.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.titulo}</td>
                        <td>{m.turma?.nome}</td>
                        <td>{m.disciplina?.nome}</td>
                        <td>{new Date(m.criado_em).toLocaleString()}</td>
                        <td>
                          <a
                            className="btn btn-sm btn-outline-primary"
                            href={getPublicUrl(m.caminho)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Abrir
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CTabPane>

              <CTabPane visible={activeTab === 'mensagens'}>
                <div className="mt-3 d-flex justify-content-between">
                  <h5>Mensagens enviadas</h5>
                  <div>
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSendMensagem"
                    >
                      Nova Mensagem
                    </button>
                    <button className="btn btn-secondary ms-2" onClick={() => fetchMensagens()}>
                      Atualizar
                    </button>
                  </div>
                </div>

                <table className="table table-striped mt-2">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Turma</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mensagens.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.titulo}</td>
                        <td>{m.turma?.nome}</td>
                        <td>{new Date(m.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CTabPane>
            </CTabContent>
          </CCardBody>
        </CCard>

        {/* ---------- Modais: Nota, Frequencia, Upload Material, Mensagem ---------- */}

        <div className="modal fade" id="modalAddNota" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={handleSaveNota}>
              <div className="modal-header">
                <h5 className="modal-title">Lançar Nota</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body row g-3">
                <div className="col-md-6">
                  <label className="form-label">Turma</label>
                  <select
                    className="form-control"
                    value={notaForm.turma_id}
                    onChange={(e) => setNotaForm({ ...notaForm, turma_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {turmas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Disciplina</label>
                  <select
                    className="form-control"
                    value={notaForm.disciplina_id}
                    onChange={(e) => setNotaForm({ ...notaForm, disciplina_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {disciplinas.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Aluno (opcional)</label>
                  <input
                    className="form-control"
                    value={notaForm.aluno_id}
                    onChange={(e) => setNotaForm({ ...notaForm, aluno_id: e.target.value })}
                    placeholder="Id do aluno (ou deixe em branco para aplicar a turma inteira)"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={notaForm.valor}
                    onChange={(e) => setNotaForm({ ...notaForm, valor: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Descrição</label>
                  <input
                    className="form-control"
                    value={notaForm.descricao}
                    onChange={(e) => setNotaForm({ ...notaForm, descricao: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal" type="button">
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="modal fade" id="modalAddFreq" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={handleSaveFreq}>
              <div className="modal-header">
                <h5 className="modal-title">Registrar Frequência</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body row g-3">
                <div className="col-md-6">
                  <label className="form-label">Aula</label>
                  <select
                    className="form-control"
                    value={freqForm.aula_id}
                    onChange={(e) => setFreqForm({ ...freqForm, aula_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {aulasProximas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.data} — {a.turma?.nome} — {a.disciplina?.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Aluno (id)</label>
                  <input
                    className="form-control"
                    value={freqForm.aluno_id}
                    onChange={(e) => setFreqForm({ ...freqForm, aluno_id: e.target.value })}
                    placeholder="Id do aluno"
                  />
                </div>
                <div className="col-md-2 d-flex align-items-center">
                  <div className="form-check mt-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={freqForm.presente}
                      onChange={(e) => setFreqForm({ ...freqForm, presente: e.target.checked })}
                    />
                    <label className="form-check-label">Presente</label>
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Observação</label>
                  <input
                    className="form-control"
                    value={freqForm.observacao}
                    onChange={(e) => setFreqForm({ ...freqForm, observacao: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal" type="button">
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="modal fade" id="modalUploadMaterial" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleUploadMateriais}>
              <div className="modal-header">
                <h5 className="modal-title">Enviar Material</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Turma</label>
                  <select
                    className="form-control"
                    value={materialForm.turma_id}
                    onChange={(e) => setMaterialForm({ ...materialForm, turma_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {turmas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Disciplina (opcional)</label>
                  <select
                    className="form-control"
                    value={materialForm.disciplina_id}
                    onChange={(e) =>
                      setMaterialForm({ ...materialForm, disciplina_id: e.target.value })
                    }
                  >
                    <option value="">Nenhuma</option>
                    {disciplinas.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    className="form-control"
                    value={materialForm.titulo}
                    onChange={(e) => setMaterialForm({ ...materialForm, titulo: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Arquivos (múltiplos)</label>
                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={(e) =>
                      setMaterialForm({ ...materialForm, arquivos: Array.from(e.target.files) })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal" type="button">
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="modal fade" id="modalSendMensagem" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSendMensagem}>
              <div className="modal-header">
                <h5 className="modal-title">Nova Mensagem</h5>
                <button className="btn-close" type="button" data-bs-dismiss="modal" />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Turma</label>
                  <select
                    className="form-control"
                    value={mensagemForm.turma_id}
                    onChange={(e) => setMensagemForm({ ...mensagemForm, turma_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione</option>
                    {turmas.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    className="form-control"
                    value={mensagemForm.titulo}
                    onChange={(e) => setMensagemForm({ ...mensagemForm, titulo: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Corpo</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    value={mensagemForm.corpo}
                    onChange={(e) => setMensagemForm({ ...mensagemForm, corpo: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal" type="button">
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>

        <ModalConfirmacao
          show={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            // caso queira ações de confirmação centralizadas
            setShowConfirm(false)
          }}
          title={confirmPayload?.title || 'Confirmar'}
          message={confirmPayload?.message || 'Deseja confirmar?'}
        />
      </CCol>
    </CRow>
  )
}

export default PortalProfessor
