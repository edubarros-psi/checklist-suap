import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import VisitaTecnicaPage from './components/pages/VisitaTecnicaPage';
import CensoPage from './components/pages/CensoPage';
import NotificacaoPage from './components/pages/NotificacaoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visita-tecnica" element={<VisitaTecnicaPage />} />
        <Route path="/censo" element={<CensoPage />} />
        <Route path="/notificacao" element={<NotificacaoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
