import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/schema";
import { getUserByEmail } from "@/data/userInfo";

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const validateForms = loginSchema.safeParse(credentials);
        if (validateForms.success) {
          const { email, password } = validateForms.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
