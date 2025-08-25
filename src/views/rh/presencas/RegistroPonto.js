import React, { useEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CFormSelect, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'

const RegistroPonto = () => {
  const [funcs, setFuncs] = useState([])
  const [funcionarioId, setFuncionarioId] = useState('')
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10))
  const [horaEntrada, setHoraEntrada] = useState('')
  const [horaSaida, setHoraSaida] = useState('')
  const [status, setStatus] = useState('presente')

  useEffect(() => {
    supabase
      .from('funcionarios')
      .select('id, nome')
      .order('nome')
      .then(({ data }) => setFuncs(data || []))
  }, [])

  const salvar = async () => {
    const { error } = await supabase.from('presencas').upsert({
      funcionario_id: funcionarioId,
      data,
      hora_entrada: horaEntrada || null,
      hora_saida: horaSaida || null,
      status,
    })
    if (!error) alert('Registro salvo!')
  }

  return (
    <CCard className="my-4">
      <CCardHeader>
        <strong>Registro de Ponto</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="g-2">
          <CCol md={4}>
            <CFormSelect value={funcionarioId} onChange={(e) => setFuncionarioId(e.target.value)}>
              <option value="">Funcionário</option>
              {funcs.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={2}>
            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <input
              type="time"
              className="form-control"
              placeholder="Entrada"
              value={horaEntrada}
              onChange={(e) => setHoraEntrada(e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <input
              type="time"
              className="form-control"
              placeholder="Saída"
              value={horaSaida}
              onChange={(e) => setHoraSaida(e.target.value)}
            />
          </CCol>
          <CCol md={2}>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="presente">Presente</option>
              <option value="falta">Falta</option>
              <option value="atraso">Atraso</option>
              <option value="ferias">Férias</option>
              <option value="licenca">Licença</option>
            </select>
          </CCol>
        </CRow>

        <div className="text-end mt-3">
          <CButton color="primary" onClick={salvar}>
            Salvar
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}
export default RegistroPonto
