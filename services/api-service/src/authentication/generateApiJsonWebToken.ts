import jwt from "jsonwebtoken";

import { getApiSecret } from "./getApiSecret";

export function generateApiJsonWebToken({
  payload,
  expirationTimeInDays,
}: {
  payload: Record<string, string>;
  expirationTimeInDays?: number;
}) {
  const options: jwt.SignOptions = {
    expiresIn: expirationTimeInDays ? `${expirationTimeInDays}d` : "1d",
  };

  const apiSecret = getApiSecret();

  return jwt.sign(payload, apiSecret, options);
}
