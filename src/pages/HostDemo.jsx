import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function HostDemo() {
  const [sessionOpen, setSessionOpen] = useState(true);
  const [questionPool, setQuestionPool] = useState('default');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetLeaderboard = () => {
    // In a real app, this would reset the leaderboard
    setShowResetModal(false);
    alert('Leaderboard wurde zurückgesetzt (Demo)');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        <Card>
          <h1 className="text-2xl font-bold mb-6">Host-Demo</h1>
          <p className="text-sm text-gray-600 mb-6">
            Demo-Kontrollen für Session-Management
          </p>

          <div className="space-y-6">
            {/* Session Toggle */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Session öffnen/schließen</h3>
                  <p className="text-sm text-gray-600">
                    Steuert den Status der Session auf der Join-Seite
                  </p>
                </div>
                <Badge variant={sessionOpen ? 'success' : 'danger'}>
                  {sessionOpen ? 'Geöffnet' : 'Geschlossen'}
                </Badge>
              </div>
              <Button
                variant={sessionOpen ? 'danger' : 'primary'}
                onClick={() => setSessionOpen(!sessionOpen)}
              >
                {sessionOpen ? 'Session schließen' : 'Session öffnen'}
              </Button>
            </div>

            {/* Question Pool */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Fragenpool wählen</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ändert die Fragen im Mini-Game (lädt andere Mock-Datei)
              </p>
              <select
                value={questionPool}
                onChange={(e) => setQuestionPool(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Standard-Pool</option>
                <option value="advanced">Erweitert</option>
                <option value="beginner">Anfänger</option>
              </select>
            </div>

            {/* Reset Leaderboard */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Leaderboard zurücksetzen</h3>
              <p className="text-sm text-gray-600 mb-4">
                Setzt das Ranking auf Startwerte zurück
              </p>
              <Button
                variant="danger"
                onClick={() => setShowResetModal(true)}
              >
                Leaderboard zurücksetzen
              </Button>
            </div>
          </div>
        </Card>

        {/* Reset Confirmation Modal */}
        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="Leaderboard zurücksetzen?"
        >
          <p className="mb-4 text-gray-600">
            Möchtest du wirklich das Leaderboard zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleResetLeaderboard}
              className="flex-1"
            >
              Zurücksetzen
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowResetModal(false)}
              className="flex-1"
            >
              Abbrechen
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

