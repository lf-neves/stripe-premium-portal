import { faker } from "@faker-js/faker";
import { prismaClient } from "database";
import { hashPassword } from "core";

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
