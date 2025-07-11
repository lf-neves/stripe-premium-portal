import { prismaClient } from "database";
import gql from "graphql-tag";
import { faker, setupTestData, TestData } from "testing/server";

import {
  GraphQLArticleCategory,
  GraphQLArticleType,
  GraphQLMutationCreateArticleArgs,
  GraphQLMutationUpdateArticleArgs,
  GraphQLQueryArticleArgs,
  GraphQLQueryArticlesArgs,
} from "@/graphql/generatedTypes";
import { query } from "@/test-utils/graphqlTestClient";

describe("Article", () => {
  let testData: TestData;

  beforeEach(async () => {
    testData = await setupTestData();
  });

  describe("article: query", () => {
    const articleQueryDocument = gql`
      query Article($articleId: ID!) {
        article(articleId: $articleId) {
          articleId
        }
      }
    `;

    test("throws an error if the Article does not exist", async () => {
      // act
      const response = await query<GraphQLQueryArticleArgs>({
        queryDocument: articleQueryDocument,
        variables: {
          articleId: faker.string.uuid(),
        },
      });

      expect(response).toHaveProperty(
        "errors[0].message",
        "Could not find article."
      );
    });

    test("returns the requested Article", async () => {
      // act
      const response = await query<GraphQLQueryArticleArgs>({
        queryDocument: articleQueryDocument,
        variables: {
          articleId: testData.article.articleId,
        },
      });

      expect(response).toHaveProperty(
        "data.article.articleId",
        testData.article.articleId
      );
    });
  });

  describe("articles: query", () => {
    const articlesQueryDocument = gql`
      query Articles {
        articles {
          articleId
        }
      }
    `;

    test("returns all Articles", async () => {
      const anotherArticle = await prismaClient.article.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          type: GraphQLArticleType.Free,
          category: GraphQLArticleCategory.Sports,
        },
      });

      // act
      const response = await query<GraphQLQueryArticlesArgs>({
        queryDocument: articlesQueryDocument,
      });

      expect(response).toHaveProperty(
        "data.articles",
        expect.arrayContaining([
          expect.objectContaining({
            articleId: testData.article.articleId,
          }),
          expect.objectContaining({
            articleId: anotherArticle.articleId,
          }),
        ])
      );
    });

    test("returns Articles filtered by type", async () => {
      const premiumArticle = await prismaClient.article.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          type: GraphQLArticleType.Premium,
          category: GraphQLArticleCategory.Sports,
        },
      });

      // act
      const response = await query<GraphQLQueryArticlesArgs>({
        queryDocument: articlesQueryDocument,
        variables: {
          input: {
            type: GraphQLArticleType.Premium,
          },
        },
      });

      expect(response).toHaveProperty(
        "data.articles",
        expect.arrayContaining([
          expect.objectContaining({
            articleId: premiumArticle.articleId,
          }),
          expect.not.objectContaining({
            articleId: testData.article.articleId,
          }),
        ])
      );
    });

    test("returns Articles filtered by category", async () => {
      const anotherArticle = await prismaClient.article.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          type: GraphQLArticleType.Free,
          category: GraphQLArticleCategory.Sports,
        },
      });

      // act
      const response = await query<GraphQLQueryArticlesArgs>({
        queryDocument: articlesQueryDocument,
        variables: {
          input: {
            category: GraphQLArticleCategory.Sports,
          },
        },
      });

      expect(response).toHaveProperty(
        "data.articles",
        expect.arrayContaining([
          expect.objectContaining({
            articleId: testData.article.articleId,
          }),
          expect.not.objectContaining({
            articleId: anotherArticle.articleId,
          }),
        ])
      );
    });
  });

  describe("createArticle: mutation", () => {
    const createArticleMutationDocument = gql`
      mutation CreateArticle($input: CreateArticleInput!) {
        createArticle(input: $input) {
          articleId
        }
      }
    `;

    test("creates an Article", async () => {
      const articleAttributes = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        type: GraphQLArticleType.Free,
        category: GraphQLArticleCategory.Sports,
      };

      // act
      const response = await query<GraphQLMutationCreateArticleArgs>({
        queryDocument: createArticleMutationDocument,
        variables: {
          input: articleAttributes,
        },
      });

      const articleId = response.data?.createArticle.articleId;

      const newArticle = await prismaClient.article.findUnique({
        where: { articleId },
      });

      expect(newArticle).toEqual(expect.objectContaining(articleAttributes));
    });
  });

  describe("updateArticle: mutation", () => {
    const updateArticleMutationDocument = gql`
      mutation UpdateArticle($input: UpdateArticleInput!) {
        updateArticle(input: $input) {
          articleId
        }
      }
    `;

    test("throws an error if the provided Article does not exist", async () => {
      // act
      const response = await query<GraphQLMutationUpdateArticleArgs>({
        queryDocument: updateArticleMutationDocument,
        variables: {
          input: { articleId: faker.string.uuid() },
        },
      });

      expect(response).toHaveProperty(
        "errors[0].message",
        "Could not find article."
      );
    });

    test("updates an Article", async () => {
      const articleAttributesToUpdate = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        type: GraphQLArticleType.Premium,
        category: GraphQLArticleCategory.Technology,
      };

      // act
      await query<GraphQLMutationUpdateArticleArgs>({
        queryDocument: updateArticleMutationDocument,
        variables: {
          input: {
            articleId: testData.article.articleId,
            ...articleAttributesToUpdate,
          },
        },
      });

      const updatedArticle = await prismaClient.article.findUnique({
        where: { articleId: testData.article.articleId },
      });

      expect(updatedArticle).toEqual(
        expect.objectContaining(articleAttributesToUpdate)
      );
    });
  });
});
