import { DefaultSession } from "next-auth";
// import NextAuth, { DefaultSession } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscriptionPlan?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    subscriptionPlan?: string | null;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    subscriptionPlan?: string;
  }
}
