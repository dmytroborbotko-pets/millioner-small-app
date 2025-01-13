export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  winningSum: number;
}

export interface QuestionsData {
  questions: Question[];
}

export interface WinningSum {
  level: number;
  amount: number;
}
