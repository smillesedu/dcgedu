import React, { useState, useEffect } from 'react'
import supabase from '../../../../supaBaseClient'

const MensagensAutomaticas = () => {
  const [mensagens, setMensagens] = useState([])
  const [canal, setCanal] = useState('Email')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    fetchMensagens()
  }, [])

  const fetchMensagens = async () => {
    const { data, error } = await supabase
      .from('personalizacao_mensagens')
      .select('*')
      .order('id', { ascending: true })
    if (!error) setMensagens(data)
  }

  const handleSalvar = async () => {
    if (!mensagem) return alert('Informe a mensagem!')
    const { error } = await supabase.from('personalizacao_mensagens').insert([
      {
        canal,
        mensagem,
      },
    ])
    if (!error) {
      setMensagem('')
      fetchMensagens()
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-3">💬 Mensagens Automáticas</h2>
      <select
        className="border p-2 rounded w-full mb-2"
        value={canal}
        onChange={(e) => setCanal(e.target.value)}
      >
        <option>Email</option>
        <option>SMS</option>
        <option>Notificação no App</option>
      </select>
      <textarea
        className="border p-2 rounded w-full h-32 mb-2"
        placeholder="Escreva a mensagem"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSalvar}>
        Salvar Mensagem
      </button>

      <ul className="mt-4">
        {mensagens.map((m) => (
          <li key={m.id}>
            <strong>{m.canal}:</strong> {m.mensagem}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MensagensAutomaticas
