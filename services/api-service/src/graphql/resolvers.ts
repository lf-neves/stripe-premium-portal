import { _ } from "lambda";

import { Resolvers } from "./generatedTypes";
import { baseResolvers } from "./schema/baseResolvers";
import { userResolvers } from "./schema/user";

export const resolvers: Resolvers = _.merge({}, userResolvers, baseResolvers);
