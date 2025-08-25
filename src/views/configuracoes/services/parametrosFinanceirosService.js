import supabase from '../../../supaBaseClient'

export const getParametros = async () => {
  const { data, error } = await supabase.from('parametros_financeiros').select('*').single()

  if (error) {
    console.error('Erro ao carregar parâmetros:', error)
    return null
  }

  return data
}
