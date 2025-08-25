import React, { useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CFormInput } from '@coreui/react'
import supabase from '../../../supaBaseClient' 

const ModalRegistrarPagamento = ({ show, setShow, mensalidade, atualizar }) => {
  const [dataPagamento, setDataPagamento] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  const registrarPagamento = async () => {
    setLoading(true)
    const { error } = await supabase
      .from('financeiro_mensalidades')
      .update({
        pago: true,
        data_pagamento: dataPagamento,
      })
      .eq('id', mensalidade.id)

    setLoading(false)
    if (!error) {
      atualizar()
      setShow(false)
    }
  }

  return (
    <CModal visible={show} onClose={() => setShow(false)}>
      <CModalHeader>Registrar Pagamento</CModalHeader>
      <CModalBody>
        <p>
          Aluno: <strong>{mensalidade.alunos?.nome}</strong>
        </p>
        <p>
          Mês Referência: <strong>{mensalidade.mes_referencia}</strong>
        </p>
        <CFormInput
          type="date"
          label="Data do Pagamento"
          value={dataPagamento}
          onChange={(e) => setDataPagamento(e.target.value)}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShow(false)}>
          Cancelar
        </CButton>
        <CButton color="success" onClick={registrarPagamento} disabled={loading}>
          {loading ? 'Salvando...' : 'Confirmar'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalRegistrarPagamento
