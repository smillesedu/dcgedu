import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const RelatorioFrequencia = ({ dados }) => {
  const porTurma = dados.reduce((acc, freq) => {
    acc[freq.turma_id] = acc[freq.turma_id] || { turma: freq.turma_id, presencas: 0, total: 0 }
    acc[freq.turma_id].total++
    if (freq.presente) acc[freq.turma_id].presencas++
    return acc
  }, {})

  const chartData = Object.values(porTurma).map(turma => ({
    turma: turma.turma,
    percentual: ((turma.presencas / turma.total) * 100).toFixed(1)
  }))

  return (
    <div className="p-3">
      <h5>Taxa de Frequência por Turma</h5>
      <LineChart width={500} height={300} data={chartData}>
        <XAxis dataKey="turma" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="percentual" stroke="#28a745" />
      </LineChart>
    </div>
  )
}

export default RelatorioFrequencia
