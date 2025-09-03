import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Exemplo de função para gerar data formatada
const formatDate = (date = new Date()) =>
  date.toLocaleDateString("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric" })

export const exportPDF = (registros, totais) => {
  const doc = new jsPDF("p", "mm", "a4")

  // =====================
  // Cabeçalho
  // =====================
  doc.setFontSize(18)
  doc.setTextColor(40)
  doc.text("Relatório Financeiro", 14, 20)

  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Data: ${formatDate()}`, 14, 28)
  doc.text("Empresa XYZ - Gestão Escolar", 14, 34)

  // =====================
  // Resumo Financeiro
  // =====================
  doc.setFontSize(12)
  doc.setTextColor(40)
  doc.text("Resumo:", 14, 45)

  doc.setFontSize(11)
  doc.setTextColor(80)
  doc.text(`✔ Total Recebido: ${totais.recebido} Kz`, 20, 52)
  doc.text(`✔ Total Pendente: ${totais.pendente} Kz`, 20, 59)
  doc.text(`✔ Inadimplência: ${totais.inadimplencia}%`, 20, 66)

  // =====================
  // Tabela Detalhada
  // =====================
  const tabela = registros.map(r => [
    r.aluno_nome,
    r.tipo,
    `${r.total} Kz`,
    r.pago ? "✅ Pago" : "❌ Pendente",
    r.metodo_pagamento,
    r.data_pagamento,
  ])

  autoTable(doc, {
    startY: 75,
    head: [["Aluno", "Item", "Valor", "Status", "Método", "Data"]],
    body: tabela,
    theme: "striped",
    headStyles: {
      fillColor: [41, 128, 185], // azul empresarial
      textColor: [255, 255, 255],
      fontSize: 11,
      halign: "center",
    },
    bodyStyles: {
      fontSize: 10,
      textColor: [60, 60, 60],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    styles: {
      cellPadding: 4,
      halign: "center",
      valign: "middle",
    },
  })

  // =====================
  // Rodapé
  // =====================
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(9)
    doc.setTextColor(150)
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 10
    )
  }

  doc.save("relatorio-financeiro.pdf")
}
