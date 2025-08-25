import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CSpinner } from '@coreui/react'
import TaxasMulta from '../components/ParametrosFinanceiros/TaxasMulta'
import JurosMensalidade from '../components/ParametrosFinanceiros/JurosMensalidade'
import DescontosPadrao from '../components/ParametrosFinanceiros/DescontosPadrao'
import PoliticaReembolso from '../components/ParametrosFinanceiros/PoliticaReembolso'
import { getParametros } from '../services/parametrosFinanceirosService'

const ParametrosFinanceiros = () => {
  const [parametros, setParametros] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarParametros()
  }, [])

  const carregarParametros = async () => {
    setLoading(true)
    const data = await getParametros()
    setParametros(data)
    setLoading(false)
  }

  if (loading)
    return (
      <div className="text-center my-5">
        <CSpinner component="span" size="lg" />
        <p>Carregando parâmetros...</p>
      </div>
    )

  return (
    <CRow className="p-4">
      <CCol xs={12}>
        <h2 className="mb-4">Parâmetros Financeiros</h2>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Taxas de Multa</CCardHeader>
          <CCardBody>
            <TaxasMulta valor={parametros?.taxa_multa} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Juros de Mensalidade</CCardHeader>
          <CCardBody>
            <JurosMensalidade valor={parametros?.juros_mensalidade} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Descontos Padrão</CCardHeader>
          <CCardBody>
            <DescontosPadrao valor={parametros?.desconto_padrao} />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} md={6}>
        <CCard className="mb-4">
          <CCardHeader>Política de Reembolso</CCardHeader>
          <CCardBody>
            <PoliticaReembolso texto={parametros?.politica_reembolso} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ParametrosFinanceiros
