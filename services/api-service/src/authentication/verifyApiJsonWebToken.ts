import jwt from "jsonwebtoken";
import { logger } from "lambda";

import { getApiSecret } from "./getApiSecret";

export function verifyApiJsonWebToken(token: string) {
  const apiSecret = getApiSecret();

  try {
    return jwt.verify(token, apiSecret);
  } catch (error) {
    logger.info("Token verification failed.", { error });

    throw new Error("Failed to verify token.");
  }
}
