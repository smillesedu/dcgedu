import React, { useEffect, useState } from "react"
import { CContainer, CRow, CCol, CCard, CCardBody, CButton } from "@coreui/react"
import RelatorioFilters from "./RelatorioFilters"
import ResumoFinanceiro from "./ResumoFinanceiro"
import GraficosFinanceiros from "./GraficosFinanceiros"
import TabelaRegistros from "./TabelaRegistros"
import { buscarRelatorio } from "./relatorioService"
import { calcularTotais } from "./relatorioUtils"
import { exportPDF } from "./exportPDF"

const RelatorioFinanceiro = () => {
  const [filtros, setFiltros] = useState({ inicio: null, fim: null })
  const [registros, setRegistros] = useState([])
  const [totais, setTotais] = useState({})

  useEffect(() => {
    if (filtros.inicio && filtros.fim) {
      buscarRelatorio(filtros).then((dados) => {
        setRegistros(dados)
        setTotais(calcularTotais(dados))
      })
    }
  }, [filtros])

  return (
    <CContainer>
      <h3 className="mb-3">Relatório Financeiro</h3>
      <RelatorioFilters onChange={setFiltros} />

      <CRow className="mt-3">
        <CCol md={6}>
          <ResumoFinanceiro totais={totais} />
        </CCol>
        <CCol md={6}>
          <GraficosFinanceiros totais={totais} />
        </CCol>
      </CRow>

      <CCard className="mt-3">
        <CCardBody>
          <TabelaRegistros registros={registros} />
          <CButton color="primary" className="mt-3" onClick={() => exportPDF(registros, totais)}>
            Exportar PDF
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default RelatorioFinanceiro
