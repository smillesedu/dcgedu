import React from 'react'

const NotasBoletim = ({ notas }) => {
  if (!notas.length) return <p>Nenhuma nota disponível no momento.</p>

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Disciplina</th>
          <th>Bimestre</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        {notas.map((n, idx) => (
          <tr key={idx}>
            <td>{n.disciplina?.nome}</td>
            <td>{n.bimestre}</td>
            <td>{n.nota}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default NotasBoletim
