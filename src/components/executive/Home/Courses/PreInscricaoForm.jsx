// PreInscricaoForm.jsx
import { useState } from "react"
import FichaTecnica from "./FichaTecnica"

export default function PreInscricaoForm({ course, onCancel }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: ""
  })
  const [confirmado, setConfirmado] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔹 Enviar para API (backend salvar no banco)
    await fetch("/api/pre-inscricoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, courseId: course.id })
    })

    // 🔹 Ativar confirmação (Ficha Técnica)
    setConfirmado(true)
  }

  if (confirmado) {
    return <FichaTecnica aluno={formData} curso={course} />
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Seu email"
        className="w-full border p-2 rounded"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        className="w-full border p-2 rounded"
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2">
        <button type="button" className="px-4 py-2 border rounded" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Confirmar
        </button>
      </div>
    </form>
  )
}
