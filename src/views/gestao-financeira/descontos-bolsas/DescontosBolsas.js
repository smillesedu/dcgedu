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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import supabase from '../../../supaBaseClient' 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const DescontosBolsas = () => {
  const [loading, setLoading] = useState(true)
  const [tipoFiltro, setTipoFiltro] = useState('')
  const [beneficios, setBeneficios] = useState([])
  const [totalConcedido, setTotalConcedido] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [novoBeneficio, setNovoBeneficio] = useState({
    aluno_id: '',
    tipo: '',
    descricao: '',
    valor: '',
  })

  const [estatisticasMensais, setEstatisticasMensais] = useState([])
  const [estatisticasTipo, setEstatisticasTipo] = useState([])

  useEffect(() => {
    buscarBeneficios()
  }, [tipoFiltro])

  const buscarBeneficios = async () => {
    setLoading(true)
    let query = supabase
      .from('descontos_bolsas')
      .select(
        `
        id,
        aluno:alunos(nome, matricula),
        tipo,
        descricao,
        valor,
        created_at
      `,
      )
      .order('id', { ascending: false })

    if (tipoFiltro) query = query.eq('tipo', tipoFiltro)

    const { data, error } = await query

    if (!error) {
      setBeneficios(data || [])
      setTotalConcedido((data || []).reduce((acc, cur) => acc + parseFloat(cur.valor || 0), 0))
      gerarEstatisticas(data || [])
    }
    setLoading(false)
  }

  const gerarEstatisticas = (dados) => {
    // Estatísticas por mês
    const porMes = {}
    const porTipoTotal = { Bolsa: 0, Desconto: 0 }

    dados.forEach((item) => {
      const mesAno = new Date(item.created_at).toLocaleDateString('pt-BR', {
        month: 'short',
        year: 'numeric',
      })
      if (!porMes[mesAno]) porMes[mesAno] = { mes: mesAno, Bolsa: 0, Desconto: 0 }
      porMes[mesAno][item.tipo] += parseFloat(item.valor || 0)

      porTipoTotal[item.tipo] += parseFloat(item.valor || 0)
    })

    setEstatisticasMensais(Object.values(porMes))
    setEstatisticasTipo([
      { name: 'Bolsas', value: porTipoTotal.Bolsa },
      { name: 'Descontos', value: porTipoTotal.Desconto },
    ])
  }

  const salvarBeneficio = async () => {
    const { error } = await supabase.from('descontos_bolsas').insert([novoBeneficio])
    if (!error) {
      setModalVisible(false)
      setNovoBeneficio({ aluno_id: '', tipo: '', descricao: '', valor: '' })
      buscarBeneficios()
    }
  }

  const COLORS = ['#0088FE', '#FF8042']

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Descontos e Bolsas</strong>
          </CCardHeader>
          <CCardBody>
            {/* FILTROS */}
            <CForm className="mb-3">
              <CRow>
                <CCol md={4}>
                  <CFormLabel>Tipo</CFormLabel>
                  <CFormSelect value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="Bolsa">Bolsa</option>
                    <option value="Desconto">Desconto</option>
                  </CFormSelect>
                </CCol>
                <CCol md={4} className="d-flex align-items-end">
                  <CButton color="primary" onClick={() => setModalVisible(true)}>
                    + Novo Benefício
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
                {/* GRÁFICOS */}
                <CRow className="mb-4">
                  <CCol md={8}>
                    <h6>Valores por Mês</h6>
                    <BarChart width={600} height={300} data={estatisticasMensais}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Bolsa" fill="#0088FE" />
                      <Bar dataKey="Desconto" fill="#FF8042" />
                    </BarChart>
                  </CCol>
                  <CCol md={4}>
                    <h6>Proporção Total</h6>
                    <PieChart width={300} height={300}>
                      <Pie
                        data={estatisticasTipo}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {estatisticasTipo.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </CCol>
                </CRow>

                {/* TABELA */}
                <CTable bordered hover responsive>
                  <CTableHead color="dark">
                    <CTableRow>
                      <CTableHeaderCell>Aluno</CTableHeaderCell>
                      <CTableHeaderCell>Matrícula</CTableHeaderCell>
                      <CTableHeaderCell>Tipo</CTableHeaderCell>
                      <CTableHeaderCell>Descrição</CTableHeaderCell>
                      <CTableHeaderCell>Valor</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {beneficios.length > 0 ? (
                      beneficios.map((item) => (
                        <CTableRow key={item.id}>
                          <CTableDataCell>{item.aluno?.nome}</CTableDataCell>
                          <CTableDataCell>{item.aluno?.matricula}</CTableDataCell>
                          <CTableDataCell>{item.tipo}</CTableDataCell>
                          <CTableDataCell>{item.descricao}</CTableDataCell>
                          <CTableDataCell>R$ {parseFloat(item.valor).toFixed(2)}</CTableDataCell>
                        </CTableRow>
                      ))
                    ) : (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="text-center">
                          Nenhum registro encontrado.
                        </CTableDataCell>
                      </CTableRow>
                    )}
                  </CTableBody>
                </CTable>

                {/* TOTAL */}
                <div className="mt-3">
                  <strong>Total concedido: </strong>R$ {totalConcedido.toFixed(2)}
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* MODAL CADASTRO */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <strong>Novo Benefício</strong>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>ID do Aluno</CFormLabel>
            <CFormInput
              value={novoBeneficio.aluno_id}
              onChange={(e) => setNovoBeneficio({ ...novoBeneficio, aluno_id: e.target.value })}
            />
            <CFormLabel className="mt-2">Tipo</CFormLabel>
            <CFormSelect
              value={novoBeneficio.tipo}
              onChange={(e) => setNovoBeneficio({ ...novoBeneficio, tipo: e.target.value })}
            >
              <option value="">Selecione</option>
              <option value="Bolsa">Bolsa</option>
              <option value="Desconto">Desconto</option>
            </CFormSelect>
            <CFormLabel className="mt-2">Descrição</CFormLabel>
            <CFormInput
              value={novoBeneficio.descricao}
              onChange={(e) => setNovoBeneficio({ ...novoBeneficio, descricao: e.target.value })}
            />
            <CFormLabel className="mt-2">Valor</CFormLabel>
            <CFormInput
              type="number"
              step="0.01"
              value={novoBeneficio.valor}
              onChange={(e) => setNovoBeneficio({ ...novoBeneficio, valor: e.target.value })}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={salvarBeneficio}>
            Salvar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default DescontosBolsas
