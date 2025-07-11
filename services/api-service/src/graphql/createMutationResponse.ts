export function createMutationResponse<T extends Record<string, unknown>>(
  fields?: T
) {
  return { message: "success", code: "200", success: true, ...fields };
}
