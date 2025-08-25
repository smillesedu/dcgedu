import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'
import supabase from '../../../supaBaseClient' 
// import jsPDF from 'jspdf'  // futuramente para gerar PDFs

const EmissaoFaturasRecibos = () => {
  const [matriculaBusca, setMatriculaBusca] = useState('')
  const [mensalidades, setMensalidades] = useState([])
  const [loading, setLoading] = useState(false)

  const buscarMensalidades = async () => {
    if (!matriculaBusca) return
    setLoading(true)

    const { data, error } = await supabase
      .from('mensalidades')
      .select(
        `
        id,
        aluno:alunos(nome, matricula),
        mes_referencia,
        ano_referencia,
        valor,
        status_pagamento,
        data_vencimento,
        data_pagamento
      `,
      )
      .eq('aluno.matricula', matriculaBusca)
      .order('ano_referencia', { ascending: false })
      .order('mes_referencia', { ascending: false })

    if (!error) setMensalidades(data || [])
    setLoading(false)
  }

  const emitirFatura = (mensalidade) => {
    // Aqui futuramente geramos PDF usando jsPDF ou PDFMake
    alert(
      `Fatura para ${mensalidade.aluno?.nome} - ${mensalidade.mes_referencia}/${mensalidade.ano_referencia}`,
    )
  }

  const emitirRecibo = (mensalidade) => {
    // Aqui futuramente geramos PDF de recibo
    alert(
      `Recibo para ${mensalidade.aluno?.nome} - ${mensalidade.mes_referencia}/${mensalidade.ano_referencia}`,
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Emissão de Faturas e Recibos</strong>
          </CCardHeader>
          <CCardBody>
            {/* Busca por matrícula */}
            <CForm
              className="mb-3"
              onSubmit={(e) => {
                e.preventDefault()
                buscarMensalidades()
              }}
            >
              <CRow>
                <CCol md={4}>
                  <CFormLabel>Matrícula do aluno</CFormLabel>
                  <CFormInput
                    value={matriculaBusca}
                    onChange={(e) => setMatriculaBusca(e.target.value)}
                    placeholder="Digite a matrícula"
                  />
                </CCol>
                <CCol md={2} className="d-flex align-items-end">
                  <CButton color="primary" onClick={buscarMensalidades}>
                    Buscar
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {loading ? (
              <div className="text-center p-4">
                <CSpinner />
              </div>
            ) : (
              <CTable bordered hover responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>Aluno</CTableHeaderCell>
                    <CTableHeaderCell>Matrícula</CTableHeaderCell>
                    <CTableHeaderCell>Mês</CTableHeaderCell>
                    <CTableHeaderCell>Ano</CTableHeaderCell>
                    <CTableHeaderCell>Valor</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Ações</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {mensalidades.length > 0 ? (
                    mensalidades.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.aluno?.nome}</CTableDataCell>
                        <CTableDataCell>{item.aluno?.matricula}</CTableDataCell>
                        <CTableDataCell>{item.mes_referencia}</CTableDataCell>
                        <CTableDataCell>{item.ano_referencia}</CTableDataCell>
                        <CTableDataCell>R$ {parseFloat(item.valor).toFixed(2)}</CTableDataCell>
                        <CTableDataCell>{item.status_pagamento}</CTableDataCell>
                        <CTableDataCell>
                          {item.status_pagamento !== 'Pago' ? (
                            <CButton size="sm" color="warning" onClick={() => emitirFatura(item)}>
                              Fatura
                            </CButton>
                          ) : (
                            <CButton size="sm" color="success" onClick={() => emitirRecibo(item)}>
                              Recibo
                            </CButton>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center">
                        Nenhum registro encontrado.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmissaoFaturasRecibos
