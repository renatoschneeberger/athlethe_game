import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../stores/useStore';
import { mockApi } from '../utils/mockApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Skeleton from '../components/Skeleton';

export default function MiniGame() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { 
    session, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    addAnswer, 
    answers,
    setLoading,
    setToast 
  } = useStore();
  
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLocalLoading] = useState(false);

  const questions = session?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSubmit = async () => {
    if (!selectedAnswer) return;

    setLocalLoading(true);
    try {
      await mockApi.submitAnswer(code, currentQuestion.id, selectedAnswer);
      addAnswer({ questionId: currentQuestion.id, answer: selectedAnswer });
      setSubmitted(true);
      setToast({ type: 'success', message: 'Antwort gespeichert!' });
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    } finally {
      setLocalLoading(false);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      navigate(`/session/${code}/leaderboard`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setSubmitted(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Frage {currentQuestionIndex + 1} von {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <h2 className="text-2xl font-semibold mb-4">{currentQuestion.title}</h2>
          
          {currentQuestion.context && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">{currentQuestion.context}</p>
            </div>
          )}

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mr-3"
                  disabled={submitted}
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>

          {submitted && currentQuestion.explanation && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-1">Erklärung:</p>
              <p className="text-sm text-green-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!submitted ? (
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedAnswer}
                loading={loading}
                className="flex-1"
              >
                Abschicken
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {isLastQuestion ? 'Zum Leaderboard' : 'Nächste Frage'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

