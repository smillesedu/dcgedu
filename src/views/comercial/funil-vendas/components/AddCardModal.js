import { useState, useEffect, useRef } from "react"
import supabase from "../../../../supaBaseClient"

export default function AddCardModal({ estagios, onClose, onSaved }) {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    estagio_id: estagios[0]?.id || null,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const modalRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()

    const handleEsc = (e) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.estagio_id || !form.titulo.trim()) {
      setError("Preencha os campos obrigatórios.")
      return
    }

    setSaving(true)

    try {
      // Descobrir a próxima ordem no estágio escolhido
      const { data: list } = await supabase
        .from("funil_cards")
        .select("ordem")
        .eq("estagio_id", form.estagio_id)
        .order("ordem", { ascending: false })
        .limit(1)

      const nextOrder = (list?.[0]?.ordem || 0) + 1

      const payload = {
        titulo: form.titulo.trim(),
        descricao: form.descricao?.trim() || null,
        valor: form.valor ? Number(form.valor) : null,
        estagio_id: form.estagio_id,
        ordem: nextOrder,
      }

      const { error: insertError } = await supabase
        .from("funil_cards")
        .insert(payload)

      if (insertError) throw insertError

      onSaved()
      onClose()
    } catch (err) {
      console.error(err)
      setError("Erro ao salvar. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="bg-white rounded shadow p-4" style={{ width: 420 }}>
        {/* Cabeçalho */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Novo Negócio</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={save} className="vstack gap-3">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div>
            <label className="form-label">Título *</label>
            <input
              ref={inputRef}
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Valor (Kz)</label>
            <input
              type="number"
              name="valor"
              className="form-control"
              value={form.valor}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Estágio</label>
            <select
              name="estagio_id"
              className="form-select"
              value={form.estagio_id || ""}
              onChange={handleChange}
            >
              {estagios.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.titulo}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="d-flex gap-2 justify-content-end mt-3">
            <button type="button" className="btn btn-light" onClick={onClose} disabled={saving}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
