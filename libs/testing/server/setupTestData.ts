import { faker } from "@faker-js/faker";
import { hashPassword } from "core";
import { prismaClient } from "database";

export async function setupTestData() {
  const password = faker.internet.password();
  const hashedPassword = await hashPassword(password);

  const user = await prismaClient.user.create({
    data: {
      email: faker.internet.email(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    },
  });

  return { user, userDecryptedPassword: password };
}
