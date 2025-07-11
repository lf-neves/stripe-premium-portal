import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { prismaClient } from "database";
import dotenv from "dotenv";
import express from "express";
import { GraphQLError } from "graphql";
import helmet from "helmet";
import http from "http";
import { logger } from "lambda";

import { verifyApiJsonWebToken } from "@/authentication";
import { isUnauthenticatedGraphQLOperation } from "@/authentication/isUnauthenticatedGraphQLOperation";
import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/typeDef";

import { GraphQLUser } from "./graphql/generatedTypes";

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
    helmet(),
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
