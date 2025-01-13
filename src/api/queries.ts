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
      correctAnswer
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
  mutation SubmitAnswer($questionId: Int!, $answer: String!) {
    submitAnswer(questionId: $questionId, answer: $answer) {
      correct
    }
  }
`; 