import { Question } from "@/types";
import { useState } from "react";
import { AnswerState, INITIAL_ANSWER_STATE } from "../types";

export const useGameState = () => {
  const [displayedQuestion, setDisplayedQuestion] = useState<Question | null>(
    null
  );
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [hasInitialData, setHasInitialData] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>(INITIAL_ANSWER_STATE);

  return {
    displayedQuestion,
    setDisplayedQuestion,
    isLoadingQuestion,
    setIsLoadingQuestion,
    hasInitialData,
    setHasInitialData,
    answerState,
    setAnswerState,
  };
};
