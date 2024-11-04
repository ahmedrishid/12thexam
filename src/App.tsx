import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Login from './components/Login';
import ExamSetup from './components/ExamSetup';
import Exam from './components/Exam';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Ethiopian Entrance Exam Practice</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/setup" element={<ExamSetup />} />
            <Route path="/exam" element={<Exam />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;