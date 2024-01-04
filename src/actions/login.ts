"use server";
import { loginSchema } from "@/schema";
import * as z from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validateForm = loginSchema.safeParse(values);
  if (!validateForm.success) {
    return { error: "Invalid Credintials" };
  }
  return { success: "Email Sent" };
};
