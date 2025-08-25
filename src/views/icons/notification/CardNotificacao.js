import React from 'react'

const CardNotificacao = ({ notificacao, onMarcarComoLida }) => {
  return (
    <div className={`card mb-3 ${notificacao.lida ? 'border-secondary' : 'border-primary'}`}>
      <div className="card-body">
        <h5 className="card-title">{notificacao.titulo}</h5>
        <p className="card-text">{notificacao.mensagem}</p>
        <small className="text-muted">{new Date(notificacao.data_envio).toLocaleString()}</small>
        {!notificacao.lida && (
          <button
            className="btn btn-sm btn-outline-success ms-3"
            onClick={() => onMarcarComoLida(notificacao.id)}
          >
            Marcar como lida
          </button>
        )}
      </div>
    </div>
  )
}

export default CardNotificacao
