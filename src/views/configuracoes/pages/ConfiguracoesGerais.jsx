import React, { useEffect, useState } from 'react'
import FormIdentidadeVisual from '../components/ConfiguracoesGerais/FormIdentidadeVisual'
import FormNotificacoes from '../components/ConfiguracoesGerais/FormNotificacoes'
import FormMoedaIdioma from '../components/ConfiguracoesGerais/FormMoedaIdioma'
import configuracoesService from '../services/configuracoesService'

const ConfiguracoesGerais = () => {
  const [configuracoes, setConfiguracoes] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const data = await configuracoesService.getConfiguracoesGerais()
        setConfiguracoes(data)
      } catch (error) {
        console.error('Erro ao carregar configurações gerais:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarConfiguracoes()
  }, [])

  const handleSave = async (campo, valores) => {
    try {
      await configuracoesService.updateConfiguracoesGerais(campo, valores)
      setConfiguracoes({ ...configuracoes, [campo]: valores })
    } catch (error) {
      console.error('Erro ao salvar configuração:', error)
    }
  }

  if (loading) return <p>Carregando configurações...</p>

  return (
    <div className="container">
      <h2>Configurações Gerais do Sistema</h2>

      <FormIdentidadeVisual
        data={configuracoes?.identidadeVisual}
        onSave={(valores) => handleSave('identidadeVisual', valores)}
      />

      <FormNotificacoes
        data={configuracoes?.notificacoes}
        onSave={(valores) => handleSave('notificacoes', valores)}
      />

      <FormMoedaIdioma
        data={configuracoes?.moedaIdioma}
        onSave={(valores) => handleSave('moedaIdioma', valores)}
      />
    </div>
  )
}

export default ConfiguracoesGerais
