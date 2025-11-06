import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Landing from './pages/Landing';
import SessionJoin from './pages/SessionJoin';
import MiniGame from './pages/MiniGame';
import SessionLeaderboard from './pages/SessionLeaderboard';
import Dashboard from './pages/Dashboard';
import Challenge from './pages/Challenge';
import Portfolio from './pages/Portfolio';
import Leaderboards from './pages/Leaderboards';
import History from './pages/History';
import WhatsAppMock from './pages/WhatsAppMock';
import HostDemo from './pages/HostDemo';

// Base path für GitHub Pages
// Vite setzt BASE_URL automatisch basierend auf vite.config.js base
let basePath = import.meta.env.BASE_URL;

// Fallback: Erkenne Base Path aus window.location
if (!basePath || basePath === '/') {
  const path = window.location.pathname;
  // Wenn wir auf GitHub Pages sind, sollte der Pfad mit /athlethe_game/ beginnen
  if (path.startsWith('/athlethe_game/')) {
    basePath = '/athlethe_game';
  } else {
    basePath = '';
  }
}

// Normalisiere: Entferne trailing slash, füge leading slash hinzu
basePath = basePath.replace(/\/$/, ''); // Entferne trailing slash
if (basePath && !basePath.startsWith('/')) {
  basePath = '/' + basePath;
}

// Debug-Log (immer sichtbar für Troubleshooting)
console.log('🔍 Router Debug Info:');
console.log('  BASE_URL:', import.meta.env.BASE_URL);
console.log('  window.location.pathname:', window.location.pathname);
console.log('  window.location.href:', window.location.href);
console.log('  Calculated basePath:', basePath);
console.log('  Environment:', import.meta.env.MODE);

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Toast />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/session/:code" element={<SessionJoin />} />
          <Route path="/session/:code/minigame" element={<MiniGame />} />
          <Route path="/session/:code/leaderboard" element={<SessionLeaderboard />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="/app/challenge" element={<Challenge />} />
          <Route path="/app/portfolio" element={<Portfolio />} />
          <Route path="/app/leaderboards" element={<Leaderboards />} />
          <Route path="/app/history" element={<History />} />
          <Route path="/mock/whatsapp" element={<WhatsAppMock />} />
          <Route path="/host" element={<HostDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
