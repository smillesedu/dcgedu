import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
  CBadge,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ControleInadimplencia = () => {
  const [loading, setLoading] = useState(true)
  const [mesFiltro, setMesFiltro] = useState('')
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear())
  const [inadimplentes, setInadimplentes] = useState([])
  const [totalDevido, setTotalDevido] = useState(0)

  useEffect(() => {
    buscarInadimplentes()
  }, [mesFiltro, anoFiltro])

  const buscarInadimplentes = async () => {
    setLoading(true)

    let query = supabase
      .from('mensalidades')
      .select(
        `
        id,
        aluno:alunos(id, nome, matricula_id),
        mes_referencia,
        ano_referencia,
        valor,
        status_pagamento
      `,
      )
      .eq('status_pagamento', false) // pega só os que não foram pagos
      .order('ano_referencia', { ascending: false })
      .order('mes_referencia', { ascending: false })

    if (mesFiltro) query = query.eq('mes_referencia', mesFiltro)
    if (anoFiltro) query = query.eq('ano_referencia', anoFiltro)

    const { data, error } = await query

    if (!error) {
      setInadimplentes(data || [])
      setTotalDevido((data || []).reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0))
    }
    setLoading(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Controle de Inadimplência</strong>
          </CCardHeader>
          <CCardBody>
            {/* FILTROS */}
            <CForm className="mb-3">
              <CRow>
                <CCol md={4}>
                  <CFormLabel>Mês</CFormLabel>
                  <CFormSelect value={mesFiltro} onChange={(e) => setMesFiltro(e.target.value)}>
                    <option value="">Todos</option>
                    {[
                      'Janeiro',
                      'Fevereiro',
                      'Março',
                      'Abril',
                      'Maio',
                      'Junho',
                      'Julho',
                      'Agosto',
                      'Setembro',
                      'Outubro',
                      'Novembro',
                      'Dezembro',
                    ].map((mes, i) => (
                      <option key={i + 1} value={i + 1}>
                        {mes}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel>Ano</CFormLabel>
                  <CFormSelect value={anoFiltro} onChange={(e) => setAnoFiltro(e.target.value)}>
                    {Array.from({ length: 5 }).map((_, i) => {
                      const ano = new Date().getFullYear() - i
                      return (
                        <option key={ano} value={ano}>
                          {ano}
                        </option>
                      )
                    })}
                  </CFormSelect>
                </CCol>
                <CCol md={4} className="d-flex align-items-end">
                  <CButton color="primary" onClick={buscarInadimplentes}>
                    Filtrar
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {loading ? (
              <div className="text-center p-4">
                <CSpinner />
              </div>
            ) : (
              <>
                {/* TABELA */}
                <CTable bordered hover responsive>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Aluno</CTableHeaderCell>
                      <CTableHeaderCell>Matrícula</CTableHeaderCell>
                      <CTableHeaderCell>Mês</CTableHeaderCell>
                      <CTableHeaderCell>Ano</CTableHeaderCell>
                      <CTableHeaderCell>Valor</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {inadimplentes.length > 0 ? (
                      inadimplentes.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.aluno?.nome}</CTableDataCell>
                          <CTableDataCell>{item.aluno?.matricula}</CTableDataCell>
                          <CTableDataCell>{item.mes_referencia}</CTableDataCell>
                          <CTableDataCell>{item.ano_referencia}</CTableDataCell>
                          <CTableDataCell>R$ {parseFloat(item?.valor).toFixed(2)}</CTableDataCell>
                          <CTableDataCell>
                            {item.status_pagamento ? (
                              <CBadge color="success">Pago</CBadge>
                            ) : (
                              <CBadge color="danger">Pendente</CBadge>
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={6} className="text-center">
                          Nenhum registro encontrado.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>

                {/* TOTAL */}
                <div className="mt-3">
                  <strong>Total devido: </strong>R$ {totalDevido.toFixed(2)}
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ControleInadimplencia
