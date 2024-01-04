import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accountType: string;
      id: string;
    } & DefaultSession["user"];
  }
}
