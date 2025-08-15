import React from 'react'

const AvisosComunicados = ({ avisos }) => {
  if (!avisos.length) return <p>Nenhum aviso no momento.</p>

  return (
    <div className="list-group">
      {avisos.map((a, idx) => (
        <div key={idx} className="list-group-item">
          <h6>{a.titulo}</h6>
          <p>{a.descricao}</p>
          <small className="text-muted">{new Date(a.data).toLocaleDateString('pt-BR')}</small>
        </div>
      ))}
    </div>
  )
}

export default AvisosComunicados
