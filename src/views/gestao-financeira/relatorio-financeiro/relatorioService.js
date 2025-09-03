import supabase from '../../../supaBaseClient'

export const buscarRelatorio = async ({ inicio, fim }) => {
  const { data, error } = await supabase
    .from("financeiro_pagamentos")
    .select("*, alunos(nome)")
    .gte("data_pagamento", inicio)
    .lte("data_pagamento", fim)

  if (error) {
    console.error("Erro ao buscar relatório:", error)
    return []
  }

  return data.map(d => ({
    aluno_nome: d.alunos?.nome || "-",
    tipo: d.tipo,
    total: d.total,
    pago: d.pago,
    metodo_pagamento: d.metodo_pagamento,
    data_pagamento: d.data_pagamento,
  }))
}

