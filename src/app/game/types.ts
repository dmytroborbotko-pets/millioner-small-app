export interface AnswerState {
  selectedAnswers: string[];
  isCorrect: boolean;
  showFeedback: boolean;
  isPending: boolean;
}

export const INITIAL_ANSWER_STATE: AnswerState = {
  selectedAnswers: [],
  isCorrect: false,
  showFeedback: false,
  isPending: false,
};

export const ANSWER_FEEDBACK_DELAY = 500; 