import React from 'react'

const ModalConfirmacao = ({ show, onClose, onConfirm, title, message }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title || 'Confirmação'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{message || 'Tem certeza que deseja continuar?'}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacao
