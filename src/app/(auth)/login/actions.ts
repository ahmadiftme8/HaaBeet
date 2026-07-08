"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { authCredentialsSchema } from "@/lib/auth-schema";

export async function loginAction(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const parsed = authCredentialsSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Invalid input";
  }

  try {
    await signIn("credentials", {
      username: parsed.data.username,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Invalid username or password";
    }
    throw error;
  }

  return null;
}
