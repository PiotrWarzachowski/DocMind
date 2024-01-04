import type { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import { is } from "date-fns/locale";
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
    signIn: "/auth/signin",
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
  },
};
