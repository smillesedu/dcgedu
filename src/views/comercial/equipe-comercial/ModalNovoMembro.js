import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalNovoMembro = ({ visible, onClose, onSave }) => {
  const [nome, setNome] = useState('')
  const [meta, setMeta] = useState('')
  const [comissao, setComissao] = useState('')

  const handleSave = async () => {
    const { error } = await supabase.from('equipe_comercial').insert([
      {
        nome,
        meta_mensal: parseFloat(meta),
        vendas_realizadas: 0,
        comissao: parseFloat(comissao),
      },
    ])
    if (!error) {
      onSave()
      onClose()
      setNome('')
      setMeta('')
      setComissao('')
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Novo Membro</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="mb-3">
            <CFormLabel>Nome</CFormLabel>
            <CFormInput value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className="mb-3">
            <CFormLabel>Meta Mensal (R$)</CFormLabel>
            <CFormInput type="number" value={meta} onChange={(e) => setMeta(e.target.value)} />
          </div>
          <div className="mb-3">
            <CFormLabel>Comissão (%)</CFormLabel>
            <CFormInput
              type="number"
              value={comissao}
              onChange={(e) => setComissao(e.target.value)}
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

export default ModalNovoMembro
