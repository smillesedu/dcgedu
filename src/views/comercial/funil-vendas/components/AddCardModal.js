import { useState } from 'react'
import supabase from '../../../../supaBaseClient'

export default function AddCardModal({ estagios, onClose, onSaved }) {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    estagio_id: estagios[0]?.id || null,
  })
  const [saving, setSaving] = useState(false)

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    if (!form.estagio_id || !form.titulo) return
    setSaving(true)

    // descobrir a próxima ordem no estágio escolhido
    const { data: list } = await supabase
      .from('funil_cards')
      .select('ordem')
      .eq('estagio_id', form.estagio_id)
      .order('ordem', { ascending: false })
      .limit(1)

    const nextOrder = (list?.[0]?.ordem || 0) + 1

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao || null,
      valor: form.valor ? Number(form.valor) : null,
      estagio_id: form.estagio_id,
      ordem: nextOrder,
    }

    const { error } = await supabase.from('funil_cards').insert(payload)
    setSaving(false)
    if (!error) onSaved()
    else console.error(error)
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ background: 'rgba(0,0,0,.4)', zIndex: 1050 }}
    >
      <div className="bg-white rounded shadow p-3" style={{ width: 420 }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Novo Negócio</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={save} className="vstack gap-2">
          <div>
            <label className="form-label">Título *</label>
            <input
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handle}
              required
            />
          </div>
          <div>
            <label className="form-label">Descrição</label>
            <textarea
              name="descricao"
              className="form-control"
              rows={2}
              value={form.descricao}
              onChange={handle}
            />
          </div>
          <div>
            <label className="form-label">Valor (Kz)</label>
            <input
              type="number"
              name="valor"
              className="form-control"
              value={form.valor}
              onChange={handle}
            />
          </div>
          <div>
            <label className="form-label">Estágio</label>
            <select
              name="estagio_id"
              className="form-select"
              value={form.estagio_id || ''}
              onChange={handle}
            >
              {estagios.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2 justify-content-end mt-2">
            <button type="button" className="btn btn-light" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
