import { Exam } from '../types';

export const mockExams: Exam[] = [
  {
    id: '2023-natural-physics',
    year: 2023,
    stream: 'Natural Science',
    subject: 'Physics',
    questions: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `Sample physics question ${i + 1} about mechanics, thermodynamics, or electromagnetism?`,
      options: [
        'First possible answer',
        'Second possible answer',
        'Third possible answer',
        'Fourth possible answer',
      ],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
  {
    id: '2023-natural-chemistry',
    year: 2023,
    stream: 'Natural Science',
    subject: 'Chemistry',
    questions: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      text: `Sample chemistry question ${i + 1} about organic chemistry, chemical bonding, or reactions?`,
      options: [
        'First possible answer',
        'Second possible answer',
        'Third possible answer',
        'Fourth possible answer',
      ],
      correctAnswer: Math.floor(Math.random() * 4),
    })),
  },
];

export const streams = ['Natural Science', 'Social Science'];
export const subjects = {
  'Natural Science': ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
  'Social Science': ['History', 'Geography', 'Economics', 'English'],
};
export const years = [2023, 2022, 2021, 2020, 2019];