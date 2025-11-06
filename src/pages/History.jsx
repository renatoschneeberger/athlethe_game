import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function History() {
  const { portfolio, setPortfolio, setLoading, setToast } = useStore();
  const [loading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      setLocalLoading(true);
      try {
        const data = await mockApi.getPortfolio();
        setPortfolio(data);
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      } finally {
        setLocalLoading(false);
      }
    };

    loadPortfolio();
  }, [setPortfolio, setToast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  const history = portfolio?.history || [];
  const sortedHistory = [...history].sort((a, b) => new Date(b.ts) - new Date(a.ts));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        <Card className="mb-6">
          <h1 className="text-2xl font-bold mb-6">Trade-History & Lern-Snippets</h1>

          {/* Mini Chart Placeholder */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-sm font-semibold mb-2 text-gray-600">Portfolio-Verlauf (letzte 14 Tage)</h2>
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-xs text-gray-500">Mini-Chart (Mock)</div>
            </div>
          </div>
        </Card>

        {sortedHistory.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-xl font-semibold mb-2">Noch keine Trades</h2>
              <p className="text-gray-600 mb-4">
                Starte deinen ersten Trade im Portfolio
              </p>
              <Link to="/app/portfolio">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Zum Portfolio
                </button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((entry) => (
              <Card key={entry.id}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={entry.type === 'BUY' ? 'success' : 'danger'}>
                        {entry.type === 'BUY' ? 'Kauf' : 'Verkauf'}
                      </Badge>
                      <span className="font-semibold">{entry.symbol}</span>
                      <span className="text-gray-600">
                        {entry.qty} @ {entry.price.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{entry.rationale}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(entry.ts).toLocaleString('de-DE')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

