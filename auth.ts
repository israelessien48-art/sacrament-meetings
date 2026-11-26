
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const adminEmail = process.env.AUTH_ADMIN_EMAIL
          ?.trim()
          .toLowerCase();

        const passwordHash = process.env.AUTH_ADMIN_PASSWORD_HASH;

        if (!adminEmail || !passwordHash) {
          return null;
        }

        const emailMatches =
          parsed.data.email.trim().toLowerCase() === adminEmail;

        const passwordMatches = await bcrypt.compare(
          parsed.data.password,
          passwordHash,
        );

        if (!emailMatches || !passwordMatches) {
          return null;
        }

        return {
          id: "bishopric-admin",
          name: "Bishopric Administrator",
          email: adminEmail,
        };
      },
    }),
  ],

  callbacks: {
    authorized: ({ auth }) => Boolean(auth?.user),
  },
});
