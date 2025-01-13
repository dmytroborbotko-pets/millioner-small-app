import { Question, WinningSum } from '@/types';
import questionsData from '@/data/questions.json';

export const typeDefs = `
  type Query {
    question(id: Int!): Question
    winningSums: [WinningSum!]!
  }

  type Mutation {
    submitAnswer(questionId: Int!, answer: String!): AnswerResult!
  }

  type Question {
    id: Int!
    question: String!
    options: Options!
    correctAnswer: String!
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
          const question = questionsData.questions.find(q => q.id === id);
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
          const sums = questionsData.questions.map(q => ({
            level: q.id,
            amount: q.winningSum
          }));
          resolve(sums);
        }, 100);
      });
    },
  },
  Mutation: {
    submitAnswer: (_: unknown, { questionId, answer }: { questionId: number, answer: string }): Promise<{ correct: boolean }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const question = questionsData.questions.find(q => q.id === questionId);
          resolve({
            correct: question ? question.correctAnswer === answer : false
          });
        }, 100);
      });
    },
  },
}; 