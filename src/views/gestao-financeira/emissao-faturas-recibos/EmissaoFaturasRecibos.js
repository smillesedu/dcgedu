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
  CBadge,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../../supaBaseClient'

const EmissaoFaturasRecibos = () => {
  const [matriculaBusca, setMatriculaBusca] = useState('')
  const [mensalidades, setMensalidades] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const buscarMensalidades = async () => {
    if (!matriculaBusca) return
    setLoading(true)

    const { data, error } = await supabase
      .from('financeiro_pagamentos')
      .select(
        `
        id,
        aluno:alunos(nome, matricula),
        mes_referencia,
        ano_referencia,
        valor_unitario,
        pago,
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
    alert(
      `Fatura para ${mensalidade.aluno?.nome} - ${mensalidade.mes_referencia}/${mensalidade.ano_referencia}`,
    )
  }

  const emitirRecibo = (mensalidade) => {
    alert(
      `Recibo para ${mensalidade.aluno?.nome} - ${mensalidade.mes_referencia}/${mensalidade.ano_referencia}`,
    )
  }

  const irParaPagamento = (mensalidade) => {
    // Redireciona e envia estado para abrir a modal do pagamento
    navigate('/gestao-financeira/controle-mensalidades', {
      state: { abrirPagamento: true, mensalidadeId: mensalidade.id },
    })
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
                        <CTableDataCell>
                          R$ {parseFloat(item.valor_unitario).toFixed(2)}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.pago ? (
                            <CBadge color="success">Pago</CBadge>
                          ) : (
                            <CBadge color="danger">Pendente</CBadge>
                          )}
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.pago ? (
                            <>
                              <CButton
                                size="sm"
                                color="info"
                                className="me-2"
                                onClick={() => emitirFatura(item)}
                              >
                                Fatura
                              </CButton>
                              <CButton
                                size="sm"
                                color="success"
                                onClick={() => emitirRecibo(item)}
                              >
                                Recibo
                              </CButton>
                            </>
                          ) : (
                            <CButton
                              size="sm"
                              color="warning"
                              onClick={() => irParaPagamento(item)}
                            >
                              Pagar
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
