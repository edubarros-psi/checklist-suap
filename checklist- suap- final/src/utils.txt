import { jsPDF } from 'jspdf';

export const generateVisitaTecnicaPdf = (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Checklist de Visita Técnica', 14, 22);

  doc.setFontSize(12);
  doc.text(`Clínica: ${formData.nomeClinica}`, 14, 32);
  doc.text(`Data da Visita: ${formData.dataVisita}`, 14, 39);
  doc.text(`Avaliador: ${formData.avaliador}`, 14, 46);

  let y = 56;

  const addSection = (title, sectionData) => {
    doc.setFontSize(14);
    doc.text(title, 14, y);
    y += 7;
    for (const key in sectionData) {
      if (key === 'observacoes') {
        doc.setFontSize(10);
        doc.text(`Observações: ${sectionData[key]}`, 18, y);
        y += 7;
      } else {
        doc.setFontSize(10);
        doc.text(`- ${key}: ${sectionData[key] ? 'Conforme' : 'Não Conforme'}`, 18, y);
        y += 7;
      }
    }
    y += 5;
  };

  addSection('Seção 1: Documentação', formData.secao1);
  addSection('Seção 2: Estrutura Física', formData.secao2);
  // Adicione mais chamadas para addSection conforme as seções do seu formulário

  doc.save('visita_tecnica_checklist.pdf');
};

export const generateCensoPdf = (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Censo de Internações', 14, 22);

  doc.setFontSize(12);
  doc.text(`Data do Censo: ${formData.dataCenso}`, 14, 32);
  doc.text(`Instituição: ${formData.nomeInstituicao}`, 14, 39);

  let y = 49;

  doc.setFontSize(14);
  doc.text('Quantitativo de Internações:', 14, y);
  y += 7;
  doc.setFontSize(12);
  doc.text(`- Voluntárias: ${formData.internacoesVoluntarias}`, 18, y);
  y += 7;
  doc.text(`- Involuntárias: ${formData.internacoesInvoluntarias}`, 18, y);
  y += 7;
  doc.text(`- Compulsórias: ${formData.internacoesCompulsorias}`, 18, y);
  y += 10;

  doc.setFontSize(14);
  doc.text('Observações Gerais:', 14, y);
  y += 7;
  doc.setFontSize(12);
  doc.text(formData.observacoesGerais, 18, y, { maxWidth: 180 });

  doc.save('censo_internacoes.pdf');
};

export const generateNotificacaoPdf = (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Notificação de Internação', 14, 22);

  doc.setFontSize(12);
  doc.text(`Paciente: ${formData.nomePaciente}`, 14, 32);
  doc.text(`Data da Internação: ${formData.dataInternacao}`, 14, 39);
  doc.text(`Tipo de Internação: ${formData.tipoInternacao}`, 14, 46);
  doc.text(`Motivo: ${formData.motivo}`, 14, 53);
  doc.text(`Data da Notificação: ${formData.dataNotificacao}`, 14, 60);

  let y = 70;
  doc.setFontSize(14);
  doc.text('Observações:', 14, y);
  y += 7;
  doc.setFontSize(12);
  doc.text(formData.observacoes, 18, y, { maxWidth: 180 });

  doc.save('notificacao_internacao.pdf');
};
