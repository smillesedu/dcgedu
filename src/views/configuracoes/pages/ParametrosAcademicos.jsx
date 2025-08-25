import React from 'react'
import PeriodoForm from '../components/ParametrosAcademicos/PeriodoForm'
import CalendarioForm from '../components/ParametrosAcademicos/CalendarioForm'
import RegrasAvaliacaoForm from '../components/ParametrosAcademicos/RegrasAvaliacaoForm'

const ParametrosAcademicos = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Parâmetros Acadêmicos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Período Letivo */}
        <div className="border p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2">Período Letivo</h3>
          <PeriodoForm />
        </div>

        {/* Calendário Acadêmico */}
        <div className="border p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2">Calendário Acadêmico</h3>
          <CalendarioForm />
        </div>

        {/* Regras de Avaliação */}
        <div className="border p-4 rounded shadow-sm md:col-span-2">
          <h3 className="font-semibold mb-2">Regras de Avaliação</h3>
          <RegrasAvaliacaoForm />
        </div>
      </div>
    </div>
  )
}

export default ParametrosAcademicos
