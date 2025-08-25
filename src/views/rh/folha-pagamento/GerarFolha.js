import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const GerarFolha = () => {
  const [funcs, setFuncs] = useState([])
  const [form, setForm] = useState({
    funcionario_id: '',
    mes: '',
    ano: '',
    adicionais: 0,
    descontos: 0,
  })

  useEffect(() => {
    supabase
      .from('funcionarios')
      .select('id, nome, salario_base')
      .order('nome')
      .then(({ data }) => setFuncs(data || []))
  }, [])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const gerar = async () => {
    const func = funcs.find((f) => f.id === form.funcionario_id)
    const payload = {
      funcionario_id: form.funcionario_id,
      mes: Number(form.mes),
      ano: Number(form.ano),
      salario_base: Number(func?.salario_base || 0),
      adicionais: Number(form.adicionais || 0),
      descontos: Number(form.descontos || 0),
      status: 'pendente',
    }
    const { error } = await supabase
      .from('folhas_pagamento')
      .upsert(payload, { onConflict: 'funcionario_id, mes, ano' })
    if (!error) alert('Folha gerada/atualizada!')
  }

  return (
    <CCard className="my-4">
      <CCardHeader>
        <strong>Gerar Folha</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="g-2">
          <CCol md={4}>
            <CFormSelect name="funcionario_id" value={form.funcionario_id} onChange={handle}>
              <option value="">Funcionário</option>
              {funcs.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={2}>
            <CFormInput
              type="number"
              name="mes"
              placeholder="Mês"
              value={form.mes}
              onChange={handle}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              type="number"
              name="ano"
              placeholder="Ano"
              value={form.ano}
              onChange={handle}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              type="number"
              name="adicionais"
              placeholder="Adicionais"
              value={form.adicionais}
              onChange={handle}
            />
          </CCol>
          <CCol md={2}>
            <CFormInput
              type="number"
              name="descontos"
              placeholder="Descontos"
              value={form.descontos}
              onChange={handle}
            />
          </CCol>
        </CRow>
        <div className="text-end mt-3">
          <CButton color="primary" onClick={gerar}>
            Gerar
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}
export default GerarFolha
