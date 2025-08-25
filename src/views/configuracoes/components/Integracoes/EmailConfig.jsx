import React, { useState, useEffect } from 'react'
import supabase from '../../../../supaBaseClient'

const EmailConfig = () => {
  const [config, setConfig] = useState({ smtp: '', user: '', senha: '' })

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const { data } = await supabase.from('integracoes_email').select('*').single()
    if (data) setConfig(data)
  }

  const handleSave = async () => {
    await supabase.from('integracoes_email').upsert(config)
    alert('Configuração de email salva!')
  }

  return (
    <div className="mt-3">
      <div className="mb-3">
        <label>Servidor SMTP</label>
        <input
          type="text"
          className="form-control"
          value={config.smtp}
          onChange={(e) => setConfig({ ...config, smtp: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Usuário</label>
        <input
          type="text"
          className="form-control"
          value={config.user}
          onChange={(e) => setConfig({ ...config, user: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label>Senha</label>
        <input
          type="password"
          className="form-control"
          value={config.senha}
          onChange={(e) => setConfig({ ...config, senha: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Salvar
      </button>
    </div>
  )
}

export default EmailConfig
