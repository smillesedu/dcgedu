// src/hooks/useFatura.js
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import gerarFaturaPDF from "../service/FaturaRecibo"

export const useFatura = () => {
  // Função para gerar fatura (download)
  const gerarFatura = (mensalidade) => {
    const doc = gerarFaturaPDF(mensalidade)
    doc.save(`Fatura-${mensalidade.alunos?.nome || "cliente"}-${mensalidade.mes_referencia}.pdf`)
  }

  // Função para pré-visualizar no navegador
  const previewFatura = (mensalidade) => {
    const doc = gerarFaturaPDF(mensalidade)
    const blob = doc.output("bloburl")
    window.open(blob, "_blank") // abre em nova aba
  }


  return { gerarFatura, previewFatura }
}
