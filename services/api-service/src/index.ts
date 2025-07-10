import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { verifyApiJsonWebToken } from "@/authentication";
import { isUnauthenticatedGraphQLOperation } from "@/authentication/isUnauthenticatedGraphQLOperation";
import dotenv from "dotenv";
import { GraphQLError } from "graphql";
import { logger } from "lambda";
import express from "express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";

import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/typeDef";
import { expressMiddleware } from "@as-integrations/express5";
import { GraphQLUser } from "./graphql/generatedTypes";
import { prismaClient } from "database";

dotenv.config();

export const app = express();

const httpServer = http.createServer(app);

export const apolloServer = new ApolloServer<{ user: GraphQLUser | null }>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function setupApolloServer() {
  await apolloServer.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        if (isUnauthenticatedGraphQLOperation(req.body.query)) {
          logger.info(
            "Unauthenticated GraphQL operation. Will skip JWT authentication."
          );

          return { user: null };
        }

        const headerAuthorizationContent = req.headers.authorization || "";
        const [, requestAuthorizationToken] =
          headerAuthorizationContent.split(" ");

        if (!requestAuthorizationToken) {
          throw new GraphQLError("Authorization token is missing.", {
            extensions: {
              code: "UNAUTHENTICATED",
              http: { status: 401 },
            },
          });
        }

        const { userId } = verifyApiJsonWebToken(requestAuthorizationToken) as {
          userId: string;
        };

        const user = await prismaClient.user.findUnique({
          where: {
            userId,
          },
        });

        return { user };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  logger.info(`🚀 Server ready at http://localhost:4000/`);
}

void setupApolloServer();
