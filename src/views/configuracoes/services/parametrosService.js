const parametrosService = {
  salvarPeriodo: async (dados) => {
    console.log('📌 Salvando Período Letivo:', dados)
    // Exemplo API: return api.post("/parametros/periodo", dados);
  },

  salvarCalendario: async (dados) => {
    console.log('📌 Salvando Calendário:', dados)
    // Exemplo API: return api.post("/parametros/calendario", dados);
  },

  salvarRegrasAvaliacao: async (dados) => {
    console.log('📌 Salvando Regras de Avaliação:', dados)
    // Exemplo API: return api.post("/parametros/regras-avaliacao", dados);
  },
}

export default parametrosService
