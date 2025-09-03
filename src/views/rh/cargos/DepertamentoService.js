import supabase from '../../../supaBaseClient'

export const getDepartamentos = async () => {
  const { data, error } = await supabase.from('departamentos').select('*')
  if (error) throw error
  return data
}

export const addDepartamentos = async (departamentos) => {
  const { data, error } = await supabase.from('departamentos').insert([departamentos])
  if (error) throw error
  return data
}

export const deleteDepartamentos = async (id) => {
  const { data, error } = await supabase.from('departamentos').delete().eq('id', id)
  if (error) throw error
  return data
}
