import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Completed!</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-5xl font-bold text-indigo-600 mb-2">
            {percentage}%
          </div>
          <p className="text-gray-600">
            You scored {score} out of {total} questions
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Try Another Exam
          </button>
        </div>
      </div>
    </div>
  );
}