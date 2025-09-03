import React, { useState, useEffect } from 'react'
import { addCargo } from './CargoService'
import { getDepartamentos } from './DepertamentoService' // serviço que busca os departamentos

const CargoForm = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    nome: '',
    departamento_id: '',
    nivel: '',
    faixa_salarial: '',
  })

  const [departamentos, setDepartamentos] = useState([])

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await getDepartamentos()
        setDepartamentos(data)
      } catch (error) {
        console.error("Erro ao carregar departamentos:", error)
      }
    }
    fetchDepartamentos()
  }, [])

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

        {/* Select de Departamentos */}
        <div>
          <label className="form-label">Departamento</label>
          <select
            name="departamento_id"
            className="border p-2 rounded w-full"
            value={form.departamento_id || ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um departamento</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </select>
        </div>

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
