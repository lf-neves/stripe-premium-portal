-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('premium', 'free');

-- CreateEnum
CREATE TYPE "ArticleCategory" AS ENUM ('technology', 'science', 'business', 'entertainment', 'health', 'sports');

-- CreateTable
CREATE TABLE "Article" (
    "articleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "ArticleType" NOT NULL,
    "category" "ArticleCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("articleId")
);
