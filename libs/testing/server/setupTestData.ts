import { faker } from "@faker-js/faker";
import { hashPassword } from "core";
import { prismaClient } from "database";
import { User } from "database/src/generated/prisma";
import { Article } from "database/src/generated/prisma";

export async function setupTestData({
  userOverrides,
  articleOverrides,
}: {
  userOverrides?: Partial<User>;
  articleOverrides?: Partial<Article>;
} = {}) {
  const password = faker.internet.password();
  const hashedPassword = await hashPassword(password);

  const user = await prismaClient.user.create({
    data: {
      email: faker.internet.email(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      ...userOverrides,
    },
  });

  const article = await prismaClient.article.create({
    data: {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      type: "free",
      category: "technology",
      ...articleOverrides,
    },
  });

  return { user, article };
}
