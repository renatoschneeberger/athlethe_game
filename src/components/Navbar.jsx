import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith('/app');
  const isHostRoute = location.pathname.startsWith('/host');

  if (location.pathname === '/' || location.pathname.startsWith('/session')) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Athlete Game
            </Link>
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Start Demo
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { path: '/app', label: 'Dashboard' },
    { path: '/app/challenge', label: 'Challenge' },
    { path: '/app/portfolio', label: 'Portfolio' },
    { path: '/app/leaderboards', label: 'Leaderboards' },
    { path: '/app/history', label: 'History' },
    { path: '/mock/whatsapp', label: 'WhatsApp' },
  ];

  if (isHostRoute) {
    navItems.push({ path: '/host', label: 'Host' });
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/app" className="text-xl font-bold text-blue-600">
            Athlete Game
          </Link>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

