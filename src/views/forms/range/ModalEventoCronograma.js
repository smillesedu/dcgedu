import React from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ModalEventoCronograma = ({ show, onClose, evento }) => {
  if (!evento) return null

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader>{evento.disciplina?.nome || 'Detalhes do Evento'}</CModalHeader>
      <CModalBody>
        <p>
          <strong>Curso:</strong> {evento.curso?.nome || '-'}
        </p>
        <p>
          <strong>Data:</strong> {evento.data_evento}
        </p>
        <p>
          <strong>Hora:</strong> {evento.hora_inicio} - {evento.hora_fim}
        </p>
        <p>
          <strong>Descrição:</strong> {evento.descricao || '-'}
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEventoCronograma
