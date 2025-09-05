import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

function VisitaTecnicaPage() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('visitaTecnicaFormData');
    return savedData ? JSON.parse(savedData) : {
      nomeClinica: '',
      dataVisita: '',
      avaliador: '',
      // Seções do checklist
      secao1: { item1: false, item2: false, observacoes: '' },
      secao2: { item1: false, item2: false, observacoes: '' },
      // Adicione mais seções conforme necessário
    };
  });

  useEffect(() => {
    localStorage.setItem('visitaTecnicaFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [section, item] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [item]: type === 'checkbox' ? checked : value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const generatePdf = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checklist de Visita Técnica</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeClinica">
              Nome da Clínica
            </label>
            <input
              type="text"
              id="nomeClinica"
              name="nomeClinica"
              value={formData.nomeClinica}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataVisita">
              Data da Visita
            </label>
            <input
              type="date"
              id="dataVisita"
              name="dataVisita"
              value={formData.dataVisita}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avaliador">
              Avaliador
            </label>
            <input
              type="text"
              id="avaliador"
              name="avaliador"
              value={formData.avaliador}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        {/* Seção 1 */}
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Seção 1: Documentação</h2>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="secao1.item1"
                checked={formData.secao1.item1}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Item de Documentação 1 (Ex: Alvará Sanitário)</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="secao1.item2"
                checked={formData.secao1.item2}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Item de Documentação 2 (Ex: Licença de Funcionamento)</span>
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secao1.observacoes">
              Observações da Seção 1
            </label>
            <textarea
              id="secao1.observacoes"
              name="secao1.observacoes"
              value={formData.secao1.observacoes}
              onChange={handleChange}
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>

        {/* Seção 2 */}
        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Seção 2: Estrutura Física</h2>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="secao2.item1"
                checked={formData.secao2.item1}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Item de Estrutura 1 (Ex: Acessibilidade)</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="secao2.item2"
                checked={formData.secao2.item2}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Item de Estrutura 2 (Ex: Condições de Higiene)</span>
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secao2.observacoes">
              Observações da Seção 2
            </label>
            <textarea
              id="secao2.observacoes"
              name="secao2.observacoes"
              value={formData.secao2.observacoes}
              onChange={handleChange}
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4">
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

export default VisitaTecnicaPage;
