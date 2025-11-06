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
// Importiert den base path aus vite.config.js (wird zur Build-Zeit ersetzt)
const basePath = import.meta.env.BASE_URL || '/';

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
