import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function SessionLeaderboard() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { 
    leaderboardEmailSubmitted, 
    setLeaderboardEmailSubmitted,
    setLoading,
    setToast 
  } = useStore();
  
  const [showEmailModal, setShowEmailModal] = useState(!leaderboardEmailSubmitted);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLocalLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('week');

  useEffect(() => {
    if (leaderboardEmailSubmitted) {
      loadLeaderboard();
    }
  }, [leaderboardEmailSubmitted]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getLeaderboard(activeTab);
      setLeaderboardData(data);
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (leaderboardEmailSubmitted) {
      loadLeaderboard();
    }
  }, [activeTab, leaderboardEmailSubmitted]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      setEmailError('Bitte E-Mail angeben');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Bitte gültige E-Mail-Adresse eingeben');
      return;
    }

    setLocalLoading(true);
    try {
      await mockApi.submitEmail(email);
      setLeaderboardEmailSubmitted(true);
      setShowEmailModal(false);
      setToast({ type: 'success', message: 'E-Mail gespeichert!' });
      await loadLeaderboard();
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setLocalLoading(false);
    }
  };

  if (!leaderboardEmailSubmitted) {
    return (
      <Modal
        isOpen={showEmailModal}
        onClose={() => navigate('/')}
        title="Leaderboard anzeigen"
      >
        <p className="mb-4 text-gray-600">
          Bitte gib deine E-Mail-Adresse ein, um das Leaderboard zu sehen.
        </p>
        <Input
          label="E-Mail"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
          placeholder="deine@email.com"
          required
          error={emailError}
        />
        <div className="flex gap-3 mt-6">
          <Button onClick={handleEmailSubmit} loading={loading} className="flex-1">
            Anzeigen
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Abbrechen
          </Button>
        </div>
      </Modal>
    );
  }

  if (!leaderboardData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => setActiveTab('week')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'week'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Woche
            </button>
            <button
              onClick={() => setActiveTab('overall')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'overall'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Gesamt
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Rang</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-right py-3 px-4">Score</th>
                  <th className="text-right py-3 px-4">Δ</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr key={entry.rank} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{entry.rank}</span>
                        {entry.rank <= 3 && <Badge variant="top3">Top {entry.rank}</Badge>}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{entry.name}</td>
                    <td className="py-3 px-4 text-right font-semibold">{entry.score}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={entry.delta >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {entry.delta >= 0 ? '+' : ''}{entry.delta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Button onClick={() => navigate('/app')} className="w-full">
              Weiter zum Season Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

