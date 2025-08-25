import { useState } from 'react'
import parametrosService from '../services/parametrosService'

export const useParametros = () => {
  const [loading, setLoading] = useState(false)

  const salvarPeriodo = async (dados) => {
    setLoading(true)
    await parametrosService.salvarPeriodo(dados)
    setLoading(false)
  }

  const salvarCalendario = async (dados) => {
    setLoading(true)
    await parametrosService.salvarCalendario(dados)
    setLoading(false)
  }

  const salvarRegrasAvaliacao = async (dados) => {
    setLoading(true)
    await parametrosService.salvarRegrasAvaliacao(dados)
    setLoading(false)
  }

  return {
    loading,
    salvarPeriodo,
    salvarCalendario,
    salvarRegrasAvaliacao,
  }
}
