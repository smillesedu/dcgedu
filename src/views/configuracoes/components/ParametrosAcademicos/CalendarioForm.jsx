import React, { useState } from 'react'
import { useParametros } from '../../hooks/useParametros'

const CalendarioForm = () => {
  const { salvarCalendario } = useParametros()
  const [form, setForm] = useState({ inicio: '', fim: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    salvarCalendario(form)
    setForm({ inicio: '', fim: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label>Data de Início</label>
      <input
        type="date"
        name="inicio"
        value={form.inicio}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <label>Data de Fim</label>
      <input
        type="date"
        name="fim"
        value={form.fim}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  )
}

export default CalendarioForm
