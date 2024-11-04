export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  year: number;
  stream: string;
  subject: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
}