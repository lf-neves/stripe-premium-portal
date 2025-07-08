import { generateApiJsonWebToken } from "middleware/authentication";
import { prismaClient } from "database";
import { hashPassword } from "modules/hashPassword";
import { comparePassword } from "modules/comparePassword";

/**
 * TODO:
 * - Generate types automatically with graphql-codegen
 * - Add tests
 * - Add logging
 */

export const userResolvers = {
  Query: {
    async users() {
      const users = await prismaClient.user.findMany();

      return users;
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

      const user = await prismaClient.user.create({
        data: {
          email: input.email,
          password: await hashPassword(input.password),
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });

      const userToken = generateApiJsonWebToken({
        payload: { userId: user.userId },
        expirationTimeInDays: 1,
      });

      return {
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
        ...user,
        token: userToken,
      };
    },
  },
};
