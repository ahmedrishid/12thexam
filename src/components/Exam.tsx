import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock questions (in a real app, these would come from an API)
const mockQuestions = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  question: `Sample question ${i + 1}?`,
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correct: 0,
}));

export default function Exam() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(180); // 3 hours in minutes

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }));
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Question {currentQuestion + 1} of {mockQuestions.length}
          </h2>
          <div className="flex items-center text-gray-700">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">{formatTime(timeLeft)} remaining</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-800">{mockQuestions[currentQuestion].question}</p>

          <div className="space-y-3">
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg border ${
                  answers[currentQuestion] === index
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <button
            onClick={() => setCurrentQuestion((prev) => Math.min(mockQuestions.length - 1, prev + 1))}
            disabled={currentQuestion === mockQuestions.length - 1}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Question Navigator</h3>
        <div className="grid grid-cols-10 gap-2">
          {mockQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`p-2 text-sm font-medium rounded ${
                answers[index] !== undefined
                  ? 'bg-green-500 text-white'
                  : currentQuestion === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}