const GRAPHQL_API_JWT_SECRET = process.env.GRAPHQL_API_JWT_SECRET;

export function getApiSecret(): string {
  if (!GRAPHQL_API_JWT_SECRET) {
    throw new Error(
      "Failed to retrieve API secret: JWT secret is not defined."
    );
  }

  return GRAPHQL_API_JWT_SECRET;
}
