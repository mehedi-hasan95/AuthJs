"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateForm = RegisterSchema.safeParse(values);
  if (!validateForm.success) {
    return { error: "Something went wrong" };
  }
  return { success: "Email Sent" };
};
