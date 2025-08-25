import supabase from '../../../supaBaseClient'

// USUÁRIOS
export async function getUsuarios() {
  const { data, error } = await supabase.from('usuarios').select('*')
  if (error) {
    console.error('Erro ao buscar usuários:', error)
    return []
  }
  return data
}

export async function createUsuario(usuario) {
  const { error } = await supabase.from('usuarios').insert(usuario)
  if (error) console.error('Erro ao criar usuário:', error)
}

// PERFIS
export async function getPerfis() {
  const { data, error } = await supabase.from('perfis').select('*')
  if (error) {
    console.error('Erro ao buscar perfis:', error)
    return []
  }
  return data
}

export async function createPerfil(perfil) {
  const { error } = await supabase.from('perfis').insert(perfil)
  if (error) console.error('Erro ao criar perfil:', error)
}
