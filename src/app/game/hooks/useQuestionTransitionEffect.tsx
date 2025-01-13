import { Question } from "@/types";
import { useEffect } from "react";
import { AnswerState, INITIAL_ANSWER_STATE } from "../types";

const QUESTION_TRANSITION_DELAY = 300;

export const useQuestionTransitionEffect = (
  initialLoading: boolean,
  currentQuestion: Question | null,
  setIsLoadingQuestion: (value: boolean) => void,
  setDisplayedQuestion: (question: Question | null) => void,
  setAnswerState: (state: AnswerState) => void
) => {
  useEffect(() => {
    if (!initialLoading && currentQuestion) {
      setIsLoadingQuestion(true);
      const timer = setTimeout(() => {
        setDisplayedQuestion(currentQuestion);
        setAnswerState(INITIAL_ANSWER_STATE);
        setIsLoadingQuestion(false);
      }, QUESTION_TRANSITION_DELAY);
      return () => clearTimeout(timer);
    }
  }, [
    initialLoading,
    currentQuestion,
    setIsLoadingQuestion,
    setDisplayedQuestion,
    setAnswerState,
  ]);
};
