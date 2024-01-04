import type { NextAuthOptions, User } from "next-auth";
import { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { compare } from "bcrypt";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
interface MyUser extends AdapterUser {
  accountType: string;
}

interface SessionArgs {
  session: Session;
  token: JWT;
  user: MyUser;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Username",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials?.email) {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,

              accountType: "CLASSIC",
            },
          });

          if (user && (await compare(credentials.password, user.password!))) {
            // Any object returned will be saved in `user` property of the JWT
            return { id: user.id, email: user.email as string };
          }

          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      const isSignedUp = await db.user.findFirst({
        where: {
          email: session.user.email,
        },
      });
      if (isSignedUp) {
        session.user.accountType = isSignedUp.accountType;
        session.user.id = isSignedUp.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account && account.provider === "github" && !user.email) {
        return "/signin?error=NoEmail";
      }
      return true;
    },
  },
};
