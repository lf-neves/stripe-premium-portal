import { _ } from "lambda";
import { userResolvers } from "./schema/user";
import { baseResolvers } from "./schema/baseResolvers";
import { Resolvers } from "./generatedTypes";

export const resolvers: Resolvers = _.merge({}, userResolvers, baseResolvers);
