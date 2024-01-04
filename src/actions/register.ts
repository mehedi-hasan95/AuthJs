"use server";
import { RegisterSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { prismaDb } from "@/lib/prismaDb";
import { getUserByEmail } from "@/data/userInfo";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateForm = RegisterSchema.safeParse(values);
  if (!validateForm.success) {
    return { error: "Something went wrong" };
  }

  const { name, email, password } = validateForm.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exist" };
  }

  await prismaDb.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "Account created" };
};
