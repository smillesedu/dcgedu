import React, { useState, useEffect } from 'react'
import { CButton, CForm, CFormInput, CFormLabel, CFormSelect, CFormFloating } from '@coreui/react'
import { createUsuario, getPerfis } from '../../services/usuariosPerfisService'

export default function UsuarioForm({ onSuccess }) {
  const [form, setForm] = useState({ nome: '', email: '', perfil_id: '' })
  const [perfils, setPerfils] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    carregarPerfis()
  }, [])

  const carregarPerfis = async () => {
    const data = await getPerfis()
    setPerfils(data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nome.trim() || !form.email.trim() || !form.perfil_id) return
    setLoading(true)
    await createUsuario(form)
    setLoading(false)
    setForm({ nome: '', email: '', perfil_id: '' })
    onSuccess()
  }

  return (
    <CForm className="mb-3" onSubmit={handleSubmit}>
      <CFormFloating className="mb-3">
        <CFormInput
          type="text"
          name="nome"
          id="nomeUsuario"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="nomeUsuario">Nome</CFormLabel>
      </CFormFloating>

      <CFormFloating className="mb-3">
        <CFormInput
          type="email"
          name="email"
          id="emailUsuario"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
        />
        <CFormLabel htmlFor="emailUsuario">E-mail</CFormLabel>
      </CFormFloating>

      <CFormFloating className="mb-3">
        <CFormSelect
          name="perfil_id"
          id="perfilUsuario"
          value={form.perfil_id}
          onChange={handleChange}
        >
          <option value="">Selecione o Perfil</option>
          {perfils.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </CFormSelect>
        <CFormLabel htmlFor="perfilUsuario">Perfil</CFormLabel>
      </CFormFloating>

      <CButton type="submit" color="primary" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </CButton>
    </CForm>
  )
}
