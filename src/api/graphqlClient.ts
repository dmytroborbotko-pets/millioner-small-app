import { resolvers } from "./schema";
import { Question, WinningSum } from "@/types";

interface QueryOptions<V> {
  query: string;
  variables?: V;
}

interface QueryVariables {
  id?: number;
  questionId?: number;
  answers?: string[];
}

interface QueryResult<T> {
  data: T;
}

interface QuestionQueryResult {
  question: Question;
}

interface WinningSumsQueryResult {
  winningSums: WinningSum[];
}

interface SubmitAnswerResult {
  submitAnswer: {
    correct: boolean;
  };
}

class MockGraphQLClient {
  async query<T extends QuestionQueryResult | WinningSumsQueryResult>({
    query,
    variables,
  }: QueryOptions<QueryVariables>): Promise<QueryResult<T>> {
    if (query.includes("question") && variables?.id !== undefined) {
      const result = await resolvers.Query.question(null, { id: variables.id });
      return { data: { question: result } as T };
    }

    if (query.includes("winningSums")) {
      const result = await resolvers.Query.winningSums();
      return { data: { winningSums: result } as T };
    }

    throw new Error("Query not supported in mock client");
  }

  async mutate<T extends SubmitAnswerResult>({
    query,
    variables,
  }: QueryOptions<QueryVariables>): Promise<QueryResult<T>> {
    if (
      query.includes("submitAnswer") &&
      variables?.questionId !== undefined &&
      variables?.answers
    ) {
      const result = await resolvers.Mutation.submitAnswer(null, {
        questionId: variables.questionId,
        answers: variables.answers,
      });
      return { data: { submitAnswer: result } as T };
    }

    throw new Error("Mutation not supported in mock client");
  }
}

export const graphqlClient = new MockGraphQLClient();
