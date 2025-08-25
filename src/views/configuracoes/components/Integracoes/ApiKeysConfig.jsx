import React, { useState, useEffect } from 'react'
import supabase from '../../../../supaBaseClient'

const ApiKeysConfig = () => {
  const [config, setConfig] = useState({ googleMaps: '', otherApi: '' })

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const { data } = await supabase.from('integracoes_apikeys').select('*').single()
    if (data) setConfig(data)
  }

  const handleSave = async () => {
    await supabase.from('integracoes_apikeys').upsert(config)
    alert('API Keys salvas!')
  }

  return (
    <div className="mt-3">
      <div className="mb-3">
        <label>Google Maps API</label>
        <input
          type="text"
          className="form-control"
          value={config.googleMaps}
          onChange={(e) => setConfig({ ...config, googleMaps: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Outra API</label>
        <input
          type="text"
          className="form-control"
          value={config.otherApi}
          onChange={(e) => setConfig({ ...config, otherApi: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Salvar
      </button>
    </div>
  )
}

export default ApiKeysConfig
