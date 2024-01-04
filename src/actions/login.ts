"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginSchema } from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateForm = loginSchema.safeParse(values);
  if (!validateForm.success) {
    return { error: "Invalid Credintials" };
  }
  const { email, password } = validateForm.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid Credintial" };
        }
        default: {
          return { error: "something went wrong" };
        }
      }
    }
    throw error;
  }
};
