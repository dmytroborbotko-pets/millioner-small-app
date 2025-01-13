export const GET_QUESTION = `
  query GetQuestion($id: Int!) {
    question(id: $id) {
      id
      question
      options {
        A
        B
        C
        D
      }
      correctAnswers
      winningSum
    }
  }
`;

export const GET_WINNING_SUMS = `
  query GetWinningSums {
    winningSums {
      level
      amount
    }
  }
`;

export const SUBMIT_ANSWER = `
  mutation SubmitAnswer($questionId: Int!, $answers: [String!]!) {
    submitAnswer(questionId: $questionId, answers: $answers) {
      correct
    }
  }
`;
