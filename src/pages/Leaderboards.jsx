import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function Leaderboards() {
  const { setLoading, setToast } = useStore();
  const [loading, setLocalLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('week');
  const [filter, setFilter] = useState('all');
  const [leaderboardData, setLeaderboardData] = useState(null);

  useEffect(() => {
    loadLeaderboard();
  }, [activeTab]);

  const loadLeaderboard = async () => {
    setLocalLoading(true);
    try {
      const data = await mockApi.getLeaderboard(activeTab);
      setLeaderboardData(data);
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setLocalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        <Card>
          <h1 className="text-2xl font-bold mb-6">Leaderboards</h1>

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

          {/* Filter */}
          <div className="mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alle</option>
              <option value="my-group">Meine Gruppe</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Rang</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-right py-3 px-4">Rendite %</th>
                  <th className="text-right py-3 px-4">Trades</th>
                  <th className="text-right py-3 px-4">Letzter Trade</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData?.map((entry, index) => {
                  const prevRank = index > 0 ? leaderboardData[index - 1].rank : null;
                  const isNewInTop10 = entry.rank <= 10 && prevRank && entry.rank < prevRank;
                  
                  return (
                    <tr key={entry.rank} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{entry.rank}</span>
                          {entry.rank <= 3 && <Badge variant="top3">Top {entry.rank}</Badge>}
                          {isNewInTop10 && <Badge variant="success">Neu in Top 10</Badge>}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{entry.name}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {entry.score}%
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">
                        {Math.floor(entry.score / 10) + 5}
                      </td>
                      <td className="py-3 px-4 text-right text-sm text-gray-500">
                        {entry.delta !== undefined ? `${Math.abs(entry.delta)}h` : 'N/A'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

