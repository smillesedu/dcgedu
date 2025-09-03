import React from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#28a745", "#dc3545"]

const GraficosFinanceiros = ({ totais }) => {
  const dataPizza = [
    { name: "Recebido", value: totais.recebido || 0 },
    { name: "Pendente", value: totais.pendente || 0 },
  ]

  const dataBarras = [
    { name: "Recebido", valor: totais.recebido || 0 },
    { name: "Pendente", valor: totais.pendente || 0 },
  ]

  return (
    <div>
      <h6>Gráficos</h6>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={dataPizza} dataKey="value" label>
            {dataPizza.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dataBarras}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GraficosFinanceiros
