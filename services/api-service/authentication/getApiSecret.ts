export function getApiSecret(): string {
  if (!process.env.GRAPHQL_API_JWT_SECRET) {
    throw new Error(
      "Failed to retrieve API secret: JWT secret is not defined."
    );
  }

  return process.env.GRAPHQL_API_JWT_SECRET;
}
