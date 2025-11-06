import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function WhatsAppMock() {
  const { setLoading, setToast } = useStore();
  const [loading, setLocalLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      setLocalLoading(true);
      try {
        const data = await mockApi.getWhatsAppMessages();
        setMessages(data);
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      } finally {
        setLocalLoading(false);
      }
    };

    loadMessages();
  }, [setToast]);

  if (loading) {
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
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        <Card>
          <h1 className="text-2xl font-bold mb-4">WhatsApp Companion – Mock</h1>
          
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Nur Demo – keine echte Integration
            </p>
          </div>

          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{message.title}</h3>
                    <p className="text-sm text-gray-600">{message.type}</p>
                  </div>
                  <Badge variant={message.status === 'sent' ? 'success' : 'default'}>
                    {message.status === 'sent' ? 'Gesendet' : 'Geplant'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  Geplant: {new Date(message.scheduled).toLocaleString('de-DE')}
                </p>
                <p className="text-sm text-gray-700 line-clamp-2">{message.preview}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Preview Modal */}
        <Modal
          isOpen={selectedMessage !== null}
          onClose={() => setSelectedMessage(null)}
          title="WhatsApp-Nachricht Preview"
        >
          {selectedMessage && (
            <div>
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    AG
                  </div>
                  <div>
                    <div className="font-semibold">Athlete Game</div>
                    <div className="text-xs text-gray-500">
                      {new Date(selectedMessage.scheduled).toLocaleString('de-DE')}
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.preview}</p>
              </div>
              <div className="text-xs text-gray-500">
                <p>Typ: {selectedMessage.type}</p>
                <p>Status: {selectedMessage.status === 'sent' ? 'Gesendet' : 'Geplant'}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

