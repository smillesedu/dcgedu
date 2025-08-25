import React, { useState, useRef } from 'react'
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
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import supabase from '../../../supaBaseClient' 
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'

const RelatorioFinanceiro = () => {
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [registros, setRegistros] = useState([])
  const [loading, setLoading] = useState(false)
  const [resumo, setResumo] = useState({ totalRecebido: 0, totalPendente: 0, inadimplencia: 0 })

  const pizzaRef = useRef(null)
  const barraRef = useRef(null)

  const COLORS = ['#4caf50', '#f44336']

  const buscarRelatorio = async () => {
    if (!dataInicio || !dataFim) return alert('Selecione o período.')
    setLoading(true)

    const { data, error } = await supabase
      .from('mensalidades')
      .select(
        `
        id,
        aluno:alunos(nome, matricula),
        valor,
        status_pagamento,
        data_pagamento,
        data_vencimento
      `,
      )
      .gte('data_vencimento', dataInicio)
      .lte('data_vencimento', dataFim)
      .order('data_vencimento', { ascending: true })

    if (!error && data) {
      setRegistros(data)

      const totalRecebido = data
        .filter((r) => r.status_pagamento === 'Pago')
        .reduce((acc, cur) => acc + parseFloat(cur.valor), 0)

      const totalPendente = data
        .filter((r) => r.status_pagamento !== 'Pago')
        .reduce((acc, cur) => acc + parseFloat(cur.valor), 0)

      const inadimplencia = data.length
        ? ((data.filter((r) => r.status_pagamento !== 'Pago').length / data.length) * 100).toFixed(
            2,
          )
        : 0

      setResumo({ totalRecebido, totalPendente, inadimplencia })
    }

    setLoading(false)
  }

  const exportarPDF = async () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Relatório Financeiro', 14, 15)
    doc.setFontSize(10)
    doc.text(`Período: ${dataInicio} a ${dataFim}`, 14, 22)
    doc.text(`Total Recebido: R$ ${resumo.totalRecebido.toFixed(2)}`, 14, 28)
    doc.text(`Total Pendente: R$ ${resumo.totalPendente.toFixed(2)}`, 14, 34)
    doc.text(`% Inadimplência: ${resumo.inadimplencia}%`, 14, 40)

    // Captura imagens dos gráficos
    if (pizzaRef.current && barraRef.current) {
      const pizzaCanvas = await html2canvas(pizzaRef.current)
      const barraCanvas = await html2canvas(barraRef.current)

      const pizzaImgData = pizzaCanvas.toDataURL('image/png')
      const barraImgData = barraCanvas.toDataURL('image/png')

      doc.addImage(pizzaImgData, 'PNG', 14, 45, 80, 60)
      doc.addImage(barraImgData, 'PNG', 110, 45, 80, 60)
    }

    // Posição para tabela depois dos gráficos
    let posY = 115

    const tabela = registros.map((r) => [
      r.aluno?.nome,
      r.aluno?.matricula,
      `R$ ${parseFloat(r.valor).toFixed(2)}`,
      r.status_pagamento,
      r.data_vencimento || '-',
      r.data_pagamento || '-',
    ])

    doc.autoTable({
      startY: posY,
      head: [['Aluno', 'Matrícula', 'Valor', 'Status', 'Vencimento', 'Pagamento']],
      body: tabela,
    })

    doc.save(`Relatorio_Financeiro_${dataInicio}_${dataFim}.pdf`)
  }

  const dataPizza = [
    { name: 'Recebido', value: resumo.totalRecebido },
    { name: 'Pendente', value: resumo.totalPendente },
  ]

  const dataBarras = Object.values(
    registros.reduce((acc, cur) => {
      const mes = new Date(cur.data_vencimento).toLocaleDateString('pt-BR', {
        month: 'short',
        year: 'numeric',
      })
      if (!acc[mes]) acc[mes] = { mes, Recebido: 0, Pendente: 0 }
      if (cur.status_pagamento === 'Pago') {
        acc[mes].Recebido += parseFloat(cur.valor)
      } else {
        acc[mes].Pendente += parseFloat(cur.valor)
      }
      return acc
    }, {}),
  )

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Relatório Financeiro</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="mb-4"
              onSubmit={(e) => {
                e.preventDefault()
                buscarRelatorio()
              }}
            >
              <CRow className="align-items-end">
                <CCol md={3}>
                  <CFormLabel>Data Início</CFormLabel>
                  <CFormInput
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Data Fim</CFormLabel>
                  <CFormInput
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                  />
                </CCol>
                <CCol md={2}>
                  <CButton color="primary" onClick={buscarRelatorio}>
                    Buscar
                  </CButton>
                </CCol>
                <CCol md={2}>
                  <CButton color="success" onClick={exportarPDF} disabled={!registros.length}>
                    Exportar PDF
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
                <CRow className="mb-4">
                  <CCol>
                    <strong>Total Recebido:</strong> R$ {resumo.totalRecebido.toFixed(2)}
                  </CCol>
                  <CCol>
                    <strong>Total Pendente:</strong> R$ {resumo.totalPendente.toFixed(2)}
                  </CCol>
                  <CCol>
                    <strong>Inadimplência:</strong> {resumo.inadimplencia}%
                  </CCol>
                </CRow>

                <CRow className="mb-4">
                  <CCol md={6} className="d-flex justify-content-center" ref={pizzaRef}>
                    <PieChart width={300} height={250}>
                      <Pie
                        data={dataPizza}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {dataPizza.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ReTooltip />
                      <Legend />
                    </PieChart>
                  </CCol>

                  <CCol md={6} className="d-flex justify-content-center" ref={barraRef}>
                    <BarChart width={400} height={250} data={dataBarras}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <ReTooltip />
                      <Legend />
                      <Bar dataKey="Recebido" fill="#4caf50" />
                      <Bar dataKey="Pendente" fill="#f44336" />
                    </BarChart>
                  </CCol>
                </CRow>

                <CTable bordered hover responsive>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Aluno</CTableHeaderCell>
                      <CTableHeaderCell>Matrícula</CTableHeaderCell>
                      <CTableHeaderCell>Valor</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                      <CTableHeaderCell>Vencimento</CTableHeaderCell>
                      <CTableHeaderCell>Pagamento</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {registros.length > 0 ? (
                      registros.map((r) => (
                        <CTableRow key={r.id}>
                          <CTableDataCell>{r.aluno?.nome}</CTableDataCell>
                          <CTableDataCell>{r.aluno?.matricula}</CTableDataCell>
                          <CTableDataCell>R$ {parseFloat(r.valor).toFixed(2)}</CTableDataCell>
                          <CTableDataCell>{r.status_pagamento}</CTableDataCell>
                          <CTableDataCell>{r.data_vencimento || '-'}</CTableDataCell>
                          <CTableDataCell>{r.data_pagamento || '-'}</CTableDataCell>
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
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RelatorioFinanceiro
