import React, { useState } from 'react'

const FormIdentidadeVisual = ({ data, onSave }) => {
  const [form, setForm] = useState(data || { logo: '', corPrimaria: '', corSecundaria: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Identidade Visual</h3>
      <div>
        <label>Logo (URL):</label>
        <input type="text" name="logo" value={form.logo} onChange={handleChange} />
      </div>
      <div>
        <label>Cor Primária:</label>
        <input type="color" name="corPrimaria" value={form.corPrimaria} onChange={handleChange} />
      </div>
      <div>
        <label>Cor Secundária:</label>
        <input
          type="color"
          name="corSecundaria"
          value={form.corSecundaria}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default FormIdentidadeVisual
