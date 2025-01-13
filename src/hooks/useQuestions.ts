import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Question, WinningSum } from "@/types";
import { graphqlClient } from "@/api/graphqlClient";
import { GET_QUESTION, GET_WINNING_SUMS, SUBMIT_ANSWER } from "@/api/queries";

export const useQuestions = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [winningSums, setWinningSums] = useState<WinningSum[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQuestion = useCallback(async (id: number) => {
    try {
      setLoading(true);
      const { data } = await graphqlClient.query<{ question: Question }>({
        query: GET_QUESTION,
        variables: { id },
      });
      setCurrentQuestion(data.question);
    } catch (error) {
      console.error("Error loading question:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadWinningSums = useCallback(async () => {
    try {
      const { data } = await graphqlClient.query<{ winningSums: WinningSum[] }>(
        {
          query: GET_WINNING_SUMS,
        }
      );
      setWinningSums(data.winningSums);
    } catch (error) {
      console.error("Error loading winning sums:", error);
    }
  }, []);

  const submitAnswer = useCallback(
    async (answer: string) => {
      if (!currentQuestion) return;

      try {
        const { data } = await graphqlClient.mutate<{
          submitAnswer: { correct: boolean };
        }>({
          query: SUBMIT_ANSWER,
          variables: {
            questionId: currentQuestion.id,
            answer,
          },
        });

        return {
          data,
          nextAction: async () => {
            if (data.submitAnswer.correct) {
              if (currentQuestion.id < winningSums.length) {
                await loadQuestion(currentQuestion.id + 1);
              } else {
                router.push(
                  `/result?wonSum=${winningSums[currentQuestion.id - 1].amount}`
                );
              }
            } else {
              router.push(
                `/result?wonSum=${
                  currentQuestion.id === 1
                    ? 0
                    : winningSums[currentQuestion.id - 1].amount
                }`
              );
            }
          },
        };
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    },
    [currentQuestion, winningSums, loadQuestion, router]
  );

  useEffect(() => {
    loadWinningSums();
    loadQuestion(1);
  }, [loadQuestion, loadWinningSums]);

  return {
    currentQuestion,
    winningSums,
    loading,
    submitAnswer,
  };
};
