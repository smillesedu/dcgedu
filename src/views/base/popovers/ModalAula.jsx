import React, { useState, useEffect } from 'react'
import {
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalAula = ({ aulaEditando, turmas, disciplinas, professores, onSalvo }) => {
  const [visible, setVisible] = useState(true)
  const [form, setForm] = useState({
    turma_id: '',
    disciplina_id: '',
    professor_id: '',
    data_aula: '',
    hora_inicio: '',
    hora_fim: '',
    sala: '',
    status: 'Ativa',
  })

  useEffect(() => {
    if (aulaEditando) {
      setForm({
        turma_id: aulaEditando.turma_id || '',
        disciplina_id: aulaEditando.disciplina_id || '',
        professor_id: aulaEditando.professor_id || '',
        data_aula: aulaEditando.data_aula || '',
        hora_inicio: aulaEditando.hora_inicio || '',
        hora_fim: aulaEditando.hora_fim || '',
        sala: aulaEditando.sala || '',
        status: aulaEditando.status || 'Ativa',
      })
    }
  }, [aulaEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (aulaEditando) {
      // Atualizar aula
      const { error } = await supabase.from('aulas').update(form).eq('id', aulaEditando.id)
      if (error) console.error(error)
    } else {
      // Criar nova aula
      const { error } = await supabase.from('aulas').insert(form)
      if (error) console.error(error)
    }

    onSalvo?.()
    setVisible(false)
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} backdrop="static" size="lg">
      <CModalHeader>{aulaEditando ? 'Editar Aula' : 'Nova Aula'}</CModalHeader>
      <CModalBody>
        <CForm className="row g-3">
          <CCol md={4}>
            <CFormLabel>Turma</CFormLabel>
            <CFormSelect name="turma_id" value={form.turma_id} onChange={handleChange}>
              <option value="">Selecione a Turma</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={4}>
            <CFormLabel>Disciplina</CFormLabel>
            <CFormSelect name="disciplina_id" value={form.disciplina_id} onChange={handleChange}>
              <option value="">Selecione a Disciplina</option>
              {disciplinas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={4}>
            <CFormLabel>Professor</CFormLabel>
            <CFormSelect name="professor_id" value={form.professor_id} onChange={handleChange}>
              <option value="">Selecione o Professor</option>
              {professores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={3}>
            <CFormLabel>Data da Aula</CFormLabel>
            <CFormInput
              type="date"
              name="data_aula"
              value={form.data_aula}
              onChange={handleChange}
            />
          </CCol>

          <CCol md={3}>
            <CFormLabel>Hora Início</CFormLabel>
            <CFormInput
              type="time"
              name="hora_inicio"
              value={form.hora_inicio}
              onChange={handleChange}
            />
          </CCol>

          <CCol md={3}>
            <CFormLabel>Hora Fim</CFormLabel>
            <CFormInput type="time" name="hora_fim" value={form.hora_fim} onChange={handleChange} />
          </CCol>

          <CCol md={3}>
            <CFormLabel>Sala</CFormLabel>
            <CFormInput
              type="text"
              name="sala"
              value={form.sala}
              onChange={handleChange}
              placeholder="Ex: 101"
            />
          </CCol>

          <CCol md={3}>
            <CFormLabel>Status</CFormLabel>
            <CFormSelect name="status" value={form.status} onChange={handleChange}>
              <option value="Ativa">Ativa</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Remarcada">Remarcada</option>
            </CFormSelect>
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          {aulaEditando ? 'Salvar' : 'Criar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAula
