import jwt from "jsonwebtoken";
import { getApiSecret } from "./getApiSecret";

export function generateApiJsonWebToken({
  payload,
  expirationTimeInDays,
}: {
  payload: Record<string, any>;
  expirationTimeInDays?: number;
}) {
  const options: jwt.SignOptions = {
    expiresIn: expirationTimeInDays ? `${expirationTimeInDays}d` : "7d",
  };

  const apiSecret = getApiSecret();

  return jwt.sign(payload, apiSecret, options);
}
