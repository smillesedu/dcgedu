import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormTextarea,
} from '@coreui/react'

const ModalEnviarCobranca = ({ show, setShow, mensalidade }) => {
  const [mensagem, setMensagem] = useState(
    `Olá ${mensalidade.alunos?.nome}, sua mensalidade de ${mensalidade.mes_referencia} no valor de R$ ${mensalidade.valor.toFixed(2)} está pendente. Por favor, realize o pagamento.`,
  )

  const enviarCobranca = () => {
    // Aqui poderia integrar com WhatsApp API, Email ou outro meio
    alert('Cobrança enviada:\n' + mensagem)
    setShow(false)
  }

  return (
    <CModal visible={show} onClose={() => setShow(false)}>
      <CModalHeader>Enviar Cobrança</CModalHeader>
      <CModalBody>
        <CFormTextarea rows={4} value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShow(false)}>
          Cancelar
        </CButton>
        <CButton color="warning" onClick={enviarCobranca}>
          Enviar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEnviarCobranca
