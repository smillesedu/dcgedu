import supabase from '../../../supaBaseClient'

const configuracoesService = {
  async getConfiguracoesGerais() {
    const { data, error } = await supabase.from('configuracoes_gerais').select('*').single()

    if (error) {
      console.error('Erro ao buscar configurações:', error)
      return null
    }

    return {
      identidadeVisual: data.identidade_visual,
      notificacoes: data.notificacoes,
      moedaIdioma: data.moeda_idioma,
    }
  },

  async updateConfiguracoesGerais(campo, valores) {
    // Atualizar campo específico usando patch
    const updateObj = {}
    updateObj[campo] = valores

    const { error } = await supabase
      .from('configuracoes_gerais')
      .update(updateObj)
      .eq('id', await this.getId())

    if (error) {
      console.error('Erro ao atualizar configuração:', error)
      return false
    }

    return true
  },

  async getId() {
    const { data, error } = await supabase.from('configuracoes_gerais').select('id').single()

    if (error) {
      console.error('Erro ao buscar ID de configuração:', error)
      return null
    }
    return data.id
  },
}

export default configuracoesService
