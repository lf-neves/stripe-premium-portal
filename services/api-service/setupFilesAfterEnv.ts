import { execSync } from "child_process";
import dotenv from "dotenv";
import { prismaClient } from "database";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  execSync(
    "cd ../../libs/database && pnpm run prisma:migrate reset --force --skip-seed && pnpm prisma:generate",
    {
      stdio: "inherit",
    }
  );

  await prismaClient.$connect();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});
