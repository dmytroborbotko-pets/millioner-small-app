"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import { useQuestions } from "@/hooks/useQuestions";
import LoadingSkeleton from "@/components/LoadingSkeleton/LoadingSkeleton";
import GameContent from "@/components/GameContent/GameContent";
import MoneyList from "@/components/MoneyList/MoneyList";
import { useGameState } from "./hooks/useGameState";
import { useInitialDataEffect } from "./hooks/useInitialDataEffect";
import { useQuestionTransitionEffect } from "./hooks/useQuestionTransitionEffect";

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

const ANSWER_FEEDBACK_DELAY = 500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const GamePage = () => {
  const nodeRef = useRef(null);

  const {
    displayedQuestion,
    setDisplayedQuestion,
    isLoadingQuestion,
    setIsLoadingQuestion,
    hasInitialData,
    setHasInitialData,
    answerState,
    setAnswerState,
  } = useGameState();

  const {
    currentQuestion,
    winningSums,
    loading: initialLoading,
    submitAnswer,
  } = useQuestions();

  useInitialDataEffect(
    initialLoading,
    winningSums,
    hasInitialData,
    setHasInitialData
  );

  useQuestionTransitionEffect(
    initialLoading,
    currentQuestion,
    setIsLoadingQuestion,
    setDisplayedQuestion,
    setAnswerState
  );

  const handleAnswer = async (selectedAnswer: string) => {
    if (!displayedQuestion) return;

    // Toggle answer selection
    setAnswerState((prev) => {
      const newSelectedAnswers = prev.selectedAnswers.includes(selectedAnswer)
        ? prev.selectedAnswers.filter((answer) => answer !== selectedAnswer)
        : [...prev.selectedAnswers, selectedAnswer];

      // For single-answer questions, we submit immediately
      const isSingleAnswerQuestion =
        displayedQuestion.correctAnswers.length === 1;
      const isPending = isSingleAnswerQuestion
        ? newSelectedAnswers.length === 1
        : newSelectedAnswers.length === displayedQuestion.correctAnswers.length;

      return {
        ...prev,
        selectedAnswers: isSingleAnswerQuestion
          ? [selectedAnswer] // For single-answer questions, replace the selection
          : newSelectedAnswers, // For multiple-answer questions, toggle selection
        isPending,
      };
    });

    // For single-answer questions, submit immediately
    if (displayedQuestion.correctAnswers.length === 1) {
      await delay(ANSWER_FEEDBACK_DELAY);

      const response = await submitAnswer([selectedAnswer]);
      if (!response) return;

      setAnswerState((prev) => ({
        ...prev,
        isCorrect: response.data.submitAnswer.correct,
        showFeedback: true,
        isPending: false,
      }));

      await delay(ANSWER_FEEDBACK_DELAY);
      await response.nextAction();
      return;
    }

    // For multiple-answer questions, check if we have the required number of answers
    const updatedAnswers = answerState.selectedAnswers.includes(selectedAnswer)
      ? answerState.selectedAnswers.filter(
          (answer) => answer !== selectedAnswer
        )
      : [...answerState.selectedAnswers, selectedAnswer];

    if (updatedAnswers.length === displayedQuestion.correctAnswers.length) {
      await delay(ANSWER_FEEDBACK_DELAY);

      const response = await submitAnswer(updatedAnswers);
      if (!response) return;

      setAnswerState((prev) => ({
        ...prev,
        isCorrect: response.data.submitAnswer.correct,
        showFeedback: true,
        isPending: false,
      }));

      await delay(ANSWER_FEEDBACK_DELAY);
      await response.nextAction();
    }
  };

  const getOptionsCount = () =>
    currentQuestion?.options ? Object.keys(currentQuestion.options).length : 4;

  const renderGameContent = () => {
    if (isLoadingQuestion || !displayedQuestion) {
      return <LoadingSkeleton ref={nodeRef} optionsCount={getOptionsCount()} />;
    }

    return (
      <GameContent
        ref={nodeRef}
        question={displayedQuestion}
        onAnswer={handleAnswer}
        answerState={answerState}
      />
    );
  };

  return (
    <div className={styles.page}>
      <div className={styles.questionContainer}>{renderGameContent()}</div>
      <div className={styles.moneyWrapper}>
        <MoneyList
          winningSums={winningSums}
          currentQuestionId={currentQuestion?.id ?? 1}
          loading={!hasInitialData && initialLoading}
        />
      </div>
    </div>
  );
};

export default GamePage;
