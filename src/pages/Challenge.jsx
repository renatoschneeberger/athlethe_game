import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Skeleton from '../components/Skeleton';

export default function Challenge() {
  const navigate = useNavigate();
  const { 
    challenge, 
    setChallenge, 
    challengeSubmitted,
    setChallengeSubmitted,
    setLoading,
    setToast 
  } = useStore();
  
  const [selectedAction, setSelectedAction] = useState('');
  const [loading, setLocalLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadChallenge = async () => {
      setLocalLoading(true);
      try {
        const data = await mockApi.getChallenge();
        setChallenge(data);
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      } finally {
        setLocalLoading(false);
      }
    };

    loadChallenge();
  }, [setChallenge, setToast]);

  const handleSubmit = async () => {
    if (!selectedAction) {
      setToast({ type: 'error', message: 'Please select an action' });
      return;
    }

    setSubmitting(true);
    try {
      await mockApi.submitChallenge(selectedAction);
      setChallengeSubmitted(true);
      setToast({ type: 'success', message: 'Challenge submitted successfully!' });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setSubmitting(false);
    }
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

  const isExpired = challenge?.deadline && new Date(challenge.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Link to="/app" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        <Card highlight>
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">Weekly Challenge – Real-Case</h1>
            <Badge variant={challenge?.status === 'active' ? 'success' : 'default'}>
              {challenge?.status || 'Inactive'}
            </Badge>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="font-semibold mb-2">{challenge?.title}</h2>
            <p className="text-sm text-gray-700">{challenge?.brief}</p>
          </div>

          {isExpired && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">⚠️ This challenge has expired.</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-3">How would you react?</h3>
            <div className="space-y-3">
              {challenge?.actions.map((action) => (
                <label
                  key={action}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAction === action
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="action"
                    value={action}
                    checked={selectedAction === action}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mr-3"
                    disabled={challengeSubmitted || isExpired}
                  />
                  <span className="flex-1 font-medium">{action}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 Tip: You can check more details in the Portfolio.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!selectedAction || challengeSubmitted || isExpired}
              loading={submitting}
              className="flex-1"
            >
              {challengeSubmitted ? 'Submitted ✓' : 'Submit Decision'}
            </Button>
            {challengeSubmitted && (
              <Link to="/app/portfolio">
                <Button variant="secondary">
                  Execute in Portfolio
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

