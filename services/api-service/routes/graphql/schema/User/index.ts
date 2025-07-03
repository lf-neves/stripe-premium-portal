import { generateApiJsonWebToken } from "authentication";

export const userResolvers = {
  Query: {
    async users() {
      return [];
    },
  },

  Mutation: {
    authenticateUser: async (_parent, { email }, context) => {},
  },
};
