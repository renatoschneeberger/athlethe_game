import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Skeleton from '../components/Skeleton';

export default function SessionJoin() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { setSession, setUser, session, loading, setLoading, setError, setToast } = useStore();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [error, setLocalError] = useState('');

  useEffect(() => {
    const loadSession = async () => {
      setLoading(true);
      try {
        const data = await mockApi.getSession(code);
        setSession(data);
      } catch (err) {
        setError(err.message);
        setToast({ type: 'error', message: err.message });
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      loadSession();
    }
  }, [code, setSession, setLoading, setError, setToast]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleJoin = () => {
    if (!nickname.trim()) {
      setLocalError('Bitte Nickname angeben');
      return;
    }

    setUser({ nickname, email, sessionCode: code });
    navigate(`/session/${code}/minigame`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <p className="text-red-600">Session nicht gefunden</p>
            <Button onClick={() => navigate('/')} className="mt-4">Zurück</Button>
          </Card>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">{session.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Start in</span>
            <span className="font-mono font-semibold text-blue-600">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Session beitreten</h2>
          
          <Input
            label="Nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setLocalError('');
            }}
            placeholder="Dein Nickname"
            required
            error={error}
          />

          <Input
            label="E-Mail (optional)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.com"
          />

          <div className="flex gap-3 mt-6">
            <Button onClick={handleJoin} className="flex-1">
              Beitreten
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Zurück
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

