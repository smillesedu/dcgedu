import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const ModalVisualizacaoMaterial = ({ material, onFechar }) => {
  if (!material) return null

  return (
    <CModal visible={!!material} onClose={onFechar} size="lg">
      <CModalHeader>
        <CModalTitle>{material.titulo}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{material.descricao}</p>
        {material.arquivo_url && (
          <a href={material.arquivo_url} target="_blank" rel="noopener noreferrer">
            Clique aqui para baixar
          </a>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onFechar}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalVisualizacaoMaterial
