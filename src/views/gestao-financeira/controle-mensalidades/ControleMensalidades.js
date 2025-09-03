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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalRegistrarPagamento from './ModalRegistrarPagamento'
import ModalEnviarCobranca from './ModalEnviarCobranca'
import { useFatura } from '../hooks/useFatura'

const mesesNomes = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
}

const formatarData = (dataStr) => {
  if (!dataStr) return "-"
  const data = new Date(dataStr)
  return data.toLocaleDateString('pt-PT')
}

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
      .from('financeiro_pagamentos')
      .select(`
        id,
        aluno_id,
        alunos ( nome ),
        pagador,
        tipo,
        metodo_pagamento,
        valor_unitario,
        quantidade,
        desconto,
        total,
        ano_referencia,
        mes_referencia,
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
                  <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Aluno</CTableHeaderCell>
                      <CTableHeaderCell>Pagador</CTableHeaderCell>
                      <CTableHeaderCell>Tipo</CTableHeaderCell>
                      <CTableHeaderCell>Método</CTableHeaderCell>
                      <CTableHeaderCell>Valor Unit.</CTableHeaderCell>
                      <CTableHeaderCell>Qtd</CTableHeaderCell>
                      <CTableHeaderCell>Desconto</CTableHeaderCell>
                      <CTableHeaderCell>Total</CTableHeaderCell>
                      <CTableHeaderCell>Ano Ref.</CTableHeaderCell>
                      <CTableHeaderCell>Mês Ref.</CTableHeaderCell>
                    <CTableHeaderCell>Data Pagamento</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Ações</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {listaFiltrada.map((m, idx) => (
                    <CTableRow key={m.id}>
                      <CTableHeaderCell>{idx + 1}</CTableHeaderCell>
                      <CTableDataCell>{m.alunos?.nome}</CTableDataCell>
                      <CTableDataCell>{m.pagador || '-'}</CTableDataCell>
                      <CTableDataCell>{m.tipo || '-'}</CTableDataCell>
                      <CTableDataCell>{m.metodo_pagamento || '-'}</CTableDataCell>
                      <CTableDataCell>
                        {m.valor_unitario?.toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'AOA',
                        })}
                      </CTableDataCell>
                      <CTableDataCell>{m.quantidade}</CTableDataCell>
                      <CTableDataCell>
                        {m.desconto?.toLocaleString('pt-PT', {
                          style: 'currency',
                          currency: 'AOA',
                        })}
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>
                          {m.total?.toLocaleString('pt-PT', {
                            style: 'currency',
                            currency: 'AOA',
                          })}
                        </strong>
                      </CTableDataCell>
                      <CTableDataCell>{m.ano_referencia}</CTableDataCell>
                      <CTableDataCell>
                        {m.mes_referencia
                          ? m.mes_referencia
                            .replace(/[\[\]]/g, "")
                            .split(",")
                            .map((num) => mesesNomes[num.trim()])
                            .join(", ")
                          : "-"}
                      </CTableDataCell>
                      <CTableDataCell>{formatarData(m.data_pagamento)}</CTableDataCell>
                      <CTableDataCell>
                        {m.pago ? (
                          <CBadge color="success">Pago</CBadge>
                        ) : (
                          <CBadge color="danger">Pendente</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary" size="sm">
                            Ações
                          </CDropdownToggle>
                          <CDropdownMenu>
                            {!m.pago && (
                              <>
                                <CDropdownItem onClick={() => abrirPagamento(m)}>
                                  💰 Registrar Pagamento
                                </CDropdownItem>
                                <CDropdownItem onClick={() => abrirCobranca(m)}>
                                  📩 Enviar Cobrança
                                </CDropdownItem>
                              </>
                            )}
                            <CDropdownItem onClick={() => gerarFatura(m)}>
                              📄 Gerar PDF
                            </CDropdownItem>
                            <CDropdownItem onClick={() => previewFatura(m)}>
                              👁️ Pré-visualizar
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
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
