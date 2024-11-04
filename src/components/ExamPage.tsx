import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockExams } from '../data/mockExams';
import { UserAnswer, Exam } from '../types';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds

  useEffect(() => {
    const foundExam = mockExams.find((e) => e.id === examId);
    if (!foundExam) {
      navigate('/dashboard');
      return;
    }
    setExam(foundExam);
  }, [examId, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: number) => {
    setUserAnswers((prev) => {
      const newAnswers = [...prev];
      const index = newAnswers.findIndex(
        (a) => a.questionId === exam!.questions[currentQuestion].id
      );
      if (index !== -1) {
        newAnswers[index].selectedAnswer = answer;
      } else {
        newAnswers.push({
          questionId: exam!.questions[currentQuestion].id,
          selectedAnswer: answer,
        });
      }
      return newAnswers;
    });
  };

  const handleSubmit = () => {
    if (!exam) return;
    
    const score = userAnswers.reduce((acc, answer) => {
      const question = exam.questions.find((q) => q.id === answer.questionId);
      if (question && question.correctAnswer === answer.selectedAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    navigate('/result', { state: { score, total: exam.questions.length } });
  };

  if (!exam) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{exam.subject}</h2>
              <p className="text-gray-600">
                {exam.stream} - {exam.year}
              </p>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="h-5 w-5" />
              <span className="text-red-600">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg font-medium mb-4">
              Question {currentQuestion + 1} of {exam.questions.length}
            </p>
            <p className="text-gray-800 text-lg mb-6">
              {exam.questions[currentQuestion].text}
            </p>

            <div className="space-y-4">
              {exam.questions[currentQuestion].options.map((option, index) => {
                const isSelected =
                  userAnswers.find(
                    (a) => a.questionId === exam.questions[currentQuestion].id
                  )?.selectedAnswer === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className={`w-full text-left p-4 rounded-lg border ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>{' '}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            {currentQuestion === exam.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion((prev) =>
                    Math.min(exam.questions.length - 1, prev + 1)
                  )
                }
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {exam.questions.map((_, index) => {
              const isAnswered = userAnswers.some(
                (a) => a.questionId === exam.questions[index].id
              );

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`p-2 rounded ${
                    currentQuestion === index
                      ? 'bg-indigo-600 text-white'
                      : isAnswered
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}