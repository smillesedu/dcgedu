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
  CFormSelect,
  CFormTextarea,
  CButton,
  CSpinner,
} from '@coreui/react'
import supabase from '../../../supaBaseClient' 

const ParametrosRegras = () => {
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [params, setParams] = useState({
    ano_letivo: '',
    qtd_bimestres: 4,
    nota_minima_aprovacao: 6,
    percentual_frequencia_minima: 75,
    politica_recuperacao: '',
    politica_exame_final: '',
  })

  useEffect(() => {
    buscarParametros()
  }, [])

  const buscarParametros = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('parametros_academicos').select('*').single()

    if (!error && data) {
      setParams(data)
    }
    setLoading(false)
  }

  const salvarParametros = async () => {
    setSalvando(true)
    const { error } = await supabase
      .from('parametros_academicos')
      .upsert(params, { onConflict: 'id' })

    setSalvando(false)
    if (!error) {
      alert('Parâmetros salvos com sucesso!')
    } else {
      alert('Erro ao salvar parâmetros')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>Parâmetros e Regras Acadêmicas</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center p-4">
                <CSpinner />
              </div>
            ) : (
              <CForm>
                <CRow className="mb-3">
                  <CCol md={4}>
                    <CFormLabel>Ano Letivo</CFormLabel>
                    <CFormInput
                      type="text"
                      name="ano_letivo"
                      value={params.ano_letivo}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Qtd. Bimestres</CFormLabel>
                    <CFormSelect
                      name="qtd_bimestres"
                      value={params.qtd_bimestres}
                      onChange={handleChange}
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>Nota Mínima de Aprovação</CFormLabel>
                    <CFormInput
                      type="number"
                      step="0.1"
                      name="nota_minima_aprovacao"
                      value={params.nota_minima_aprovacao}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={4}>
                    <CFormLabel>% Frequência Mínima</CFormLabel>
                    <CFormInput
                      type="number"
                      step="0.1"
                      name="percentual_frequencia_minima"
                      value={params.percentual_frequencia_minima}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CCol md={6}>
                    <CFormLabel>Política de Recuperação</CFormLabel>
                    <CFormTextarea
                      rows={3}
                      name="politica_recuperacao"
                      value={params.politica_recuperacao}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel>Política de Exame Final</CFormLabel>
                    <CFormTextarea
                      rows={3}
                      name="politica_exame_final"
                      value={params.politica_exame_final}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CButton color="primary" onClick={salvarParametros} disabled={salvando}>
                  {salvando ? 'Salvando...' : 'Salvar Parâmetros'}
                </CButton>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ParametrosRegras
