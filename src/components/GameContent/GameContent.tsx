import React from "react";
import styles from "../../app/game/page.module.css";
import Option from "../Option";
import { Question } from "@/types";
import { AnswerState } from "@/app/game/types";

interface GameContentProps {
  question: Question;
  onAnswer: (letter: string) => void;
  answerState: AnswerState;
}

const getOptionColors = (
  letter: string,
  correctAnswers: string[],
  answerState: AnswerState
): { strokeColor?: string; backgroundColor?: string } => {
  if (answerState.showFeedback) {
    if (correctAnswers.includes(letter)) {
      return {
        strokeColor: "var(--color-success)",
        backgroundColor: "var(--color-success-bg)",
      };
    }
    if (answerState.selectedAnswers.includes(letter) && !answerState.isCorrect) {
      return {
        strokeColor: "var(--color-error)",
        backgroundColor: "var(--color-error-bg)",
      };
    }
  }

  if (answerState.isPending && answerState.selectedAnswers.includes(letter)) {
    return {
      strokeColor: "var(--color-orange)",
      backgroundColor: "var(--color-orange-bg)",
    };
  }

  if (answerState.selectedAnswers.includes(letter)) {
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
      if (!answerState.showFeedback) {
        onAnswer(letter);
      }
    };

    const getAnswerInstructions = () => {
      const totalAnswers = question.correctAnswers.length;
      const selectedCount = answerState.selectedAnswers.length;

      if (totalAnswers === 1) {
        return "Select the correct answer";
      }

      return `Select ${totalAnswers} correct answers (${selectedCount}/${totalAnswers} selected)`;
    };

    return (
      <div ref={ref} className={styles.questionContent}>
        <div className={styles.questionHeader}>
          <h1 className={styles.questionTitle}>{question.question}</h1>
          <p className={styles.answerInstructions}>{getAnswerInstructions()}</p>
        </div>
        <div className={styles.optionsGrid}>
          {Object.entries(question.options).map(([letter, text]) => {
            const { strokeColor, backgroundColor } = getOptionColors(
              letter,
              question.correctAnswers,
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
