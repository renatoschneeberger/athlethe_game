import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Landing() {
  const [sessionCode, setSessionCode] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (sessionCode.trim()) {
      navigate(`/session/${sessionCode.toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Athlete Game</h1>
          <p className="text-lg text-gray-600">Lerne Trading durch Real-Case-Szenarien</p>
        </div>

        <Card highlight className="mb-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Session beitreten</h2>
            
            {/* QR Code Dummy */}
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-48 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-24 h-24 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <p className="text-sm">QR-Code</p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">Oder Session-Code eingeben:</p>
            
            <div className="max-w-md mx-auto">
              <Input
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                placeholder="z.B. ABC123"
                className="mb-4 text-center text-lg font-mono"
                onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
              />
              <Button onClick={handleJoin} className="w-full" disabled={!sessionCode.trim()}>
                Jetzt Session beitreten
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Demo mit Dummy-Daten – keine echten Integrationen</p>
        </div>
      </div>
    </div>
  );
}

