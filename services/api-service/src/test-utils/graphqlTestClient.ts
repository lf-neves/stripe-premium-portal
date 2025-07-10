import { GraphQLResponse as BaseGraphQLResponse } from "@apollo/server";
import { DocumentNode, print } from "graphql";
import { request } from "testing/server";

import { app } from "..";

type RunQueryArgs<TVariables> = {
  queryDocument: DocumentNode;
  variables?: TVariables;
};

type ClientGraphQLResponse<T> = Omit<BaseGraphQLResponse, "data"> & {
  data?: T;
};

async function runQuery<TVariables>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>) {
  const response = await request(app)
    .post("/graphql")
    .send({
      query: print(queryDocument),
      variables,
    });

  return response.body;
}

export const query = <T = never, TVariables extends T = T>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>): Promise<ClientGraphQLResponse<T>> =>
  runQuery<TVariables>({ queryDocument, variables });

export const mutate = <T = never, TVariables extends T = T>({
  queryDocument,
  variables,
}: RunQueryArgs<TVariables>): Promise<ClientGraphQLResponse<T>> =>
  runQuery<TVariables>({ queryDocument, variables });
