import React, { useState } from 'react'
import { useParametros } from '../../hooks/useParametros'

const RegrasAvaliacaoForm = () => {
  const { salvarRegrasAvaliacao } = useParametros()
  const [form, setForm] = useState({ notaMinima: '', pesoExames: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    salvarRegrasAvaliacao(form)
    setForm({ notaMinima: '', pesoExames: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="number"
        step="0.1"
        name="notaMinima"
        placeholder="Nota Mínima (ex: 10.0)"
        value={form.notaMinima}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <input
        type="number"
        step="0.1"
        name="pesoExames"
        placeholder="Peso dos Exames (%)"
        value={form.pesoExames}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full"
      />
      <button className="bg-purple-500 text-white px-4 py-2 rounded">Salvar</button>
    </form>
  )
}

export default RegrasAvaliacaoForm
