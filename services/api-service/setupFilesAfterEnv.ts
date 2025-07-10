import { execSync } from "child_process";
import { prismaClient } from "database";
import dotenv from "dotenv";

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
