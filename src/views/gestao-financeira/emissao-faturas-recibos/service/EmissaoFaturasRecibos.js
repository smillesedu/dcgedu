import React, { useState } from 'react'
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
import supabase from '../../../../supaBaseClient' 
import jsPDF from 'jspdf'

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

  const gerarPDF = (mensalidade, tipo) => {
    const doc = new jsPDF()

    // Logo (coloque o caminho ou base64 da sua logo)
    const logoBase64 = '' // Aqui pode inserir um base64 da logo
    if (logoBase64) doc.addImage(logoBase64, 'PNG', 15, 10, 30, 30)

    // Cabeçalho
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text(`INSTITUIÇÃO EDUCACIONAL - ${tipo === 'Fatura' ? 'FATURA' : 'RECIBO'}`, 50, 20)

    doc.setFontSize(10)
    doc.text(`Documento Nº: ${mensalidade.id}`, 50, 26)
    doc.text(`Data de Emissão: ${new Date().toLocaleDateString()}`, 50, 31)

    // Linha separadora
    doc.line(15, 35, 195, 35)

    // Dados do aluno
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(`Aluno: ${mensalidade.aluno?.nome}`, 15, 45)
    doc.text(`Matrícula: ${mensalidade.aluno?.matricula}`, 15, 52)

    // Dados da mensalidade
    doc.text(`Referência: ${mensalidade.mes_referencia}/${mensalidade.ano_referencia}`, 15, 62)
    doc.text(`Valor: R$ ${parseFloat(mensalidade.valor).toFixed(2)}`, 15, 69)
    doc.text(`Vencimento: ${mensalidade.data_vencimento || '-'}`, 15, 76)

    if (tipo === 'Recibo') {
      doc.text(`Data de Pagamento: ${mensalidade.data_pagamento || '-'}`, 15, 83)
    }

    // Mensagem
    doc.setFontSize(10)
    doc.text(
      tipo === 'Fatura'
        ? 'Por favor, efetue o pagamento até a data de vencimento para evitar encargos adicionais.'
        : 'Este recibo comprova o pagamento integral da mensalidade.',
      15,
      tipo === 'Fatura' ? 90 : 97,
      { maxWidth: 180 },
    )

    // Rodapé com assinatura
    doc.line(15, 250, 80, 250)
    doc.text('Assinatura do Responsável', 20, 255)
    doc.setFontSize(8)
    doc.text('Documento gerado automaticamente pelo sistema.', 105, 285, { align: 'center' })

    // Salvar
    doc.save(
      `${tipo}_${mensalidade.aluno?.matricula}_${mensalidade.mes_referencia}_${mensalidade.ano_referencia}.pdf`,
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
                            <CButton
                              size="sm"
                              color="warning"
                              onClick={() => gerarPDF(item, 'Fatura')}
                            >
                              Fatura
                            </CButton>
                          ) : (
                            <CButton
                              size="sm"
                              color="success"
                              onClick={() => gerarPDF(item, 'Recibo')}
                            >
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
