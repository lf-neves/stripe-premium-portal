import bcrypt from "bcrypt";
import { logger } from "lambda";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
  try {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
  } catch (error) {
    logger.info(error);

    throw new Error("Failed to hash password.");
  }
}
