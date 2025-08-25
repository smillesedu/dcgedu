import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CProgress } from '@coreui/react'
import supabase from '../../supaBaseClient'

const DashboardRH = () => {
  const [kpis, setKpis] = useState({ ativos: 0, afastados: 0, desligados: 0, total: 0 })
  const [porDepto, setPorDepto] = useState([])

  useEffect(() => {
    fetchKPIs()
    fetchPorDepto()
  }, [])

  const fetchKPIs = async () => {
    const { count: total } = await supabase
      .from('funcionarios')
      .select('*', { count: 'exact', head: true })
    const { count: ativos } = await supabase
      .from('funcionarios')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ativo')
    const { count: afastados } = await supabase
      .from('funcionarios')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'afastado')
    const { count: desligados } = await supabase
      .from('funcionarios')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'desligado')
    setKpis({
      total: total || 0,
      ativos: ativos || 0,
      afastados: afastados || 0,
      desligados: desligados || 0,
    })
  }

  const fetchPorDepto = async () => {
    const { data, error } = await supabase.rpc('count_func_by_depto') // opcional: crie uma RPC; abaixo dou alternativa sem RPC
    if (!error && data) setPorDepto(data)
    else {
      // fallback: join no client (simples e suficiente pra agora)
      const { data: deps } = await supabase.from('departamentos').select('id, nome')
      const { data: funcs } = await supabase.from('funcionarios').select('id, departamento_id')
      const agg = deps.map((d) => ({
        departamento: d.nome,
        total: funcs.filter((f) => f.departamento_id === d.id).length,
      }))
      setPorDepto(agg)
    }
  }

  const taxaAtivos = kpis.total ? Math.round((kpis.ativos / kpis.total) * 100) : 0

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-3">
          <CCardHeader>
            <strong>Dashboard de RH</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="g-3">
              <CCol md={3}>
                <Kpi label="Total" value={kpis.total} />
              </CCol>
              <CCol md={3}>
                <Kpi label="Ativos" value={kpis.ativos} />
              </CCol>
              <CCol md={3}>
                <Kpi label="Afastados" value={kpis.afastados} />
              </CCol>
              <CCol md={3}>
                <Kpi label="Desligados" value={kpis.desligados} />
              </CCol>
            </CRow>

            <div className="mt-4">
              <h6 className="mb-2">Taxa de Ativos</h6>
              <CProgress thin value={taxaAtivos} color="success" />
              <small>{taxaAtivos}%</small>
            </div>

            <div className="mt-4">
              <h6 className="mb-2">Funcionários por Departamento</h6>
              <ul className="list-group">
                {porDepto.map((d, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <span>{d.departamento}</span>
                    <span className="badge bg-primary">{d.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const Kpi = ({ label, value }) => (
  <div className="border rounded p-3 text-center">
    <div className="small text-muted">{label}</div>
    <div className="fs-4 fw-bold">{value}</div>
  </div>
)

export default DashboardRH
