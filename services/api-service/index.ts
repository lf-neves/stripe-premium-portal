import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./routes/graphql/resolvers";
import { typeDefs } from "./routes/graphql/typeDef";
import { logger } from "lambda";
import { verifyApiJsonWebToken } from "authentication";
import { GraphQLError } from "graphql";
import { isUnauthenticatedGraphQLOperation } from "authentication/isUnauthenticatedGraphQLOperation";
import dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req, res }) => {
    if (isUnauthenticatedGraphQLOperation((req as any).body.query)) {
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
