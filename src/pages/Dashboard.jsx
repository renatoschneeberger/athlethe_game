import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function Dashboard() {
  const { 
    challenge, 
    setChallenge, 
    portfolio, 
    setPortfolio,
    setToast 
  } = useStore();
  
  const [loading, setLocalLoading] = useState(true);
  const [weekNumber] = useState(7);
  const [totalWeeks] = useState(12);

  useEffect(() => {
    const loadData = async () => {
      setLocalLoading(true);
      try {
        const [challengeData, portfolioData] = await Promise.all([
          mockApi.getChallenge(),
          mockApi.getPortfolio()
        ]);
        setChallenge(challengeData);
        setPortfolio(portfolioData);
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      } finally {
        setLocalLoading(false);
      }
    };

    loadData();
  }, [setChallenge, setPortfolio, setToast]);

  const totalValue = portfolio?.holdings.reduce((sum, h) => sum + h.qty * h.marketPrice, 0) || 0;
  const totalCost = portfolio?.holdings.reduce((sum, h) => sum + h.qty * h.avgPrice, 0) || 0;
  const pnl = totalValue - totalCost;
  const pnlPercent = totalCost > 0 ? ((pnl / totalCost) * 100).toFixed(2) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-64 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Season Dashboard</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Woche {weekNumber} von {totalWeeks}</span>
            <Badge variant="info">Aktive Season</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">Nächster Check-in: Montag, 08:00 Uhr</p>
        </div>

        {/* Challenge Card */}
        <Card highlight className="mb-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Aktuelle Challenge</h2>
              <p className="text-gray-600 mb-4">{challenge?.title || 'Keine aktive Challenge'}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Fällig: {challenge?.deadline ? new Date(challenge.deadline).toLocaleDateString('de-DE') : 'N/A'}</span>
                <Badge variant={challenge?.status === 'active' ? 'success' : 'default'}>
                  {challenge?.status || 'Inaktiv'}
                </Badge>
              </div>
            </div>
            <Link to="/app/challenge">
              <Button>Los geht's</Button>
            </Link>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Performance Card */}
          <Card>
            <h3 className="font-semibold mb-2">Meine Performance</h3>
            <div className="mb-4">
              <div className="text-2xl font-bold text-blue-600">{pnlPercent}%</div>
              <div className="text-sm text-gray-600">
                {pnl >= 0 ? '+' : ''}{pnl.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
              </div>
            </div>
            <div className="h-24 bg-gray-100 rounded flex items-end justify-center">
              <div className="text-xs text-gray-500">Mini-Chart (Mock)</div>
            </div>
          </Card>

          {/* Portfolio Value */}
          <Card>
            <h3 className="font-semibold mb-2">Portfolio-Wert</h3>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {(totalValue + (portfolio?.cash || 0)).toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
            </div>
            <div className="text-sm text-gray-600">
              Cash: {portfolio?.cash.toLocaleString('de-DE', { style: 'currency', currency: 'USD' }) || 0}
            </div>
          </Card>

          {/* Next Check-in */}
          <Card>
            <h3 className="font-semibold mb-2">Nächster Check-in</h3>
            <div className="text-2xl font-bold text-gray-900 mb-2">Montag</div>
            <div className="text-sm text-gray-600">08:00 Uhr</div>
            <div className="mt-4">
              <Badge variant="info">Geplant</Badge>
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/app/portfolio">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-2xl mb-2">💼</div>
                <div className="font-medium">Portfolio</div>
              </div>
            </Card>
          </Link>
          <Link to="/app/leaderboards">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-medium">Leaderboards</div>
              </div>
            </Card>
          </Link>
          <Link to="/app/history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">History</div>
              </div>
            </Card>
          </Link>
          <Link to="/mock/whatsapp">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-center">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-medium">WhatsApp</div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

