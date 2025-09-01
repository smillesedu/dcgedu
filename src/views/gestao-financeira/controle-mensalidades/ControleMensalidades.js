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
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalRegistrarPagamento from './ModalRegistrarPagamento'
import ModalEnviarCobranca from './ModalEnviarCobranca'

import { useFatura } from '../hooks/useFatura' 

const ControleMensalidades = () => {
  const [mensalidades, setMensalidades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPagamento, setShowPagamento] = useState(false)
  const [showCobranca, setShowCobranca] = useState(false)
  const [mensalidadeSelecionada, setMensalidadeSelecionada] = useState(null)
  const { gerarFatura, previewFatura } = useFatura()


  const [filtroNome, setFiltroNome] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  useEffect(() => {
    buscarMensalidades()
  }, [])

  const buscarMensalidades = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('financeiro') // 👈 ajusta aqui se a tabela for mesmo "financeiro"
      .select(`
        id,
        aluno_id,
        alunos ( nome ),
        mes_referencia,
        valor,
        pago,
        data_pagamento
      `)
      .order('mes_referencia', { ascending: false })

    if (!error) {
      setMensalidades(data)
    }
    setLoading(false)
  }

  const abrirPagamento = (mensalidade = null) => {
    setMensalidadeSelecionada(mensalidade)
    setShowPagamento(true)
  }

  const abrirCobranca = (mensalidade) => {
    setMensalidadeSelecionada(mensalidade)
    setShowCobranca(true)
  }

  const listaFiltrada = mensalidades.filter((m) => {
    let ok = true
    if (filtroNome) {
      ok = ok && m.alunos?.nome?.toLowerCase().includes(filtroNome.toLowerCase())
    }
    if (filtroStatus) {
      ok = ok && (filtroStatus === 'pago' ? m.pago : !m.pago)
    }
    return ok
  })

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Controle de Mensalidades e Cobranças</strong>
            <CButton color="primary" onClick={() => abrirPagamento()}>
              Novo Pagamento
            </CButton>
          </CCardHeader>
          <CCardBody>
            {/* 🔎 Filtros */}
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput
                  placeholder="Filtrar por aluno..."
                  value={filtroNome}
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                </CFormSelect>
              </CCol>
            </CRow>

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
                    {listaFiltrada.map((m, idx) => (
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
                              <CButton color="info" size="sm" onClick={() => gerarFatura(m)}>
                                📄 Gerar PDF
                              </CButton>{' '}
                              <CButton color="secondary" size="sm" onClick={() => previewFatura(m)}>
                                👁️ Pré-visualizar
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
