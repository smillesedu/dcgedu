import React, { useState, useEffect } from 'react'
import supabase from '../../../../supaBaseClient'

const RelatoriosConfig = () => {
  const [logo, setLogo] = useState(null)
  const [logoUrl, setLogoUrl] = useState('')
  const [cabecalho, setCabecalho] = useState('')
  const [rodape, setRodape] = useState('')

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const { data, error } = await supabase
      .from('personalizacao_relatorios')
      .select('*')
      .limit(1)
      .single()
    if (!error && data) {
      setLogoUrl(data.logo_url)
      setCabecalho(data.cabecalho)
      setRodape(data.rodape)
    }
  }

  const handleUploadLogo = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const { data, error } = await supabase.storage
      .from('logos')
      .upload(`logo_${Date.now()}`, file, { upsert: true })
    if (!error) {
      const url = supabase.storage.from('logos').getPublicUrl(data.path).data.publicUrl
      setLogoUrl(url)
      setLogo(file)
    }
  }

  const handleSalvar = async () => {
    const { error } = await supabase.from('personalizacao_relatorios').upsert([
      {
        id: 1, // sempre atualiza a configuração principal
        logo_url: logoUrl,
        cabecalho,
        rodape,
      },
    ])
    if (!error) alert('Configuração de relatórios salva!')
  }

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-3">📊 Configuração de Relatórios</h2>

      <input type="file" onChange={handleUploadLogo} className="mb-2" />
      {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 mb-2" />}

      <input
        type="text"
        placeholder="Cabeçalho"
        value={cabecalho}
        onChange={(e) => setCabecalho(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="text"
        placeholder="Rodapé"
        value={rodape}
        onChange={(e) => setRodape(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />

      <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={handleSalvar}>
        Salvar Configuração
      </button>
    </div>
  )
}

export default RelatoriosConfig
