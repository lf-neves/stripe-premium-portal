import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./routes/graphql/resolvers";
import { typeDefs } from "./routes/graphql/typeDef";
import { logger } from "lambda";
import { verifyApiJsonWebToken } from "authentication";

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

    const user = verifyApiJsonWebToken(requestAuthorizationToken);

    return { user };
  },
  listen: { port: 4000 },
});

logger.info(`🚀  Server ready at: ${url}`);
