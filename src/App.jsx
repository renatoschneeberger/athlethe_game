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
// BASE_URL wird zur Build-Zeit durch Vite gesetzt
let basePath = import.meta.env.BASE_URL;

// Normalisiere basePath
if (!basePath || basePath === '/') {
  basePath = '';
} else {
  // Entferne trailing slash
  basePath = basePath.replace(/\/$/, '');
}

// Debug-Log (immer sichtbar für Troubleshooting)
console.log('🔍 Router Debug Info:');
console.log('  BASE_URL:', import.meta.env.BASE_URL);
console.log('  window.location.pathname:', typeof window !== 'undefined' ? window.location.pathname : 'N/A');
console.log('  window.location.href:', typeof window !== 'undefined' ? window.location.href : 'N/A');
console.log('  Using basePath:', basePath || '(empty - root)');
console.log('  Environment:', import.meta.env.MODE);

function App() {
  return (
    <BrowserRouter basename={basePath || undefined}>
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
