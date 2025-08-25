import React, { useState } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormFloating } from '@coreui/react'
import { createPerfil } from '../../services/usuariosPerfisService'

export default function PerfilForm({ onSuccess }) {
  const [form, setForm] = useState({ nome: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nome.trim()) return
    setLoading(true)
    await createPerfil(form)
    setLoading(false)
    setForm({ nome: '' })
    onSuccess()
  }

  return (
    <CForm className="mb-3" onSubmit={handleSubmit}>
      <CFormFloating className="mb-3">
        <CFormInput
          type="text"
          name="nome"
          id="nomePerfil"
          placeholder="Nome do Perfil"
          value={form.nome}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="nomePerfil">Nome do Perfil</CFormLabel>
      </CFormFloating>

      <CButton type="submit" color="primary" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </CButton>
    </CForm>
  )
}
