import React, { useState } from 'react'

const FormNotificacoes = ({ data, onSave }) => {
  const [form, setForm] = useState(data || { email: false, sms: false, whatsapp: false })

  const handleChange = (e) => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Notificações</h3>
      <label>
        <input type="checkbox" name="email" checked={form.email} onChange={handleChange} />
        Email
      </label>
      <label>
        <input type="checkbox" name="sms" checked={form.sms} onChange={handleChange} />
        SMS
      </label>
      <label>
        <input type="checkbox" name="whatsapp" checked={form.whatsapp} onChange={handleChange} />
        WhatsApp
      </label>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default FormNotificacoes
