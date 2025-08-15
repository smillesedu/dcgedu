import React from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ModalVisualizarDocumento = ({ documento, onClose }) => {
  if (!documento) return null

  return (
    <CModal visible={!!documento} backdrop="static" size="lg">
      <CModalHeader>Visualizar Documento: {documento.titulo}</CModalHeader>
      <CModalBody>
        <p>
          <strong>Aluno:</strong> {documento.aluno?.nome}
        </p>
        <p>
          <strong>Tipo:</strong> {documento.tipo}
        </p>
        <p>
          <strong>Data de Envio:</strong> {new Date(documento.data_envio).toLocaleDateString()}
        </p>
        <p>
          <strong>Arquivo:</strong>{' '}
          <a href={documento.arquivo_url} target="_blank" rel="noopener noreferrer">
            Abrir/Download
          </a>
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

export default ModalVisualizarDocumento
