import { _ } from "lambda";

import { GraphQLResolvers } from "./generatedTypes";
import { articleResolvers } from "./schema/article";
import { baseResolvers } from "./schema/baseResolvers";
import { userResolvers } from "./schema/user";

export const resolvers: GraphQLResolvers = _.merge(
  {},
  userResolvers,
  articleResolvers,
  baseResolvers
);
