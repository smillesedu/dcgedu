import React, { useState } from 'react'
import { addCargo } from './CargoService'

const CargoForm = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    nome: '',
    departamento: '',
    nivel: '',
    faixa_salarial: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addCargo(form)
    refresh()
    onClose()
  }

  return (
    <div className="p-4 bg-gray-50 border rounded">
      <h3 className="text-lg font-semibold mb-2">Novo Cargo</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="nome"
          placeholder="Nome do cargo"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={form.departamento}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="nivel"
          placeholder="Nível (Ex: Júnior, Pleno, Sênior)"
          value={form.nivel}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="faixa_salarial"
          placeholder="Faixa Salarial"
          value={form.faixa_salarial}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CargoForm
