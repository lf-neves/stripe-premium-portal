import { generateApiJsonWebToken } from "middleware/authentication";

// TODO: Replace with database + ORM
const users = [];

/**
 * TODO:
 * - Add input validation
 * - Add password hashing
 * - Generate types automatically with graphql-codegen
 * - Add tests
 * - Add logging
 */

export const userResolvers = {
  Query: {
    async users() {
      return [];
    },
  },

  Mutation: {
    createUser: async (_parent, { input }) => {
      const user = {
        userId: "123",
        ...input,
      };

      console.log("user", user);

      users.push(user);

      const userToken = generateApiJsonWebToken({
        payload: { userId: user.userId },
        expirationTimeInDays: 1,
      });

      return {
        token: userToken,
      };
    },

    authenticateUser: async (_parent, { input }) => {
      const user = users.find((user) => user.email === input.email);

      if (!user) {
        throw new Error("User not found.");
      }

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
