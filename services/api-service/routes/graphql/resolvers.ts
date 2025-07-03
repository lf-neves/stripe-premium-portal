import { _ } from "lambda";
import { userResolvers } from "./schema/User";

export const resolvers = _.merge({}, userResolvers);
