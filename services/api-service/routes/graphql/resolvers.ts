import { _ } from "lambda";
import { userResolvers } from "./schema/User";
import { baseResolvers } from "./schema/baseResolvers";

export const resolvers = _.merge({}, userResolvers, baseResolvers);
