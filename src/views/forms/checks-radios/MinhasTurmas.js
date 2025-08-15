import React from 'react'

const MinhasTurmas = ({ turmas }) => {
  if (!turmas.length) return <p>Você não está matriculado em nenhuma turma.</p>

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Turma</th>
          <th>Turno</th>
          <th>Ano Letivo</th>
          <th>Professor</th>
        </tr>
      </thead>
      <tbody>
        {turmas.map((item, idx) => (
          <tr key={idx}>
            <td>{item.turma?.nome}</td>
            <td>{item.turma?.turno}</td>
            <td>{item.turma?.ano_letivo}</td>
            <td>{item.turma?.professor?.nome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MinhasTurmas
