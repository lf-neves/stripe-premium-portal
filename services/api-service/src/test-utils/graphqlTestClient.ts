import { GraphQLResponse as BaseGraphQLResponse } from "@apollo/server";
import { DocumentNode, print } from "graphql";
import { request } from "testing/server";

import { generateApiJsonWebToken } from "@/authentication";
import { GraphQLMutation, GraphQLQuery } from "@/graphql/generatedTypes";

import { app } from "..";

type RunQueryArgs<TVariables> = {
  queryDocument: DocumentNode;
  variables?: TVariables;
};

type ClientGraphQLResponse<T> = Omit<BaseGraphQLResponse, "data"> & {
  data?: T;
};

type ClientQueryResponse = ClientGraphQLResponse<GraphQLQuery>;

export type ClientMutationResponse = ClientGraphQLResponse<GraphQLMutation>;

async function runQuery<Response, TVariables>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>) {
  const response = await request(app)
    .post("/graphql")
    .auth(generateApiJsonWebToken({ payload: { userId: "" } }), {
      type: "bearer",
    })
    .send({
      query: print(queryDocument),
      variables,
    });

  return response.body as Response;
}

export const query = <T = never, TVariables extends T = T>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>): Promise<ClientQueryResponse> =>
  runQuery<ClientQueryResponse, TVariables>({ queryDocument, variables });

export const mutate = <T = never, TVariables extends T = T>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>): Promise<ClientMutationResponse> =>
  runQuery<ClientMutationResponse, TVariables>({ queryDocument, variables });
