import { prismaClient } from "database";
import { logger } from "lambda";

import { createMutationResponse } from "@/graphql/createMutationResponse";
import {
  GraphQLArticleCategory,
  GraphQLArticleType,
  GraphQLResolvers,
} from "@/graphql/generatedTypes";

export const articleResolvers: GraphQLResolvers = {
  Query: {
    article: async (_parent, { articleId }) => {
      // TODO: AUTH-04 check if User is authorized to access this article

      const article = await prismaClient.article.findUnique({
        where: { articleId },
      });

      if (!article) {
        throw new Error("Could not find article.");
      }

      return article;
    },
    articles: async (_parent, { input }) => {
      // TODO: AUTH-04 only return the articles that the user is authorized to access

      return prismaClient.article.findMany({
        where: {
          type: input?.type as GraphQLArticleType,
          category: input?.category as GraphQLArticleCategory,
        },
      });
    },
  },

  Mutation: {
    createArticle: async (_parent, { input }) => {
      // TODO: AUTH-04 check if User is authorized to create an Article

      return prismaClient.article.create({
        data: input,
      });
    },
    updateArticle: async (_parent, { input }) => {
      // TODO: AUTH-04 check if User is authorized to update this Article

      const { articleId, ...articleAttributesToUpdate } = input;

      if (Object.keys(articleAttributesToUpdate).length === 0) {
        logger.info("No attributes provided to update Article[%s].", articleId);

        return createMutationResponse();
      }

      const article = await prismaClient.article.findUnique({
        where: { articleId },
      });

      if (!article) {
        throw new Error("Could not find article.");
      }

      const updatedArticle = await prismaClient.article.update({
        where: { articleId: article.articleId },
        data: articleAttributesToUpdate,
      });

      return createMutationResponse(updatedArticle);
    },
  },
};
