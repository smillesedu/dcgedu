import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import GraficoFunil from './GraficoFunil'
import GraficoOrigemLeads from './GraficoOrigemLeads'

const RelatoriosConversao = () => {
  const [dadosFunil, setDadosFunil] = useState([])
  const [dadosOrigem, setDadosOrigem] = useState([])

  useEffect(() => {
    fetchDados()
  }, [])

  const fetchDados = async () => {
    const { data, error } = await supabase.from('leads').select('*')
    if (!error && data) {
      // Agrupar por status para o funil
      const statusAgrupado = data.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1
        return acc
      }, {})
      setDadosFunil(
        Object.entries(statusAgrupado).map(([status, total]) => ({
          name: status,
          value: total
        }))
      )

      // Agrupar por origem
      const origemAgrupada = data.reduce((acc, lead) => {
        acc[lead.origem] = (acc[lead.origem] || 0) + 1
        return acc
      }, {})
      setDadosOrigem(
        Object.entries(origemAgrupada).map(([origem, total]) => ({
          name: origem,
          value: total
        }))
      )
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Relatórios de Conversão de Leads</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6}>
                <h5>Distribuição por Etapas do Funil</h5>
                <GraficoFunil data={dadosFunil} />
              </CCol>
              <CCol md={6}>
                <h5>Origem dos Leads</h5>
                <GraficoOrigemLeads data={dadosOrigem} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RelatoriosConversao
