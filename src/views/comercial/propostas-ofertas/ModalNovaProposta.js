import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalNovaProposta = ({ visible, onClose, onSave }) => {
  const [leadId, setLeadId] = useState('')
  const [valor, setValor] = useState('')
  const [desconto, setDesconto] = useState(0)
  const [validade, setValidade] = useState('')
  const [leads, setLeads] = useState([])

  useEffect(() => {
    if (visible) fetchLeads()
  }, [visible])

  const fetchLeads = async () => {
    const { data, error } = await supabase.from('leads').select('id, nome').order('nome')
    if (!error) setLeads(data || [])
  }

  const handleSave = async () => {
    const { error } = await supabase.from('propostas').insert([
      {
        lead_id: leadId,
        valor: parseFloat(valor),
        desconto: parseInt(desconto),
        status: true,
        validade,
      },
    ])
    if (!error) {
      onSave()
      onClose()
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Nova Proposta</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Lead</CFormLabel>
            <CFormSelect value={leadId} onChange={(e) => setLeadId(e.target.value)}>
              <option value="">Selecione...</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nome}
                </option>
              ))}
            </CFormSelect>
          </div>
          <div className="mb-3">
            <CFormLabel>Valor (R$)</CFormLabel>
            <CFormInput type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
          <div className="mb-3">
            <CFormLabel>Desconto (%)</CFormLabel>
            <CFormInput
              type="number"
              value={desconto}
              onChange={(e) => setDesconto(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Validade</CFormLabel>
            <CFormInput
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
            />
          </div>
        </CForm>
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

export default ModalNovaProposta
