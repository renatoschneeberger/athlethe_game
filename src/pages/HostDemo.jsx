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
    alert('Leaderboard has been reset (Demo)');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        <Card>
          <h1 className="text-2xl font-bold mb-6">Host Demo</h1>
          <p className="text-sm text-gray-600 mb-6">
            Demo controls for session management
          </p>

          <div className="space-y-6">
            {/* Session Toggle */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold mb-1">Open/Close Session</h3>
                  <p className="text-sm text-gray-600">
                    Controls the session status on the join page
                  </p>
                </div>
                <Badge variant={sessionOpen ? 'success' : 'danger'}>
                  {sessionOpen ? 'Open' : 'Closed'}
                </Badge>
              </div>
              <Button
                variant={sessionOpen ? 'danger' : 'primary'}
                onClick={() => setSessionOpen(!sessionOpen)}
              >
                {sessionOpen ? 'Close Session' : 'Open Session'}
              </Button>
            </div>

            {/* Question Pool */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Select Question Pool</h3>
              <p className="text-sm text-gray-600 mb-4">
                Changes the questions in the mini-game (loads different mock file)
              </p>
              <select
                value={questionPool}
                onChange={(e) => setQuestionPool(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Standard Pool</option>
                <option value="advanced">Advanced</option>
                <option value="beginner">Beginner</option>
              </select>
            </div>

            {/* Reset Leaderboard */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Reset Leaderboard</h3>
              <p className="text-sm text-gray-600 mb-4">
                Resets the ranking to initial values
              </p>
              <Button
                variant="danger"
                onClick={() => setShowResetModal(true)}
              >
                Reset Leaderboard
              </Button>
            </div>
          </div>
        </Card>

        {/* Reset Confirmation Modal */}
        <Modal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          title="Reset Leaderboard?"
        >
          <p className="mb-4 text-gray-600">
            Are you sure you want to reset the leaderboard? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleResetLeaderboard}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowResetModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

