import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { verifyApiJsonWebToken } from "authentication";
import { isUnauthenticatedGraphQLOperation } from "authentication/isUnauthenticatedGraphQLOperation";
import dotenv from "dotenv";
import { GraphQLError } from "graphql";
import { logger } from "lambda";

import { resolvers } from "./routes/graphql/resolvers";
import { typeDefs } from "./routes/graphql/typeDef";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    if (isUnauthenticatedGraphQLOperation(req.body.query)) {
      logger.info(
        "Unauthenticated GraphQL operation. Will skip JWT authentication."
      );

      return { user: null };
    }

    const headerAuthorizationContent = req.headers.authorization || "";
    const [, requestAuthorizationToken] = headerAuthorizationContent.split(" ");

    if (!requestAuthorizationToken) {
      throw new GraphQLError("Authorization token is missing.", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    const user = verifyApiJsonWebToken(requestAuthorizationToken);

    return { user };
  },
  listen: { port: 4000 },
});

logger.info(`🚀  Server ready at: ${url}`);
