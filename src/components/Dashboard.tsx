import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { streams, subjects, years } from '../data/mockExams';
import { BookOpen } from 'lucide-react';

export default function Dashboard() {
  const [selectedStream, setSelectedStream] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (selectedStream && selectedSubject && selectedYear) {
      navigate(`/exam/${selectedYear}-${selectedStream.toLowerCase()}-${selectedSubject.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Exam Selection</h1>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedStream}
                onChange={(e) => {
                  setSelectedStream(e.target.value);
                  setSelectedSubject('');
                }}
              >
                <option value="">Select Stream</option>
                {streams.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedStream}
              >
                <option value="">Select Subject</option>
                {selectedStream &&
                  subjects[selectedStream as keyof typeof subjects].map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            disabled={!selectedStream || !selectedSubject || !selectedYear}
            className="mt-8 w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Exam
          </button>
        </div>
      </div>
    </div>
  );
}