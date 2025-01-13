import { Question, WinningSum } from "@/types";
import questionsData from "@/data/questions.json";

export const typeDefs = `
  type Query {
    question(id: Int!): Question
    winningSums: [WinningSum!]!
  }

  type Mutation {
    submitAnswer(questionId: Int!, answers: [String!]!): AnswerResult!
  }

  type Question {
    id: Int!
    question: String!
    options: Options!
    correctAnswers: [String!]!
    winningSum: Int!
  }

  type Options {
    A: String!
    B: String!
    C: String!
    D: String!
  }

  type WinningSum {
    level: Int!
    amount: Int!
  }

  type AnswerResult {
    correct: Boolean!
  }
`;

export const resolvers = {
  Query: {
    question: (_: unknown, { id }: { id: number }): Promise<Question> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const question = questionsData.questions.find((q) => q.id === id);
          if (question) {
            resolve(question);
          } else {
            throw new Error(`Question with id ${id} not found`);
          }
        }, 100);
      });
    },
    winningSums: (): Promise<WinningSum[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sums = questionsData.questions.map((q) => ({
            level: q.id,
            amount: q.winningSum,
          }));
          resolve(sums);
        }, 100);
      });
    },
  },
  Mutation: {
    submitAnswer: (
      _: unknown,
      { questionId, answers }: { questionId: number; answers: string[] }
    ): Promise<{ correct: boolean }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const question = questionsData.questions.find(
            (q) => q.id === questionId
          );
          if (!question) {
            resolve({ correct: false });
            return;
          }

          // Check if arrays have the same length and contain the same elements
          const isCorrect =
            answers.length === question.correctAnswers.length &&
            answers.every((answer) =>
              question.correctAnswers.includes(answer)
            ) &&
            question.correctAnswers.every((answer) => answers.includes(answer));

          resolve({ correct: isCorrect });
        }, 100);
      });
    },
  },
};
