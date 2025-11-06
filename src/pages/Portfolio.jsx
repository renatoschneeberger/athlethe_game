import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function Portfolio() {
  const { 
    portfolio, 
    setPortfolio, 
    assets, 
    setAssets,
    updatePortfolioAfterTrade,
    setLoading,
    setToast 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState('holdings');
  const [loading, setLocalLoading] = useState(true);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('BUY');
  const [tradeSymbol, setTradeSymbol] = useState('');
  const [tradeQty, setTradeQty] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLocalLoading(true);
      try {
        const [portfolioData, assetsData] = await Promise.all([
          mockApi.getPortfolio(),
          mockApi.getAssets()
        ]);
        setPortfolio(portfolioData);
        setAssets(assetsData);
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      } finally {
        setLocalLoading(false);
      }
    };

    loadData();
  }, [setPortfolio, setAssets, setToast]);

  const handleTrade = (symbol, type) => {
    setTradeSymbol(symbol);
    setTradeType(type);
    setTradeQty('');
    setShowTradeModal(true);
  };

  const handleTradeSubmit = async () => {
    const qty = parseFloat(tradeQty);
    if (!qty || qty <= 0) {
      setToast({ type: 'error', message: 'Bitte gültige Menge eingeben' });
      return;
    }

    const asset = assets.find(a => a.symbol === tradeSymbol);
    if (!asset) return;

    const price = asset.price;
    const totalCost = qty * price;

    if (tradeType === 'BUY' && totalCost > portfolio.cash) {
      setToast({ type: 'error', message: 'Nicht genügend Cash' });
      return;
    }

    const holding = portfolio.holdings.find(h => h.symbol === tradeSymbol);
    if (tradeType === 'SELL' && (!holding || holding.qty < qty)) {
      setToast({ type: 'error', message: 'Nicht genügend Bestand' });
      return;
    }

    setSubmitting(true);
    try {
      await mockApi.executeTrade(tradeSymbol, qty, tradeType);
      updatePortfolioAfterTrade(tradeSymbol, qty, price, tradeType);
      setShowTradeModal(false);
      setToast({ type: 'success', message: `${tradeType === 'BUY' ? 'Kauf' : 'Verkauf'} erfolgreich!` });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
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

  const totalValue = portfolio?.holdings.reduce((sum, h) => sum + h.qty * h.marketPrice, 0) || 0;
  const totalCost = portfolio?.holdings.reduce((sum, h) => sum + h.qty * h.avgPrice, 0) || 0;
  const pnl = totalValue - totalCost;
  const pnlPercent = totalCost > 0 ? ((pnl / totalCost) * 100).toFixed(2) : 0;

  const asset = assets?.find(a => a.symbol === tradeSymbol);
  const estimatedCost = asset && tradeQty ? parseFloat(tradeQty) * asset.price : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Zurück zum Dashboard
          </Link>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <div className="text-sm text-gray-600 mb-1">Spielgeld-Kontostand</div>
            <div className="text-2xl font-bold">
              {portfolio?.cash.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600 mb-1">Tages-P&L</div>
            <div className={`text-2xl font-bold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {pnl >= 0 ? '+' : ''}{pnl.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })} ({pnlPercent}%)
            </div>
          </Card>
          <Card>
            <div className="text-sm text-gray-600 mb-1">Portfolio-Wert</div>
            <div className="text-2xl font-bold">
              {(totalValue + (portfolio?.cash || 0)).toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
            </div>
          </Card>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Simulation – kein echtes Geld
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('holdings')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'holdings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Holdings
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'market'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Markt
            </button>
          </div>
        </div>

        {/* Holdings Tab */}
        {activeTab === 'holdings' && (
          <Card>
            <h2 className="text-xl font-semibold mb-4">Meine Holdings</h2>
            {portfolio?.holdings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Noch keine Holdings</p>
                <p className="text-sm mt-2">Starte deinen ersten Trade im Markt-Tab</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Asset</th>
                      <th className="text-right py-3 px-4">Menge</th>
                      <th className="text-right py-3 px-4">Kaufpreis</th>
                      <th className="text-right py-3 px-4">Marktpreis</th>
                      <th className="text-right py-3 px-4">P&L</th>
                      <th className="text-right py-3 px-4">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio?.holdings.map((holding) => {
                      const asset = assets?.find(a => a.symbol === holding.symbol);
                      const pnl = (holding.marketPrice - holding.avgPrice) * holding.qty;
                      const pnlPercent = ((holding.marketPrice - holding.avgPrice) / holding.avgPrice * 100).toFixed(2);
                      return (
                        <tr key={holding.symbol} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{holding.symbol}</td>
                          <td className="py-3 px-4 text-right">{holding.qty}</td>
                          <td className="py-3 px-4 text-right">
                            {holding.avgPrice.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            {holding.marketPrice.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
                          </td>
                          <td className={`py-3 px-4 text-right font-semibold ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {pnl >= 0 ? '+' : ''}{pnl.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })} ({pnlPercent}%)
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              onClick={() => handleTrade(holding.symbol, 'SELL')}
                              className="text-sm"
                            >
                              Verkaufen
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* Market Tab */}
        {activeTab === 'market' && (
          <Card>
            <h2 className="text-xl font-semibold mb-4">Top Assets</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Asset</th>
                    <th className="text-right py-3 px-4">Preis</th>
                    <th className="text-right py-3 px-4">Δ%</th>
                    <th className="text-right py-3 px-4">Aktion</th>
                  </tr>
                </thead>
                <tbody>
                  {assets?.map((asset) => (
                    <tr key={asset.symbol} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{asset.symbol}</div>
                          <div className="text-sm text-gray-500">{asset.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {asset.price.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={asset.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          onClick={() => handleTrade(asset.symbol, 'BUY')}
                          className="text-sm"
                        >
                          Kaufen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Trade Modal */}
        <Modal
          isOpen={showTradeModal}
          onClose={() => setShowTradeModal(false)}
          title={tradeType === 'BUY' ? 'Kaufen' : 'Verkaufen'}
        >
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Asset: <span className="font-semibold">{tradeSymbol}</span>
            </p>
            {asset && (
              <p className="text-sm text-gray-600">
                Aktueller Preis: {asset.price.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
              </p>
            )}
          </div>

          <Input
            label="Menge"
            type="number"
            value={tradeQty}
            onChange={(e) => setTradeQty(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />

          {asset && tradeQty && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Geschätzter Betrag:</div>
              <div className="text-lg font-semibold">
                {estimatedCost.toLocaleString('de-DE', { style: 'currency', currency: 'USD' })}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                (inkl. simulierter Slippage)
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleTradeSubmit}
              loading={submitting}
              className="flex-1"
            >
              Bestätigen
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowTradeModal(false)}
            >
              Abbrechen
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

