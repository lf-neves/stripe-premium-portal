import { generateApiJsonWebToken } from "authentication";
import { prismaClient } from "database";
import { logger } from "lambda";
import { comparePassword } from "modules/comparePassword";
import { hashPassword } from "modules/hashPassword";
import { Resolvers } from "routes/graphql/generatedTypes";

/**
 * TODO:
 * - Generate types automatically with graphql-codegen
 * - Add tests
 */

export const userResolvers: Resolvers = {
  Query: {
    async me(_parent, _args, context) {
      return context.user;
    },
  },

  Mutation: {
    createUser: async (_parent, { input }) => {
      const existingUser = await prismaClient.user.findFirst({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await hashPassword(input.password);

      logger.info("Creating User: %s.", input.email);

      // TODO: move this DB operation into a sql transaction
      const user = await prismaClient.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });

      const userToken = generateApiJsonWebToken({
        payload: { userId: user.userId },
        expirationTimeInDays: 1,
      });

      return {
        user,
        token: userToken,
      };
    },

    authenticateUser: async (_parent, { input }) => {
      const user = await prismaClient.user.findFirst({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      await comparePassword(input.password, user.password);

      const userToken = generateApiJsonWebToken({
        payload: { userId: user.userId },
        expirationTimeInDays: 1,
      });

      return {
        user,
        token: userToken,
      };
    },
  },
};
