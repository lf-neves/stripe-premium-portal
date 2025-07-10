import {
  DateResolver,
  DateTimeResolver,
  EmailAddressResolver,
  JSONObjectResolver,
  NonEmptyStringResolver,
  NonNegativeIntResolver,
  NonPositiveIntResolver,
  PositiveIntResolver,
  SafeIntResolver,
} from "graphql-scalars";

export const baseResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PositiveInt: PositiveIntResolver,
  NonNegativeInt: NonNegativeIntResolver,
  NonPositiveInt: NonPositiveIntResolver,
  JSONObject: JSONObjectResolver,
  NonEmptyString: NonEmptyStringResolver,
  SafeInt: SafeIntResolver,
};
