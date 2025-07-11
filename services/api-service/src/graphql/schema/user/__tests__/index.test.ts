import { hashPassword } from "core";
import { prismaClient } from "database";
import gql from "graphql-tag";
import { faker, setupTestData, TestData } from "testing/server";

import {
  GraphQLMutationAuthenticateUserArgs,
  GraphQLMutationCreateUserArgs,
} from "@/graphql/generatedTypes";
import { mutate } from "@/test-utils/graphqlTestClient";

describe("User", () => {
  let testData: TestData;

  beforeEach(async () => {
    testData = await setupTestData();
  });

  describe("authenticateUser: mutation", () => {
    const authenticateUserMutationDocument = gql`
      mutation AuthenticateUser($input: AuthenticateUserInput!) {
        authenticateUser(input: $input) {
          user {
            userId
          }

          token
        }
      }
    `;

    test("throws an error if the provided email does not belong to an existing user", async () => {
      // act
      const result = await mutate<GraphQLMutationAuthenticateUserArgs>({
        queryDocument: authenticateUserMutationDocument,
        variables: {
          input: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        },
      });

      expect(result).toHaveProperty("errors[0].message", "User not found.");
    });

    test("throws an error if the provided password is incorrect", async () => {
      // act
      const result = await mutate<GraphQLMutationAuthenticateUserArgs>({
        queryDocument: authenticateUserMutationDocument,
        variables: {
          input: {
            email: testData.user.email,
            password: faker.internet.password(),
          },
        },
      });

      expect(result).toHaveProperty("errors[0].message", "Invalid password.");
    });

    test("returns a JWT token if the provided email and password are correct", async () => {
      const newPassword = faker.internet.password();

      await prismaClient.user.update({
        where: {
          userId: testData.user.userId,
        },
        data: {
          password: await hashPassword(newPassword),
        },
      });

      // act
      const result = await mutate<GraphQLMutationAuthenticateUserArgs>({
        queryDocument: authenticateUserMutationDocument,
        variables: {
          input: {
            email: testData.user.email,
            password: newPassword,
          },
        },
      });

      expect(result).toHaveProperty(
        "data.authenticateUser.token",
        expect.any(String)
      );
    });
  });

  describe("createUser: mutation", () => {
    const createUserMutationDocument = gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          user {
            userId
          }

          token
        }
      }
    `;

    test("throws an error if the provided email already belongs to an existing user", async () => {
      // act
      const result = await mutate<GraphQLMutationCreateUserArgs>({
        queryDocument: createUserMutationDocument,
        variables: {
          input: {
            email: testData.user.email,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: faker.internet.password(),
          },
        },
      });

      expect(result).toHaveProperty(
        "errors[0].message",
        "User already exists."
      );
    });

    test("creates the new User", async () => {
      const newUserEmail = faker.internet.email();
      const newUserPassword = faker.internet.password();

      // act
      const result = await mutate<GraphQLMutationCreateUserArgs>({
        queryDocument: createUserMutationDocument,
        variables: {
          input: {
            email: newUserEmail,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: newUserPassword,
          },
        },
      });

      expect(result).toHaveProperty(
        "data.createUser.token",
        expect.any(String)
      );

      const user = await prismaClient.user.findUnique({
        where: {
          userId: result.data?.createUser.user.userId,
        },
      });

      expect(user).toEqual(
        expect.objectContaining({
          email: newUserEmail,
          password: expect.not.stringContaining(newUserPassword),
        })
      );
    });
  });
});
