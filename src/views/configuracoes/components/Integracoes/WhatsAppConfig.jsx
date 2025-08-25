import React, { useState, useEffect } from 'react'
import supabase from '../../../../supaBaseClient'

const WhatsAppConfig = () => {
  const [config, setConfig] = useState({ token: '', numero: '' })

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const { data } = await supabase.from('integracoes_whatsapp').select('*').single()
    if (data) setConfig(data)
  }

  const handleSave = async () => {
    await supabase.from('integracoes_whatsapp').upsert(config)
    alert('Configuração WhatsApp salva!')
  }

  return (
    <div className="mt-3">
      <div className="mb-3">
        <label>Token API</label>
        <input
          type="text"
          className="form-control"
          value={config.token}
          onChange={(e) => setConfig({ ...config, token: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Número de envio</label>
        <input
          type="text"
          className="form-control"
          value={config.numero}
          onChange={(e) => setConfig({ ...config, numero: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Salvar
      </button>
    </div>
  )
}

export default WhatsAppConfig
