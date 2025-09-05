import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo aos Checklists SUAP</h1>
        <p className="text-gray-600 mb-8">Selecione o tipo de checklist que deseja preencher:</p>
        <nav className="space-y-4">
          <Link
            to="/visita-tecnica"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Visita Técnica
          </Link>
          <Link
            to="/censo"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Censo de Internações
          </Link>
          <Link
            to="/notificacao"
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
          >
            Notificação Involuntária
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default HomePage;
