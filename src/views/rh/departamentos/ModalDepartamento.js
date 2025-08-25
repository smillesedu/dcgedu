import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalDepartamento = ({ visible, onClose, onSaved, departamento }) => {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  useEffect(() => {
    if (departamento) {
      setNome(departamento.nome || '')
      setDescricao(departamento.descricao || '')
    }
  }, [departamento])

  const salvar = async () => {
    if (departamento?.id)
      await supabase.from('departamentos').update({ nome, descricao }).eq('id', departamento.id)
    else await supabase.from('departamentos').insert({ nome, descricao })
    onSaved()
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{departamento ? 'Editar' : 'Novo'} Departamento</CModalTitle>
      </CModalHeader>
      <CModalBody className="vstack gap-2">
        <CFormInput label="Nome *" value={nome} onChange={(e) => setNome(e.target.value)} />
        <CFormTextarea
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalDepartamento
