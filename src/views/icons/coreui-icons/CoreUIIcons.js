import React, { useEffect, useState, useMemo } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSelect,
  CFormLabel,
  CFormInput,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// DesempenhoAlunoResponsavel.jsx
// Página para responsáveis acompanharem desempenho dos filhos.
// Exporta componente padrão DesempenhoAlunoResponsavel, que inclui os subcomponentes
// FiltroDesempenhoAluno e GraficoDesempenho -- tudo em um arquivo para facilitar integração.

// --------------------------------------------------
// Helper: calcula média simples (ignora notas null)
const calcMedia = (notas = []) => {
  const vals = notas.map((n) => Number(n.valor)).filter((v) => !isNaN(v))
  if (!vals.length) return null
  const sum = vals.reduce((s, v) => s + v, 0)
  return +(sum / vals.length).toFixed(2)
}

// --------------------------------------------------
// Filtro: seleção do aluno e do período (ano / semestre)
const FiltroDesempenhoAluno = ({ alunos = [], onChange }) => {
  const [local, setLocal] = useState({ alunoId: '', periodo: '' })

  useEffect(() => {
    // inicializa primeiro aluno quando disponível
    if (alunos.length && !local.alunoId) {
      setLocal((p) => ({ ...p, alunoId: alunos[0].id }))
      onChange && onChange({ alunoId: alunos[0].id, periodo: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alunos])

  const handle = (e) => {
    const { name, value } = e.target
    const next = { ...local, [name]: value }
    setLocal(next)
    onChange && onChange(next)
  }

  return (
    <div className="mb-3 d-flex gap-3 flex-wrap align-items-end">
      <div>
        <CFormLabel>Selecionar aluno</CFormLabel>
        <CFormSelect name="alunoId" value={local.alunoId} onChange={handle}>
          <option value="">-- Selecione --</option>
          {alunos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nome}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div>
        <CFormLabel>Período (opcional)</CFormLabel>
        <CFormSelect name="periodo" value={local.periodo} onChange={handle}>
          <option value="">Todos</option>
          <option value="2025-1">2025 - 1º Semestre</option>
          <option value="2025-2">2025 - 2º Semestre</option>
          {/* Você pode popular dinamicamente com anos/semestres reais */}
        </CFormSelect>
      </div>

      <div>
        <CFormLabel>Pesquisar disciplina</CFormLabel>
        <CFormInput
          name="searchDisciplina"
          placeholder="Digite nome da disciplina"
          onChange={(e) => onChange && onChange({ disciplinaSearch: e.target.value })}
        />
      </div>
    </div>
  )
}

// --------------------------------------------------
// Gráfico: mostra médias por disciplina e evolução temporal
const GraficoDesempenho = ({ seriesPerDisciplina = [], historicoSeries = [] }) => {
  // seriesPerDisciplina: [{ disciplina: 'Matemática', media: 78 }, ...]
  // historicoSeries: [{ periodo: '2025-1', Matemática: 70, Portugues: 82 }, ...]

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57']

  return (
    <div>
      <CRow className="mb-4">
        <CCol md={6} style={{ minHeight: 300 }}>
          <h6>Média por disciplina</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={seriesPerDisciplina}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="disciplina" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="media" name="Média" fill="#8884d8">
                {seriesPerDisciplina.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CCol>

        <CCol md={6} style={{ minHeight: 300 }}>
          <h6>Evolução ao longo dos períodos</h6>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicoSeries} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* desenha uma line por disciplina (extraímos chaves automáticas) */}
              {historicoSeries[0] &&
                Object.keys(historicoSeries[0])
                  .filter((k) => k !== 'periodo')
                  .map((disc, idx) => (
                    <Line
                      key={disc}
                      type="monotone"
                      dataKey={disc}
                      stroke={COLORS[idx % COLORS.length]}
                      activeDot={{ r: 6 }}
                    />
                  ))}
            </LineChart>
          </ResponsiveContainer>
        </CCol>
      </CRow>

      <CRow>
        <CCol md={6}>
          <h6>Distribuição de Situação</h6>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={seriesPerDisciplina.map((s) => ({ name: s.disciplina, value: s.media }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {seriesPerDisciplina.map((_, idx) => (
                  <Cell key={`cell-pie-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CCol>

        <CCol md={6}>
          <h6>Legenda / Observações</h6>
          <ul>
            <li>Média calculada a partir das notas lançadas no período selecionado.</li>
            <li>Frequência é calculada por presença / aulas realizadas (percentual).</li>
            <li>Se alguma disciplina não tiver notas, será indicada como "Sem notas".</li>
          </ul>
        </CCol>
      </CRow>
    </div>
  )
}

// --------------------------------------------------
// Componente principal
const DesempenhoAlunoResponsavel = ({ responsavelIdProp = null }) => {
  const [responsavelId, setResponsavelId] = useState(responsavelIdProp)
  const [alunos, setAlunos] = useState([])
  const [selecionado, setSelecionado] = useState({ alunoId: '', periodo: '', disciplinaSearch: '' })

  const [notas, setNotas] = useState([]) // notas lançadas
  const [frequencias, setFrequencias] = useState([]) // registros de frequência
  const [disciplinasMeta, setDisciplinasMeta] = useState([]) // disciplinas do aluno

  // busca responsavel logado se não passado
  useEffect(() => {
    if (!responsavelId) {
      const fetchUser = async () => {
        try {
          const { data: userData } = await supabase.auth.getUser()
          const userId = userData?.user?.id
          if (userId) setResponsavelId(userId)
        } catch (e) {
          // ignore
        }
      }
      fetchUser()
    }
  }, [responsavelId])

  useEffect(() => {
    if (responsavelId) fetchAlunosDoResponsavel(responsavelId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsavelId])

  // quando selecionado.alunoId muda busca dados
  useEffect(() => {
    if (selecionado.alunoId) {
      fetchNotas(selecionado.alunoId, selecionado.periodo)
      fetchFrequencias(selecionado.alunoId, selecionado.periodo)
      fetchDisciplinasAluno(selecionado.alunoId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selecionado.alunoId, selecionado.periodo])

  const fetchAlunosDoResponsavel = async (respId) => {
    // relação responsaveis_alunos (assumida: tabela com responsavel_id, aluno_id)
    const { data, error } = await supabase
      .from('responsaveis_alunos')
      .select('aluno:alunos(id,nome)')
      .eq('responsavel_id', respId)

    if (error) {
      console.error('Erro ao buscar alunos do responsável:', error)
      return
    }
    const list = (data || []).map((r) => r.aluno).filter(Boolean)
    setAlunos(list)
    if (list.length && !selecionado.alunoId) {
      setSelecionado((s) => ({ ...s, alunoId: list[0].id }))
    }
  }

  const fetchNotas = async (alunoId, periodo = '') => {
    // notas: tabela com aluno_id, disciplina_id, valor, periodo
    let query = supabase
      .from('notas')
      .select('id,valor,disciplina:disciplinas(id,nome),periodo,created_at')
      .eq('aluno_id', alunoId)
    if (periodo) query = query.eq('periodo', periodo)
    const { data, error } = await query
    if (error) console.error('Erro notas:', error)
    else setNotas(data || [])
  }

  const fetchFrequencias = async (alunoId, periodo = '') => {
    // frequencia: tabela com aluno_id, disciplina_id, presente (boolean), data, periodo
    let query = supabase
      .from('frequencia')
      .select('id,presente,disciplina:disciplinas(id,nome),data,periodo')
      .eq('aluno_id', alunoId)
    if (periodo) query = query.eq('periodo', periodo)
    const { data, error } = await query
    if (error) console.error('Erro frequencias:', error)
    else setFrequencias(data || [])
  }

  const fetchDisciplinasAluno = async (alunoId) => {
    // tenta buscar disciplinas vinculadas ao aluno via matriculas/turmas
    const { data, error } = await supabase
      .from('matriculas')
      .select('disciplina:disciplinas(id,nome)')
      .eq('aluno_id', alunoId)
    if (error) {
      console.error('Erro disciplinas:', error)
    } else {
      const list = (data || []).map((m) => m.disciplina).filter(Boolean)
      setDisciplinasMeta(list)
    }
  }

  // Derived data: média por disciplina
  const mediasPorDisciplina = useMemo(() => {
    const grouped = {}
    notas.forEach((n) => {
      const d = n.disciplina?.nome || 'Sem disciplina'
      if (!grouped[d]) grouped[d] = []
      grouped[d].push(n)
    })
    return Object.keys(grouped).map((disc) => ({
      disciplina: disc,
      media: calcMedia(grouped[disc]) || 0,
    }))
  }, [notas])

  // Derived data: evolução por período (pivot)
  const historicoSeries = useMemo(() => {
    // agrupa por periodo
    const byPeriodo = {}
    notas.forEach((n) => {
      const periodo = n.periodo || 'Geral'
      if (!byPeriodo[periodo]) byPeriodo[periodo] = { periodo }
      const disc = n.disciplina?.nome || 'Sem disciplina'
      if (!byPeriodo[periodo][disc]) byPeriodo[periodo][disc] = []
      byPeriodo[periodo][disc].push(Number(n.valor))
    })

    const rows = Object.keys(byPeriodo)
      .sort()
      .map((p) => {
        const obj = { periodo: p }
        Object.keys(byPeriodo[p]).forEach((k) => {
          if (k === 'periodo') return
          const arr = byPeriodo[p][k]
          const avg = arr.length ? +(arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(2) : null
          obj[k] = avg
        })
        return obj
      })

    return rows
  }, [notas])

  // Derived: frequência por disciplina (percentual)
  const frequenciaPorDisciplina = useMemo(() => {
    const grouped = {}
    frequencias.forEach((f) => {
      const d = f.disciplina?.nome || 'Sem disciplina'
      if (!grouped[d]) grouped[d] = { total: 0, presenca: 0 }
      grouped[d].total += 1
      if (f.presente) grouped[d].presenca += 1
    })
    return Object.keys(grouped).map((disc) => ({
      disciplina: disc,
      percentual: grouped[disc].total
        ? Math.round((grouped[disc].presenca / grouped[disc].total) * 100)
        : 0,
    }))
  }, [frequencias])

  // Global metrics
  const mediaGeral = useMemo(() => {
    const allVals = notas.map((n) => Number(n.valor)).filter((v) => !isNaN(v))
    if (!allVals.length) return null
    return +(allVals.reduce((s, v) => s + v, 0) / allVals.length).toFixed(2)
  }, [notas])

  const frequenciaGeral = useMemo(() => {
    const total = frequencias.length
    const pres = frequencias.filter((f) => f.presente).length
    if (!total) return null
    return Math.round((pres / total) * 100)
  }, [frequencias])

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Desempenho do Aluno - Portal do Responsável</strong>
        </CCardHeader>

        <CCard className="mb-3">
          <CCardBody>
            <FiltroDesempenhoAluno
              alunos={alunos}
              onChange={(payload) => setSelecionado((s) => ({ ...s, ...payload }))}
            />

            <CRow className="mb-3">
              <CCol md={4}>
                <CCard>
                  <CCardBody>
                    <h5>Média Geral</h5>
                    <div style={{ fontSize: 28 }}>
                      {mediaGeral !== null ? `${mediaGeral}` : 'N/A'}
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol md={4}>
                <CCard>
                  <CCardBody>
                    <h5>Frequência Geral</h5>
                    <div style={{ fontSize: 28 }}>
                      {frequenciaGeral !== null ? `${frequenciaGeral}%` : 'N/A'}
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>

              <CCol md={4}>
                <CCard>
                  <CCardBody>
                    <h5>Disciplinas</h5>
                    <div>
                      {disciplinasMeta.length
                        ? disciplinasMeta.map((d) => d.nome).join(', ')
                        : 'Nenhuma inscrita'}
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <GraficoDesempenho
              seriesPerDisciplina={mediasPorDisciplina}
              historicoSeries={historicoSeries}
            />

            <CRow className="mt-4">
              <CCol>
                <h5>Detalhes por disciplina</h5>
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Disciplina</th>
                      <th>Média</th>
                      <th>Frequência</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mediasPorDisciplina.map((m) => {
                      const freq = frequenciaPorDisciplina.find(
                        (f) => f.disciplina === m.disciplina,
                      )
                      const situacao =
                        m.media >= 60 && (freq ? freq.percentual >= 75 : true)
                          ? 'Aprovado'
                          : 'Reprovado'
                      return (
                        <tr key={m.disciplina}>
                          <td>{m.disciplina}</td>
                          <td>{m.media ?? 'N/A'}</td>
                          <td>{freq ? `${freq.percentual}%` : 'N/A'}</td>
                          <td>{m.media === 0 ? 'Sem notas' : situacao}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DesempenhoAlunoResponsavel
