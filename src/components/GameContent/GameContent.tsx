import React from "react";
import styles from "../../app/game/page.module.css";
import Option from "../Option";
import { Question } from "@/types";

interface AnswerState {
  selectedAnswer: string | null;
  isCorrect: boolean;
  showFeedback: boolean;
  isPending: boolean;
}

interface GameContentProps {
  question: Question;
  onAnswer: (letter: string) => void;
  answerState: AnswerState;
}

const getOptionColors = (
  letter: string,
  correctAnswer: string,
  answerState: AnswerState
): { strokeColor?: string; backgroundColor?: string } => {
  if (answerState.showFeedback) {
    if (letter === correctAnswer) {
      return {
        strokeColor: "var(--color-success)",
        backgroundColor: "var(--color-success-bg)",
      };
    }
    if (letter === answerState.selectedAnswer && !answerState.isCorrect) {
      return {
        strokeColor: "var(--color-error)",
        backgroundColor: "var(--color-error-bg)",
      };
    }
  }

  if (answerState.isPending && letter === answerState.selectedAnswer) {
    return {
      strokeColor: "var(--color-orange)",
      backgroundColor: "var(--color-orange-bg)",
    };
  }

  return {};
};

const OptionContent: React.FC<{ letter: string; text: string }> = ({
  letter,
  text,
}) => (
  <div className={styles.option}>
    <span className={styles.letter}>{letter}</span>
    <span className={styles.text}>{text}</span>
  </div>
);

const GameContent = React.forwardRef<HTMLDivElement, GameContentProps>(
  ({ question, onAnswer, answerState }, ref) => {
    const handleOptionClick = (letter: string) => {
      if (!answerState.showFeedback && !answerState.isPending) {
        onAnswer(letter);
      }
    };

    return (
      <div ref={ref} className={styles.questionContent}>
        <h1 className={styles.questionTitle}>{question.question}</h1>
        <div className={styles.optionsGrid}>
          {Object.entries(question.options).map(([letter, text]) => {
            const { strokeColor, backgroundColor } = getOptionColors(
              letter,
              question.correctAnswer,
              answerState
            );

            return (
              <Option
                key={letter}
                onClick={() => handleOptionClick(letter)}
                strokeColor={strokeColor}
                backgroundColor={backgroundColor}
              >
                <OptionContent letter={letter} text={text} />
              </Option>
            );
          })}
        </div>
      </div>
    );
  }
);

GameContent.displayName = "GameContent";

export default GameContent;