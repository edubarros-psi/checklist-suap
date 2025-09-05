import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

function NotificacaoPage() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('notificacaoFormData');
    return savedData ? JSON.parse(savedData) : {
      nomePaciente: '',
      dataInternacao: '',
      tipoInternacao: '', // Voluntária, Involuntária, Compulsória
      motivo: '',
      dataNotificacao: '',
      observacoes: '',
    };
  });

  const [diasRestantes, setDiasRestantes] = useState(null);

  useEffect(() => {
    localStorage.setItem('notificacaoFormData', JSON.stringify(formData));

    if (formData.tipoInternacao === 'Involuntária' && formData.dataInternacao) {
      const dataInternacao = new Date(formData.dataInternacao);
      const hoje = new Date();
      const diffTime = Math.abs(hoje - dataInternacao);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Se a internação involuntária ocorreu há mais de 72 horas, o prazo de notificação já passou.
      // Caso contrário, calcula os dias restantes para as 72 horas.
      if (diffDays > 3) { // Mais de 3 dias (72 horas)
        setDiasRestantes(-1); // Indica que o prazo já passou
      } else {
        setDiasRestantes(3 - diffDays); // 3 dias - dias passados
      }
    } else {
      setDiasRestantes(null);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generatePdf = () => {
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

  const getNotificationMessage = () => {
    if (formData.tipoInternacao === 'Involuntária' && diasRestantes !== null) {
      if (diasRestantes === -1) {
        return <p className="text-red-600 font-bold">⚠️ Prazo de 72 horas para notificação de internação involuntária EXCEDIDO!</p>;
      } else if (diasRestantes === 0) {
        return <p className="text-orange-600 font-bold">❗ Prazo de 72 horas para notificação de internação involuntária ENCERRA HOJE!</p>;
      } else if (diasRestantes > 0) {
        return <p className="text-green-600">✅ Você tem {diasRestantes} dia(s) restante(s) para notificar a internação involuntária (prazo de 72 horas).</p>;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Notificação de Internação</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomePaciente">
              Nome do Paciente
            </label>
            <input
              type="text"
              id="nomePaciente"
              name="nomePaciente"
              value={formData.nomePaciente}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataInternacao">
              Data da Internação
            </label>
            <input
              type="date"
              id="dataInternacao"
              name="dataInternacao"
              value={formData.dataInternacao}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoInternacao">
              Tipo de Internação
            </label>
            <select
              id="tipoInternacao"
              name="tipoInternacao"
              value={formData.tipoInternacao}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecione...</option>
              <option value="Voluntária">Voluntária</option>
              <option value="Involuntária">Involuntária</option>
              <option value="Compulsória">Compulsória</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motivo">
              Motivo da Internação
            </label>
            <input
              type="text"
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataNotificacao">
              Data da Notificação
            </label>
            <input
              type="date"
              id="dataNotificacao"
              name="dataNotificacao"
              value={formData.dataNotificacao}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {getNotificationMessage()}

        <div className="mt-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoes">
            Observações
          </label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            rows="5"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={generatePdf}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Gerar PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificacaoPage;
