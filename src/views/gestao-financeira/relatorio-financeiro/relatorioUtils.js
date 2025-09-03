export const calcularTotais = (registros) => {
  const recebido = registros.filter(r => r.pago).reduce((acc, r) => acc + (r.total || 0), 0)
  const pendente = registros.filter(r => !r.pago).reduce((acc, r) => acc + (r.total || 0), 0)
  const total = recebido + pendente
  const inadimplencia = total > 0 ? ((pendente / total) * 100).toFixed(2) : 0

  return { recebido, pendente, inadimplencia }
}
