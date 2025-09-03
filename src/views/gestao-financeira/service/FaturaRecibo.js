import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function gerarFaturaPDF(mensalidade) {
  console.log("Gerando fatura com os dados:", mensalidade);
  const doc = new jsPDF();

  // ======= Cabeçalho Empresa =======
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DCG EDU - COMÉRCIO E SERVIÇOS (SU), LDA", 14, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("RUA NOSSA SENHORA DA MUXIMA, Nº 40, KINAXIXI - LUANDA", 14, 26);
  doc.text(
    "Tel: (244) 943109392 | Web: www.7smiles.com.br | E-mail: dcgeducation@gmail.com",
    14,
    32
  );
  doc.text("Contribuinte: 5000876666", 14, 38);

  // Linha separadora
  doc.line(14, 42, 195, 42);

  // ======= Dados do Aluno/Pagador =======
  doc.setFont("helvetica", "bold");
  doc.text("Exmo.(s) Sr(s):", 14, 50);
  doc.setFont("helvetica", "normal");
  doc.text(mensalidade.pagador || mensalidade.alunos?.nome, 14, 56);
  doc.text(`NIF: ${mensalidade.nif || "-----"}`, 14, 62);
  doc.text(mensalidade.endereco || "Luanda, Angola", 14, 68);

  // ======= Dados da Fatura =======
  const hoje = new Date().toLocaleDateString("pt-PT");
  doc.setFont("helvetica", "bold");
  doc.text(`Factura-recibo n.º ${mensalidade.id}`, 140, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`Data de emissão: ${hoje}`, 140, 56);
  doc.text(
    `Vencimento: ${mensalidade.data_pagamento || hoje}`,
    140,
    62
  );

  // ======= Tabela de Itens =======
  autoTable(doc, {
    startY: 80,
    head: [["Descrição", "Preço Unitário", "Qtd.", "Desconto", "Total"]],
    body: [
      [
        mensalidade.tipo || "Mensalidade Escolar",
        `${mensalidade.valor_unitario?.toLocaleString()} Kz`,
        mensalidade.quantidade || 1,
        `${mensalidade.desconto || 0} Kz`,
        `${mensalidade.total?.toLocaleString()} Kz`,
      ],
    ],
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  // ======= Resumo =======
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont("helvetica", "bold");
  doc.text("Resumo", 14, finalY);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Total ilíquido: ${mensalidade.valor_unitario?.toLocaleString()} Kz`,
    14,
    finalY + 6
  );
  doc.text(`Desconto: ${mensalidade.desconto?.toLocaleString() || 0} Kz`, 14, finalY + 12);
  doc.text(`Total: ${mensalidade.total?.toLocaleString()} Kz`, 14, finalY + 18);

  // ======= Dados Bancários =======
  let bankY = finalY + 30;
  doc.setFont("helvetica", "bold");
  doc.text("Dados Bancários", 14, bankY);
  doc.setFont("helvetica", "normal");
  doc.text("IBAN 1: AO060044000123456789101", 14, bankY + 6);
  doc.text("IBAN 2: AO060055000987654321101", 14, bankY + 12);

  // Rodapé
  doc.setFontSize(8);
  doc.text(
    "Processado por programa validado n.º 144/AGT/2019 | Factplus",
    14,
    290
  );

  // Salvar PDF
  doc.save(`Fatura_${mensalidade.id}.pdf`);
}




// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function gerarFaturaPDF(data) {
//   console.log("Gerando fatura com os dados:", data);
//   const doc = new jsPDF();

//   // ======= Cabeçalho =======
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "bold");
//   doc.text("DCG EDU - COMÉRCIO E SERVIÇOS (SU), LDA", 14, 20);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(10);
//   doc.text("RUA NOSSA SENHORA DA MUXIMA, Nº 40, KINAXIXI - LUANDA", 14, 26);
//   doc.text("Tel: (244) 943109392 | Web: www.7smiles.com.br | E-mail: dcgeducation@gmail.com", 14, 32);
//   doc.text("Contribuinte: 5000876666", 14, 38);

//   // Linha separadora
//   doc.line(14, 42, 195, 42);

//   // ======= Dados do Cliente =======
//   doc.setFont("helvetica", "bold");
//   doc.text("Exmo.(s) Sr(s):", 14, 50);
//   doc.setFont("helvetica", "normal");
//   doc.text(data.clientName, 14, 56);
//   doc.text(data.clientAddress, 14, 62);

//   // ======= Dados da Fatura =======
//   doc.setFont("helvetica", "bold");
//   doc.text(`Factura-recibo n.º ${data.invoiceNumber}`, 140, 50);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Data de emissão: ${data.issueDate}`, 140, 56);
//   doc.text(`Vencimento: ${data.dueDate}`, 140, 62);

//   // ======= Tabela de Itens =======
//   autoTable(doc, {
//     startY: 75,
//     head: [["Código", "Descrição", "Preço Uni.", "Qtd.", "IVA %", "Total"]],
//     body: data.items.map((item) => [
//       item.code,
//       item.description,
//       `${item.price.toLocaleString()} Kz`,
//       item.qty,
//       item.tax,
//       `${(item.price * item.qty).toLocaleString()} Kz`,
//     ]),
//     theme: "grid",
//     styles: { fontSize: 9 },
//     headStyles: { fillColor: [41, 128, 185] },
//   });

//   // ======= Resumo =======
//   let finalY = doc.lastAutoTable.finalY + 10;
//   doc.setFont("helvetica", "bold");
//   doc.text("Resumo", 14, finalY);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Total ilíquido: ${data.subtotal.toLocaleString()} Kz`, 14, finalY + 6);
//   doc.text(`IVA: ${data.taxValue.toLocaleString()} Kz`, 14, finalY + 12);
//   doc.text(`Total: ${data.total.toLocaleString()} Kz`, 14, finalY + 18);

//   // ======= Dados Bancários =======
//   let bankY = finalY + 30;
//   doc.setFont("helvetica", "bold");
//   doc.text("Dados Bancários", 14, bankY);
//   doc.setFont("helvetica", "normal");
//   data.ibans.forEach((iban, idx) => {
//     doc.text(`IBAN ${idx + 1}: ${iban}`, 14, bankY + (idx + 1) * 6);
//   });

//   // Rodapé
//   doc.setFontSize(8);
//   doc.text("Processado por programa validado n.º 144/AGT/2019 | Factplus", 14, 290);

//   // Salvar ou retornar
//   doc.save(`${data.invoiceNumber}.pdf`);
// }
