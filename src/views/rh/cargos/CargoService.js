import supabase from '../../../supaBaseClient'

export const getCargos = async () => {
  const { data, error } = await supabase.from('cargos').select('*')
  if (error) throw error
  return data
}

export const addCargo = async (cargo) => {
  const { data, error } = await supabase.from('cargos').insert([cargo])
  if (error) throw error
  return data
}

export const deleteCargo = async (id) => {
  const { data, error } = await supabase.from('cargos').delete().eq('id', id)
  if (error) throw error
  return data
}
