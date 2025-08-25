import React, { useEffect, useState } from 'react'
import CargoForm from './CargoForm'
import { getCargos, deleteCargo } from './CargoService'

const CargoList = () => {
  const [cargos, setCargos] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchCargos()
  }, [])

  const fetchCargos = async () => {
    const data = await getCargos()
    setCargos(data)
  }

  const handleDelete = async (id) => {
    await deleteCargo(id)
    fetchCargos()
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Gestão de Cargos</h2>

      <button
        className="px-4 py-2 mb-4 bg-blue-600 text-white rounded"
        onClick={() => setShowForm(true)}
      >
        + Novo Cargo
      </button>

      {showForm && <CargoForm onClose={() => setShowForm(false)} refresh={fetchCargos} />}

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Departamento</th>
            <th className="border px-4 py-2">Nível</th>
            <th className="border px-4 py-2">Faixa Salarial</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map((cargo) => (
            <tr key={cargo.id}>
              <td className="border px-4 py-2">{cargo.nome}</td>
              <td className="border px-4 py-2">{cargo.departamento}</td>
              <td className="border px-4 py-2">{cargo.nivel}</td>
              <td className="border px-4 py-2">{cargo.faixa_salarial}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(cargo.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CargoList
