import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

function CensoPage() {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('censoFormData');
    return savedData ? JSON.parse(savedData) : {
      dataCenso: '',
      nomeInstituicao: '',
      internacoesVoluntarias: 0,
      internacoesInvoluntarias: 0,
      internacoesCompulsorias: 0,
      observacoesGerais: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('censoFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseInt(value, 10) : value,
    }));
  };

  const generatePdf = () => {
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Censo de Internações</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataCenso">
              Data do Censo
            </label>
            <input
              type="date"
              id="dataCenso"
              name="dataCenso"
              value={formData.dataCenso}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeInstituicao">
              Nome da Instituição
            </label>
            <input
              type="text"
              id="nomeInstituicao"
              name="nomeInstituicao"
              value={formData.nomeInstituicao}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mb-6 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Quantitativo de Internações</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internacoesVoluntarias">
              Voluntárias
            </label>
            <input
              type="number"
              id="internacoesVoluntarias"
              name="internacoesVoluntarias"
              value={formData.internacoesVoluntarias}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internacoesInvoluntarias">
              Involuntárias
            </label>
            <input
              type="number"
              id="internacoesInvoluntarias"
              name="internacoesInvoluntarias"
              value={formData.internacoesInvoluntarias}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internacoesCompulsorias">
              Compulsórias
            </label>
            <input
              type="number"
              id="internacoesCompulsorias"
              name="internacoesCompulsorias"
              value={formData.internacoesCompulsorias}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacoesGerais">
            Observações Gerais
          </label>
          <textarea
            id="observacoesGerais"
            name="observacoesGerais"
            value={formData.observacoesGerais}
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

export default CensoPage;
