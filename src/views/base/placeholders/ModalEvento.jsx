import React, { useState, useEffect } from 'react'
import { CButton, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import supabase from '../../../supaBaseClient'

const tiposEvento = ['Aula', 'Avaliação', 'Feriado', 'Reunião', 'Outro']

const ModalEvento = ({ show, onClose, evento, onSalvo }) => {
  const [form, setForm] = useState({
    titulo: '',
    tipo: 'Aula',
    turma_id: null,
    data_inicio: '',
    data_fim: '',
    descricao: '',
    cor: '#3788d8',
  })

  useEffect(() => {
    if (evento) setForm({ ...form, ...evento })
  }, [evento])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (form.id) {
      // Editar evento
      const { error } = await supabase.from('eventos_calendario').update(form).eq('id', form.id)
      if (error) console.error(error)
    } else {
      // Criar evento
      const { error } = await supabase.from('eventos_calendario').insert([form])
      if (error) console.error(error)
    }
    onSalvo()
  }

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{form.id ? 'Editar Evento' : 'Novo Evento'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          label="Título"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="mb-2"
        />
        <CFormSelect name="tipo" value={form.tipo} onChange={handleChange} className="mb-2">
          {tiposEvento.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </CFormSelect>
        <CFormInput
          label="Data Início"
          type="datetime-local"
          name="data_inicio"
          value={form.data_inicio}
          onChange={handleChange}
          className="mb-2"
        />
        <CFormInput
          label="Data Fim"
          type="datetime-local"
          name="data_fim"
          value={form.data_fim}
          onChange={handleChange}
          className="mb-2"
        />
        <CFormInput
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="mb-2"
        />
        <CFormInput
          label="Cor"
          type="color"
          name="cor"
          value={form.cor}
          onChange={handleChange}
          className="mb-2"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEvento
