import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const LeadForm = ({ lead, onClose, onSaved }) => {
  const [form, setForm] = useState({ nome: '', contato: '', origem: '', status: 'Novo' })

  useEffect(() => {
    if (lead) setForm(lead)
  }, [lead])

  const handleSave = async () => {
    if (lead?.id) {
      await supabase.from('leads').update(form).eq('id', lead.id)
    } else {
      await supabase.from('leads').insert([form])
    }
    onSaved()
    onClose()
  }

  return (
    <CModal visible onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{lead ? 'Editar Lead' : 'Novo Lead'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          label="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          className="mb-3"
        />
        <CFormInput
          label="Contato"
          value={form.contato}
          onChange={(e) => setForm({ ...form, contato: e.target.value })}
          className="mb-3"
        />
        <CFormSelect
          label="Origem"
          value={form.origem}
          onChange={(e) => setForm({ ...form, origem: e.target.value })}
          className="mb-3"
        >
          <option value="">Selecione</option>
          <option value="Site">Site</option>
          <option value="Redes Sociais">Redes Sociais</option>
          <option value="Indicação">Indicação</option>
          <option value="Evento">Evento</option>
        </CFormSelect>
        <CFormSelect
          label="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Novo">Novo</option>
          <option value="Em Negociação">Em Negociação</option>
          <option value="Fechado">Fechado</option>
          <option value="Perdido">Perdido</option>
        </CFormSelect>
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

export default LeadForm
