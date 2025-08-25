import React, { useState } from 'react'

const FormMoedaIdioma = ({ data, onSave }) => {
  const [form, setForm] = useState(data || { moeda: 'KZ', idioma: 'pt' })

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
      <h3>Moeda e Idioma</h3>
      <div>
        <label>Moeda:</label>
        <select name="moeda" value={form.moeda} onChange={handleChange}>
          <option value="KZ">Kwanza (AO)</option>
          <option value="USD">Dólar (US)</option>
          <option value="EUR">Euro (EU)</option>
        </select>
      </div>
      <div>
        <label>Idioma:</label>
        <select name="idioma" value={form.idioma} onChange={handleChange}>
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="fr">Francês</option>
        </select>
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default FormMoedaIdioma
