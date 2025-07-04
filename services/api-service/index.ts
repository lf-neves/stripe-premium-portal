import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./routes/graphql/resolvers";
import { typeDefs } from "./routes/graphql/typeDef";
import { logger } from "lambda";
import { verifyApiJsonWebToken } from "middleware/authentication";
import { GraphQLError } from "graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const headerAuthorizationContent = req.headers.authorization || "";
    const requestAuthorizationToken = headerAuthorizationContent.replace(
      "Bearer ",
      ""
    );

    if (!requestAuthorizationToken) {
      throw new GraphQLError("Authorization token is missing.", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    const user = verifyApiJsonWebToken(requestAuthorizationToken);

    console.log("user", user);

    return { user };
  },
  listen: { port: 4000 },
});

logger.info(`🚀  Server ready at: ${url}`);
