import bcrypt from "bcrypt";

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isPasswordValid = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid password.");
  }

  return true;
}
