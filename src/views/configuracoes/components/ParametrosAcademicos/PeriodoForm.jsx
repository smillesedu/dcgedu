import React, { useState } from 'react'
import { useParametros } from '../../hooks/useParametros'

const PeriodoForm = () => {
  const { salvarPeriodo } = useParametros()
  const [form, setForm] = useState({ ano: '', semestre: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    salvarPeriodo(form)
    setForm({ ano: '', semestre: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        name="ano"
        placeholder="Ano"
        value={form.ano}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <select
        name="semestre"
        value={form.semestre}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">Selecione o Semestre</option>
        <option value="1">1º Semestre</option>
        <option value="2">2º Semestre</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  )
}

export default PeriodoForm
