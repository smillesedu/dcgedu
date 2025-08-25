import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
  CRow,
  CCol,
  CSpinner,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalRegistrarPagamento from './ModalRegistrarPagamento'
import ModalEnviarCobranca from './ModalEnviarCobranca'

const ControleMensalidades = () => {
  const [mensalidades, setMensalidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPagamento, setShowPagamento] = useState(false)
  const [showCobranca, setShowCobranca] = useState(false)
  const [mensalidadeSelecionada, setMensalidadeSelecionada] = useState(null)

  useEffect(() => {
    buscarMensalidades()
  }, [])

  const buscarMensalidades = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('financeiro_mensalidades')
      .select(
        `
        id,
        aluno_id,
        alunos ( nome ),
        mes_referencia,
        valor,
        pago,
        data_pagamento
      `,
      )
      .order('mes_referencia', { ascending: false })

    if (!error) {
      setMensalidades(data)
    }
    setLoading(false)
  }

  const abrirPagamento = (mensalidade) => {
    setMensalidadeSelecionada(mensalidade)
    setShowPagamento(true)
  }

  const abrirCobranca = (mensalidade) => {
    setMensalidadeSelecionada(mensalidade)
    setShowCobranca(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Controle de Mensalidades e Cobranças</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center p-4">
                <CSpinner />
              </div>
            ) : (
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Aluno</CTableHeaderCell>
                    <CTableHeaderCell>Mês Ref.</CTableHeaderCell>
                    <CTableHeaderCell>Valor</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Data Pagamento</CTableHeaderCell>
                    <CTableHeaderCell>Ações</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {mensalidades.map((m, idx) => (
                    <CTableRow key={m.id}>
                      <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
                      <CTableDataCell>{m.alunos?.nome}</CTableDataCell>
                      <CTableDataCell>{m.mes_referencia}</CTableDataCell>
                      <CTableDataCell>R$ {m.valor.toFixed(2)}</CTableDataCell>
                      <CTableDataCell>
                        {m.pago ? (
                          <CBadge color="success">Pago</CBadge>
                        ) : (
                          <CBadge color="danger">Pendente</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{m.data_pagamento || '-'}</CTableDataCell>
                      <CTableDataCell>
                        {!m.pago && (
                          <>
                            <CButton color="success" size="sm" onClick={() => abrirPagamento(m)}>
                              Registrar Pagamento
                            </CButton>{' '}
                            <CButton color="warning" size="sm" onClick={() => abrirCobranca(m)}>
                              Enviar Cobrança
                            </CButton>
                          </>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modais */}
      {showPagamento && (
        <ModalRegistrarPagamento
          show={showPagamento}
          setShow={setShowPagamento}
          mensalidade={mensalidadeSelecionada}
          atualizar={buscarMensalidades}
        />
      )}
      {showCobranca && (
        <ModalEnviarCobranca
          show={showCobranca}
          setShow={setShowCobranca}
          mensalidade={mensalidadeSelecionada}
        />
      )}
    </CRow>
  )
}

export default ControleMensalidades
